# Protordk - AI-Powered Text Analysis

🤖 **Advanced AI-powered text analysis platform** | Sentiment | Classification | NER | Summarization | Keywords | Emotion Detection

> Transform your text with state-of-the-art AI models. Fast, accurate, and easy to use.

## 🎯 Quick Intro

Protordk is a comprehensive Flask web application that leverages Hugging Face Transformers to perform advanced text analysis. Whether you need to understand sentiment, extract entities, classify content, summarize documents, or detect emotions - Protordk has you covered with powerful AI models.

**Perfect for:** Content analysis, customer feedback processing, market research, social media monitoring, document management, and more.

## 📸 Screenshots & Features

### Modern UI with Dark Mode
```
✨ Modern gradient design with smooth animations
🌙 Dark/Light mode toggle for comfortable viewing
📱 Fully responsive design for all devices
⚡ Real-time API responses with loading animations
```

### Advanced Capabilities
- ✅ Sentiment Analysis with confidence scores and charts
- ✅ Multi-category Text Classification
- ✅ Named Entity Recognition (NER)
- ✅ Automatic Text Summarization
- ✅ Keyword & Topic Extraction
- ✅ **NEW: Emotion Detection** (Happy, Sad, Angry, Neutral)
- ✅ **NEW: Multilingual Analysis** (Support for 40+ languages)
- ✅ **NEW: Voice Input** (Speech-to-Text analysis)
- ✅ **NEW: PDF Analysis** (Extract and analyze PDF documents)
- ✅ **NEW: YouTube Transcript Analysis**
- ✅ **NEW: AI Chatbot Mode** (Interactive conversational analysis)
- ✅ **NEW: Export Results** (PDF, JSON, CSV formats)

## ⚡ One-Line Install

```bash
git clone https://github.com/dharshananand4/Protordk.git && cd Protordk && pip install -r requirements.txt && python app.py
```

Then open **http://localhost:5000** in your browser.

## 🌐 Live Demo

**Coming Soon:** Deployed on Heroku/AWS

Access the live demo at: `https://protordk-ai.herokuapp.com` (Deploy to production)

## ✨ Features

### 1. **Sentiment Analysis**
- Analyzes the emotional tone of text (Positive, Negative, Neutral)
- Uses DistilBERT model fine-tuned on SST-2
- Interactive sentiment charts with confidence visualization
- Perfect for customer feedback analysis

### 2. **Text Classification**
- Categorizes text into user-defined categories
- Zero-shot classification (works without retraining)
- Uses Facebook BART-MNLI model
- Default categories: technology, sports, politics, entertainment, science

### 3. **Named Entity Recognition (NER)**
- Extracts entities like people, places, organizations, dates, etc.
- Uses BERT-based NER model
- Groups entities by type with confidence scores
- Great for information extraction

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

### 6. **Emotion Detection** ⭐ NEW
- Detects 7 emotions: Happy, Angry, Sad, Neutral, Fear, Surprise, Disgust
- Uses DistilRoBERTa emotion model
- Returns emotion scores and probabilities with emojis
- Ideal for social media sentiment analysis

### 7. **Multilingual Analysis** ⭐ NEW
- Supports 40+ languages (English, Spanish, French, German, Chinese, Arabic, etc.)
- Automatic language detection
- Analyze text in any language
- Perfect for global content analysis

### 8. **Voice Input** ⭐ NEW
- Speech-to-Text conversion
- Real-time voice recording
- Support for multiple languages
- Ideal for hands-free analysis

### 9. **PDF Analysis** ⭐ NEW
- Upload and analyze PDF documents
- Automatic text extraction
- Supports multi-page PDFs
- Batch analysis of multiple documents

### 10. **YouTube Transcript Analysis** ⭐ NEW
- Analyze YouTube video transcripts
- Automatic transcript fetching
- Sentiment analysis of videos
- Keyword extraction from transcripts

### 11. **AI Chatbot Mode** ⭐ NEW
- Conversational text analysis
- Interactive Q&A about text insights
- Multi-turn conversations
- Context-aware responses

