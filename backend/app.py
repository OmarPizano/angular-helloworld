from flask import Flask, abort, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from os import getenv

from sqlalchemy import func

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db = SQLAlchemy(app)

# modelo
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

with app.app_context():
    db.create_all()

# rutas
@app.route('/names', methods = ['GET'])
def names_get_all():
    names = Name.query.all()
    results = [name.to_dict() for name in names]
    return results, 200

@app.route('/names/<int:id>', methods = ['GET'])
def names_get_one(id):
    name = db.session.get(Name, id)
    if not name:
        abort(404)
    return name.to_dict(), 200

@app.route('/names', methods = ['POST'])
def names_create():
    data = request.get_json()
    if 'name' not in data:
        abort(400)
    new_name = Name(name = data['name'])
    db.session.add(new_name)
    db.session.commit()
    return new_name.to_dict(), 201
    
@app.route('/names/<int:id>', methods = ['DELETE'])
def names_delete(id):
    name_to_delete = db.session.get(Name, id)
    if not name_to_delete:
        abort(404)
    db.session.delete(name_to_delete)
    db.session.commit()
    return {}, 204

@app.route('/names/<int:id>', methods = ['PUT'])
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

@app.route('/names/search/<string:pattern>', methods = ['GET'])
def names_search(pattern):
    names = db.session.query(Name).filter(func.lower(Name.name).contains(pattern.lower())).all()
    results = [name.to_dict() for name in names]
    return results, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
