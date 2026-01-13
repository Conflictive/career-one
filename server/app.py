from flask import Flask, jsonify
from flask_cors import CORS

# App Instance
app = Flask(__name__)
CORS(app)

# Route
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        "message": "Hello from Flask!",
        "people": ["Harry", "Jack", "Barry"]
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)