### 12. **Export Results** ⭐ NEW
- Download analysis results as PDF
- Export to JSON format
- Export to CSV format
- Share results easily

### 13. **Complete Analysis**
- Performs all analyses at once
- Ideal for comprehensive text understanding
- Returns combined insights in a single request

### 14. **Dark Mode UI** ⭐ NEW
- Toggle between light and dark themes
- Smooth theme transitions
- Eye-friendly dark mode
- Persistent theme preference

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dharshananand4/Protordk.git
cd Protordk
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

## 📡 API Endpoints

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

### Emotion Detection
```
POST /api/emotion
Body: {"text": "I am so happy right now!"}
```

### Multilingual Analysis
```
POST /api/sentiment-multilingual
Body: {"text": "Je suis heureux", "language": "fr"}
```

### Voice Analysis
```
POST /api/voice-analysis
Body: FormData with audio file
```

### PDF Analysis
```
POST /api/pdf-analysis
Body: FormData with PDF file
```

### YouTube Transcript Analysis
```
POST /api/youtube-analysis
Body: {"youtube_url": "https://youtube.com/watch?v=..."}
```

### AI Chatbot
```
POST /api/chatbot
Body: {"message": "Tell me about the sentiment...", "context": "previous_analysis"}
```

### Export Results
```
POST /api/export
Body: {"format": "pdf", "results": {...}}
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

## 💻 Usage Examples

### Using cURL - Sentiment Analysis

```bash
curl -X POST http://localhost:5000/api/sentiment \
  -H "Content-Type: application/json" \
  -d '{"text": "I absolutely love this product!"}'
```

### Using Python - Multilingual Analysis

```python
import requests

url = "http://localhost:5000/api/sentiment-multilingual"
data = {
    "text": "Me encanta este producto",
    "language": "es"
}

response = requests.post(url, json=data)
print(response.json())
```

### Using JavaScript/Fetch - Emotion Detection

```javascript
fetch('/api/emotion', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({text: 'I am so happy!'})
})
.then(res => res.json())
.then(data => console.log(data))
```

### PDF Analysis

```python
import requests

url = "http://localhost:5000/api/pdf-analysis"
files = {'file': open('document.pdf', 'rb')}

response = requests.post(url, files=files)
print(response.json())
```

## 📁 Project Structure

```
protordk/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── config.py             # Configuration settings
├── .env.example          # Environment variables template
├── README.md             # Documentation
├── Procfile              # Heroku deployment config
├── runtime.txt           # Python version
├── DEPLOYMENT.md         # Deployment guide
├── static/
│   ├── style.css         # Modern CSS with dark mode
│   ├── script.js         # Frontend JavaScript
│   └── theme.js          # Dark mode toggle
├── templates/
│   └── index.html        # Modern responsive web interface
└── uploads/              # Temporary file uploads
```

## 🛠 Technologies Used

- **Flask** - Web framework
- **Hugging Face Transformers** - Pre-trained AI models
- **PyTorch** - Deep learning framework
- **NLTK** - Natural language processing
- **scikit-learn** - Machine learning utilities
- **Flask-CORS** - Cross-origin resource sharing
- **PyPDF2** - PDF processing
- **youtube-transcript-api** - YouTube transcript fetching
- **SpeechRecognition** - Voice input processing

## 🤖 Models Used

1. **Sentiment Analysis**: `distilbert-base-uncased-finetuned-sst-2-english`
2. **Classification**: `facebook/bart-large-mnli`
3. **NER**: `dslim/bert-base-uncased-finetuned-ner`
4. **Summarization**: `facebook/bart-large-cnn`
5. **Emotion Detection**: `j-hartmann/emotion-english-distilroberta-base`
6. **Multilingual**: `xlm-roberta-base`

## ⚙️ Performance Tips

- First request may take longer as models are loaded
- Models are cached after first load
- Text input limited to 512 tokens for most analyses
- For summarization, minimum 50 words required
- Use GPU for faster processing (if available)
- Consider using a load balancer for production deployments

## 🐛 Troubleshooting

### Models not downloading
```bash
# Manual download
python -c "from transformers import pipeline; pipeline('sentiment-analysis')"
```

### Memory issues
- Use smaller models or process shorter texts
- Reduce batch size
- Add more RAM or use GPU
- Consider deploying with Docker for resource isolation

### CORS errors
- Ensure Flask-CORS is installed: `pip install Flask-CORS`
- Check that the frontend and backend are on the same origin

### Voice input not working
- Check microphone permissions
- Ensure browser allows microphone access
- Test microphone in browser settings

### PDF upload issues
- Check file size limits
- Ensure PDF is not password-protected
- Verify PyPDF2 is installed

## 🚀 Deployment

### Deploy to Heroku

1. Create `Procfile` (already included):
```
web: gunicorn app:app
```

2. Deploy:
```bash
heroku login
heroku create protordk
git push heroku feature/v1.0-release:main
```

3. View logs:
```bash
heroku logs --tail
```

### Deploy to AWS/Docker

```bash
docker build -t protordk .
docker run -p 5000:5000 protordk
```

## 📹 YouTube Demo

**Coming Soon:** Full feature walkthrough and tutorial

Check out the demo video: `https://youtube.com/watch?v=protordk-demo`

