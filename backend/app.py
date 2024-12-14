from flask import Flask, request, jsonify
from ai_model.storyModel import generate_story

app = Flask(__name__)

@app.route('/generate-story', methods=['POST'])
def generate_story_endpoint():
    data = request.get_json()
    keywords = data.get('keywords', [])
    if not keywords:
        return jsonify({"error": "Keywords are required"}), 400
    story = generate_story(keywords)
    return jsonify({"story": story})

if __name__ == '__main__':
    app.run(debug=True)
