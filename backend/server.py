import datetime
from flask import Flask, request, jsonify
# TODO mysql import

app = Flask(__name__)

# TODO mysql config

@app.route('/', methods=['GET'])
def main():
    return jsonify({'message': 'welcome to backend API'})

@app.route('/save', methods=['POST'])
def save_name():
    data = request.get_json()
    name = data['name']
    date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # TODO mysql code

    return jsonify({'message': 'name {} saved successfully on {}'.format(name, date)})

if __name__ == '__main__':
    app.run(debug=True)
