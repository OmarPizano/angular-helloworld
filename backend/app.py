from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from os import getenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# modelo
class Names(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __init__(self, name: str) -> None:
        self.name = name


with app.app_context():
    db.create_all()

# rutas
@app.route('/', methods=['GET'])
def get_names():
    names = Names.query.all()
    results = [{'id': name.id, 'name': name.name} for name in names]
    return jsonify(results)

@app.route('/save', methods=['POST'])
def save_name():
    data = request.json
    new_name = Names(name=data['name'])
    db.session.add(new_name)
    db.session.commit()
    return jsonify({"id": new_name.id, "name": new_name.name})

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_name(id):
    name = Names.query.get(id)
    db.session.delete(name)
    db.session.commit()
    return jsonify({"id": name.id, "name": name.name})

if __name__ == '__main__':
    app.run(debug=True)
