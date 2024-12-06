from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import base64
from backend.weaviate_image_search import weaviate_image_search
from backend.movie_recommendations.src.movie_recommendations.main import kickoff

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    # Get text query
    query = request.form.get('query', '')
    image = request.files.get('image', '')
    results = []
    
    if image:
        try:
            # Read the image file and convert to base64
            image_bytes = image.read()
            image_b64 = base64.b64encode(image_bytes).decode('utf-8')
            
            # Pass the base64 string to kickoff
            results = kickoff(image_b64, query)
            
        except Exception as e:
            print(f"Error processing image: {str(e)}")
            results = []
    else:
        results = kickoff("", query)
        
    # Return the results
    return jsonify(results if results else [])

if __name__ == '__main__':
    app.run(debug=True, port=5111) 