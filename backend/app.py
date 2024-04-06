from datetime import timedelta
from flask import Flask, abort, jsonify, request
import flask
from flask_cors import CORS
from flask_jwt_extended.internal_utils import verify_token_type
from flask_jwt_extended.utils import get_jwt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, decode_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from os import getenv
from sqlalchemy import func

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

db = SQLAlchemy(app)

# MODELOS
class Name(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __init__(self, name:str) -> None:
       self.name = name 

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    def __init__(self, username:str, password:str, is_admin = False) -> None:
       self.username = username 
       self.password = bcrypt.generate_password_hash(password)
       self.role = 'admin' if is_admin else 'normal'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role
        }

with app.app_context():
    db.create_all()

URL_PREFIX = '/api'

# RUTAS
@app.route(URL_PREFIX, methods = ['GET'])
def api_version():
    return {"api_version": "v0.1"}, 200

# AUTENTICACIÓN
@app.route(URL_PREFIX + '/auth', methods = ['POST'])
def auth():
    data = request.get_json()
    required_params = ['username', 'password']
    for param in required_params:
        if param not in data:
            abort(400)
    results = db.session.query(User).filter(User.username == data['username']).all()
    if len(results) == 0:
        abort(404)
    user = results[0]
    if not bcrypt.check_password_hash(user.password, data['password']):
        abort(403)
    token = create_access_token(identity=user.id)
    return jsonify(token=token), 200

@app.route(URL_PREFIX + '/auth/verify', methods = ['GET'])
@jwt_required()
def verify_token():
    headers = flask.request.headers
    bearer = headers.get('Authorization')
    token = str(bearer).split()[1]
    decode_token(token)
    return {}, 204

@app.route(URL_PREFIX + '/auth/data', methods = ['GET'])
@jwt_required()
def get_auth_data():
    user_id = get_jwt_identity()
    auth_data = db.session.get(User, user_id)
    if not auth_data:
        abort(404)
    return auth_data.to_dict(), 200

# USUARIOS
@app.route(URL_PREFIX + '/users', methods = ['GET'])
@jwt_required()
def users_get_all():
    user_id = get_jwt_identity()
    user_data = db.session.get(User, user_id);
    if user_data.role != 'admin':
        abort(403)
    users = User.query.all()
    results = [user.to_dict() for user in users]
    return results, 200

@app.route(URL_PREFIX + '/users/<int:id>', methods = ['GET'])
@jwt_required()
def users_get_one(id):
    user_id = get_jwt_identity()
    user_data = db.session.get(User, user_id);
    if user_data.role != 'admin' and id != user_id:
        abort(403)
    user = db.session.get(User, id)
    if not user:
        abort(404)
    return user.to_dict(), 200

@app.route(URL_PREFIX + '/users', methods = ['POST'])
@jwt_required()
def users_create():
    user_id = get_jwt_identity()
    user_data = db.session.get(User, user_id);
    if user_data.role != 'admin':
        abort(403)
    data = request.get_json()
    required_params = ['username', 'password', 'is_admin']
    for param in required_params:
        if param not in data:
            abort(400)
    new_user = User(username=data['username'], password=data['password'], is_admin=data['is_admin'])
    db.session.add(new_user)
    db.session.commit()
    return new_user.to_dict(), 201

@app.route(URL_PREFIX + '/users/<int:id>', methods = ['PUT'])
@jwt_required()
def users_update(id):
    data = request.get_json()
    user_id = get_jwt_identity()
    user_data = db.session.get(User, user_id)
    if user_data.role != 'admin' and user_id != id:
        abort(403)
    optional_params = ['username', 'password', 'is_admin']
    selected_params = []
    for param in optional_params:
        if param in data:
            selected_params.append(param)
    if len(selected_params) == 0:
        abort(400)
    user_to_update = db.session.get(User, id)
    if not user_to_update:
        abort(404)
    for param in selected_params:
        if param == 'password':
            user_to_update.password = bcrypt.generate_password_hash(data[param])
        if param == 'is_admin':
            user_to_update.role = 'admin' if data['is_admin'] else 'normal'
        if param == 'username':
            user_to_update.username = data['username']
    db.session.commit()
    return {}, 204

@app.route(URL_PREFIX + '/users/<int:id>', methods = ['DELETE'])
@jwt_required()
def users_delete(id):
    user_id = get_jwt_identity()
    user_data = db.session.get(User, user_id)
    if user_data.role != 'admin' and user_id != id:
        abort(403)
    user_to_delete = db.session.get(User, id)
    if not user_to_delete:
        abort(404)
    db.session.delete(user_to_delete)
    db.session.commit()
    return {}, 204

@app.route(URL_PREFIX + '/users/search/<string:pattern>', methods = ['GET'])
@jwt_required()
def users_search(pattern):
    user_data = get_jwt()
    user_id = get_jwt_identity()
    user_data = db.session.get(User, user_id)
    if user_data.role != 'admin':
        abort(403)
    users = db.session.query(User).filter(func.lower(User.username).contains(pattern.lower())).all()
    results = [user.to_dict() for user in users]
    return results, 200

# NOMBRES
@app.route(URL_PREFIX + '/names', methods = ['GET'])
# @jwt_required()
def names_get_all():
    names = Name.query.all()
    results = [name.to_dict() for name in names]
    return results, 200

@app.route(URL_PREFIX+'/names/<int:id>', methods = ['GET'])
@jwt_required()
def names_get_one(id):
    name = db.session.get(Name, id)
    if not name:
        abort(404)
    return name.to_dict(), 200

@app.route(URL_PREFIX + '/names', methods = ['POST'])
@jwt_required()
def names_create():
    data = request.get_json()
    if 'name' not in data:
        abort(400)
    new_name = Name(name = data['name'])
    db.session.add(new_name)
    db.session.commit()
    return new_name.to_dict(), 201
    
@app.route(URL_PREFIX + '/names/<int:id>', methods = ['DELETE'])
@jwt_required()
def names_delete(id):
    name_to_delete = db.session.get(Name, id)
    if not name_to_delete:
        abort(404)
    db.session.delete(name_to_delete)
    db.session.commit()
    return {}, 204

@app.route(URL_PREFIX + '/names/<int:id>', methods = ['PUT'])
@jwt_required()
def names_update(id):
    data = request.get_json()
    if 'newName' not in data:
        abort(400)
    name_to_update = db.session.get(Name, id)
    if not name_to_update:
        abort(404)
    name_to_update.name = data['newName'] 
    db.session.commit()
    return {}, 204

@app.route(URL_PREFIX + '/names/search/<string:pattern>', methods = ['GET'])
@jwt_required()
def names_search(pattern):
    names = db.session.query(Name).filter(func.lower(Name.name).contains(pattern.lower())).all()
    results = [name.to_dict() for name in names]
    return results, 200

if __name__ == '__main__':
    app.run()