Topics covered:
- Installation and setup
- Web interface walkthrough
- API usage examples
- Real-world use cases
- Performance benchmarks
- YouTube transcript analysis
- Voice input demonstration
- PDF analysis walkthrough

## 📢 Share on Reddit

Share your analysis results on Reddit communities:
- r/MachineLearning
- r/NLP
- r/OpenSource
- r/Python

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests with:
- Bug fixes
- New features
- Documentation improvements
- Performance optimizations
- Additional language support
- New analysis capabilities

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Dharshan Anand** - [@dharshananand4](https://github.com/dharshananand4)

## 💬 Support

For issues, questions, or suggestions, please:
- Open an issue on [GitHub Issues](https://github.com/dharshananand4/Protordk/issues)
- Check the [Discussions](https://github.com/dharshananand4/Protordk/discussions) tab
- Email: dharshananand4@gmail.com

## 📊 Changelog

### v1.0.0 (Initial Release) - May 2026
- ✅ Sentiment analysis with confidence scores and interactive charts
- ✅ Text classification with zero-shot learning
- ✅ Named entity recognition with entity grouping
- ✅ Text summarization with configurable length
- ✅ Keyword extraction with TF-IDF
- ✅ **Emotion Detection** (7 emotions detected)
- ✅ **Multilingual Analysis** (40+ languages)
- ✅ **Voice Input** (Speech-to-Text)
- ✅ **PDF Analysis** (Document processing)
- ✅ **YouTube Transcript Analysis**
- ✅ **AI Chatbot Mode** (Conversational interface)
- ✅ **Export Results** (PDF, JSON, CSV)
- ✅ **Dark Mode UI** (Theme toggle)
- ✅ Modern responsive web interface
- ✅ Real-time loading animations
- ✅ REST API with comprehensive endpoints
- ✅ Docker support
- ✅ Production-ready deployment guide

## 🎯 Roadmap

### Upcoming Features
- [ ] Real-time collaborative analysis
- [ ] Integration with Google Sheets
- [ ] Browser extension for on-page analysis
- [ ] Mobile app (iOS/Android)
- [ ] Advanced sentiment trend analysis
- [ ] Custom model training
- [ ] API rate limiting and authentication
- [ ] User dashboard and history
- [ ] Batch processing API

---

<div align="center">

**Made with ❤️ by Dharshan Anand**

⭐ Star this repository if you find it helpful!

[Report Bug](https://github.com/dharshananand4/Protordk/issues) • [Request Feature](https://github.com/dharshananand4/Protordk/issues) • [Discussions](https://github.com/dharshananand4/Protordk/discussions)

**Topics:** `nlp` `machine-learning` `sentiment-analysis` `text-analysis` `ai` `python` `flask` `huggingface` `transformers` `emotion-detection` `multilingual`

</div>
