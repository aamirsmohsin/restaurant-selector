from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import dotenv_values
import requests

app = Flask(__name__)
CORS(app)

env_values = dotenv_values('.env')

api_key = env_values['API_KEY']
print(api_key)

@app.route('/places', methods=['GET'])
def index():
    data = request.args

    lat = data['lat']
    lon = data['lon']

    api_url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{lon}&radius=3000&type=restaurant&key={api_key}'

    response = requests.get(api_url)
    data = response.json()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)