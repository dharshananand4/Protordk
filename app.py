from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
CORS(app)

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

# Initialize Hugging Face pipelines
print("Loading AI models...")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
zero_shot_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
ner_pipeline = pipeline("ner", model="dslim/bert-base-uncased-finetuned-ner")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
emotion_analyzer = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

print("Models loaded successfully!")

# ==================== ROUTES ====================

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/api/sentiment', methods=['POST'])
def analyze_sentiment():
    """Analyze sentiment of text"""
    data = request.get_json()
    text = data.get('text', '').strip()
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    if len(text) > 512:
        text = text[:512]
    
    try:
        result = sentiment_analyzer(text)[0]
        return jsonify({
            'text': text,
            'sentiment': result['label'],
            'confidence': round(result['score'], 4),
            'analysis': f"This text is {result['label'].lower()} with {round(result['score']*100, 2)}% confidence."
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/classify', methods=['POST'])
def classify_text():
    """Classify text into categories"""
    data = request.get_json()
    text = data.get('text', '').strip()
    categories = data.get('categories', ['technology', 'sports', 'politics', 'entertainment', 'science']).split(',')
    categories = [cat.strip() for cat in categories]
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    if len(text) > 512:
        text = text[:512]
    
    try:
        result = zero_shot_classifier(text, categories)
        return jsonify({
            'text': text,
            'labels': result['labels'],
            'scores': [round(score, 4) for score in result['scores']],
            'top_category': result['labels'][0],
            'top_score': round(result['scores'][0], 4)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ner', methods=['POST'])
def extract_entities():
    """Extract named entities from text"""
    data = request.get_json()
    text = data.get('text', '').strip()
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    if len(text) > 512:
        text = text[:512]
    
    try:
        results = ner_pipeline(text)
        
        # Group entities
        entities = {}
        for entity in results:
            entity_type = entity['entity'].replace('B-', '').replace('I-', '')
            if entity_type not in entities:
                entities[entity_type] = []
            entities[entity_type].append({
                'text': entity['word'].replace('##', ''),
                'score': round(entity['score'], 4)
            })
        
        return jsonify({
            'text': text,
            'entities': entities,
            'entity_count': len(results)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    """Summarize text"""
    data = request.get_json()
    text = data.get('text', '').strip()
    max_length = data.get('max_length', 100)
    min_length = data.get('min_length', 30)
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    # Check minimum length for summarization
    if len(text.split()) < 50:
        return jsonify({'error': 'Text is too short to summarize (minimum 50 words)'}), 400
    
    try:
        summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
        return jsonify({
            'original_text': text,
            'summary': summary[0]['summary_text'],
            'original_length': len(text.split()),
            'summary_length': len(summary[0]['summary_text'].split())
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/keywords', methods=['POST'])
def extract_keywords():
    """Extract keywords from text"""
    data = request.get_json()
    text = data.get('text', '').strip()
    num_keywords = data.get('num_keywords', 10)
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        # Tokenize and remove stopwords
        stop_words = set(stopwords.words('english'))
        tokens = word_tokenize(text.lower())
        keywords = [word for word in tokens if word.isalnum() and word not in stop_words]
        
        # Use TF-IDF for keyword extraction
        vectorizer = TfidfVectorizer(max_features=num_keywords)
        sentences = sent_tokenize(text)
        tfidf_matrix = vectorizer.fit_transform(sentences)
        feature_names = vectorizer.get_feature_names_out()
        
        # Get top keywords
        top_keywords = sorted(feature_names, key=lambda x: x.lower())[:num_keywords]
        
        return jsonify({
            'text': text,
            'keywords': list(top_keywords),
            'keyword_count': len(top_keywords)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/emotion', methods=['POST'])
def detect_emotion():
    """Detect emotions in text - NEW UNIQUE AI FEATURE"""
    data = request.get_json()
    text = data.get('text', '').strip()
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    if len(text) > 512:
        text = text[:512]
    
    try:
        result = emotion_analyzer(text)[0]
        return jsonify({
            'text': text,
            'emotion': result['label'],
            'confidence': round(result['score'], 4),
            'analysis': f"The detected emotion is {result['label'].upper()} with {round(result['score']*100, 2)}% confidence.",
            'emoji': {
                'happy': '😊',
                'sad': '😢',
                'angry': '😠',
                'neutral': '😐',
                'fear': '😨',
                'surprise': '😲',
                'disgust': '🤢'
            }.get(result['label'].lower(), '🤔')
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-all', methods=['POST'])
def analyze_all():
    """Perform all text analyses"""
    data = request.get_json()
    text = data.get('text', '').strip()
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    if len(text) > 512:
        text = text[:512]
    
    try:
        # Sentiment
        sentiment = sentiment_analyzer(text)[0]
        
        # Emotion (NEW)
        emotion = emotion_analyzer(text)[0]
        
        # Classification
        categories = ['technology', 'sports', 'politics', 'entertainment', 'science']
        classification = zero_shot_classifier(text, categories)
        
        # NER
        ner_results = ner_pipeline(text)
        entities = {}
        for entity in ner_results:
            entity_type = entity['entity'].replace('B-', '').replace('I-', '')
            if entity_type not in entities:
                entities[entity_type] = []
            entities[entity_type].append(entity['word'].replace('##', ''))
        
        # Keywords
        stop_words = set(stopwords.words('english'))
        tokens = word_tokenize(text.lower())
        keywords = [word for word in tokens if word.isalnum() and word not in stop_words][:10]
        
        return jsonify({
            'text': text,
            'sentiment': {
                'label': sentiment['label'],
                'confidence': round(sentiment['score'], 4)
            },
            'emotion': {
                'label': emotion['label'],
                'confidence': round(emotion['score'], 4)
            },
            'classification': {
                'top_category': classification['labels'][0],
                'score': round(classification['scores'][0], 4)
            },
            'entities': entities,
            'keywords': keywords
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'OK', 'message': 'Protordk API is running', 'version': '1.0.0'})

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
