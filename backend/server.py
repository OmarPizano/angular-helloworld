from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

count = 4
names = [{'id': 1, 'name': 'pancho'}, {'id': 2, 'name': 'julio'}, {'id': 3, 'name': 'pepe'}]

@app.route('/', methods=['GET'])
def main():
    return jsonify(names)

@app.route('/save', methods=['POST'])
def save_name():
    global names
    global count
    data = request.get_json()
    name = data['name']
    names.append({"id": count, "name": name})
    count += 1
    return jsonify({'message': 'name {} saved successfully'.format(name)})

if __name__ == '__main__':
    app.run(debug=True)
