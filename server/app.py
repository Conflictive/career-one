from flask import Flask, jsonify
from flask_cors import CORS

# App Instance
app = Flask(__name__)
CORS(app)

# Route
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        "message": "My Job Dashboard",
        "jobs": [
            {
                "id": 1,
                "role": "Software Engineer",
                "company": "Google",
                "salary": "£45000",
                "status": "Applied",
                "date": "14/01/2026"
            },
            {
                "id": 2,
                "role": "Frontend Dev",
                "company": "Netflix",
                "salary": "£45000",
                "status": "Interviewing",
                "date": "14/01/2026"
            },
            {
                "id": 3,
                "role": "Backend Intern",
                "company": "Spotify",
                "salary": "£45000",
                "status": "Rejected",
                "date": "14/01/2026"
            }
        ]
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)