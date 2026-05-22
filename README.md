# Protordk - AI-Powered Text Analysis

🤖 A comprehensive Flask web application for advanced text analysis using Hugging Face Transformers and state-of-the-art AI models.

## Features

### 1. **Sentiment Analysis**
- Analyzes the emotional tone of text (Positive, Negative, Neutral)
- Uses DistilBERT model fine-tuned on SST-2
- Returns confidence scores

### 2. **Text Classification**
- Categorizes text into user-defined categories
- Zero-shot classification (works without retraining)
- Uses Facebook BART-MNLI model
- Default categories: technology, sports, politics, entertainment, science

### 3. **Named Entity Recognition (NER)**
- Extracts entities like people, places, organizations, etc.
- Uses BERT-based NER model
- Groups entities by type

### 4. **Text Summarization**
- Generates concise summaries of longer texts
- Uses Facebook BART-CNN model
- Configurable min/max length
- Minimum 50 words required for input

### 5. **Keyword Extraction**
- Identifies important keywords and topics
- Uses TF-IDF vectorization
- Removes common stopwords
- Configurable number of keywords

### 6. **Complete Analysis**
- Performs all analyses at once
- Ideal for comprehensive text understanding
- Returns combined insights

## Installation

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/dharshananand4/protordk.git
cd protordk
```

2. **Create a virtual environment**
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Download NLTK data** (optional - happens automatically on first run)
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
```

5. **Create environment file**
```bash
cp .env.example .env
```

6. **Run the application**
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Sentiment Analysis
```
POST /api/sentiment
Body: {"text": "I love this product!"}
```

### Text Classification
```
POST /api/classify
Body: {"text": "...", "categories": "tech,sports,news"}
```

### Named Entity Recognition
```
POST /api/ner
Body: {"text": "John works at Google in California"}
```

### Text Summarization
```
POST /api/summarize
Body: {"text": "...", "max_length": 100, "min_length": 30}
```

### Keyword Extraction
```
POST /api/keywords
Body: {"text": "...", "num_keywords": 10}
```

### Complete Analysis
```
POST /api/analyze-all
Body: {"text": "..."}
```

### Health Check
```
GET /health
```

## Usage Example

### Using cURL

```bash
curl -X POST http://localhost:5000/api/sentiment \
  -H "Content-Type: application/json" \
  -d '{"text": "I absolutely love this product!"}'
```

### Using Python

```python
import requests

url = "http://localhost:5000/api/sentiment"
data = {"text": "I absolutely love this product!"}

response = requests.post(url, json=data)
print(response.json())
```

### Using JavaScript/Fetch

```javascript
fetch('/api/sentiment', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({text: 'I love this!'})
})
.then(res => res.json())
.then(data => console.log(data))
```

## Project Structure

```
protordk/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── README.md             # Documentation
├── static/
│   ├── style.css         # Frontend styling
│   └── script.js         # Frontend JavaScript
└── templates/
    └── index.html        # Web interface
```

## Technologies Used

- **Flask** - Web framework
- **Hugging Face Transformers** - Pre-trained AI models
- **PyTorch** - Deep learning framework
- **NLTK** - Natural language processing
- **scikit-learn** - Machine learning utilities
- **Flask-CORS** - Cross-origin resource sharing

## Models Used

1. **Sentiment Analysis**: `distilbert-base-uncased-finetuned-sst-2-english`
2. **Classification**: `facebook/bart-large-mnli`
3. **NER**: `dslim/bert-base-uncased-finetuned-ner`
4. **Summarization**: `facebook/bart-large-cnn`

## Performance Tips

- First request may take longer as models are loaded
- Models are cached after first load
- Text input limited to 512 tokens for most analyses
- For summarization, minimum 50 words required
- Use GPU for faster processing (if available)

## Troubleshooting

### Models not downloading
```bash
# Manual download
python -c "from transformers import pipeline; pipeline('sentiment-analysis')"
```

### Memory issues
- Use smaller models or process shorter texts
- Reduce batch size
- Add more RAM or use GPU

### CORS errors
- Ensure Flask-CORS is installed: `pip install Flask-CORS`
- Check that the frontend and backend are on the same origin

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Dharshan Anand** - [@dharshananand4](https://github.com/dharshananand4)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Changelog

### v1.0.0 (Initial Release)
- Sentiment analysis
- Text classification
- Named entity recognition
- Text summarization
- Keyword extraction
- Web interface
- REST API

---

**Made with ❤️ by Dharshan Anand**
