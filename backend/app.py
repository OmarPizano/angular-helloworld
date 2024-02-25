from flask import Flask, abort, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse
from dotenv import load_dotenv
from os import getenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db = SQLAlchemy(app)
api = Api(app)

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

# recurso
class Names(Resource):
    def __init__(self) -> None:
        self.parser = reqparse.RequestParser() 

    def get(self):
        names = Name.query.all()
        results = [name.to_dict() for name in names]
        return results, 200

    def post(self):
        self.parser.add_argument('name', type=str, required=True)
        args = self.parser.parse_args()
        new_name = Name(name=args['name'])
        db.session.add(new_name)
        db.session.commit()
        return new_name.to_dict(), 201

    def delete(self, id: int = 0):
        if id == 0:
            abort(400)
        name_to_delete = db.session.get(Name, id)
        if not name_to_delete:
            abort(404)
        db.session.delete(name_to_delete)
        db.session.commit()
        return {}, 204

    def put(self, id: int = 0):
        if id == 0:
            abort(400)
        self.parser.add_argument('newName', type=str, required=True)
        args = self.parser.parse_args()
        name_to_update = db.session.get(Name, id)
        if not name_to_update:
            abort(404)
        name_to_update.name = args['newName']
        db.session.commit()
        return {}, 204

# rutas permitidas
api.add_resource(Names, '/names', '/names/<int:id>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
