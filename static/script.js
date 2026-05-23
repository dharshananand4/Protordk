// Chart instances
let sentimentChart = null;
let emotionChart = null;

// Update character count
document.getElementById('textInput').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('charCount').textContent = count;
    this.value = this.value.substring(0, 512);
});

// Scroll to analyzer
function scrollToAnalyzer() {
    document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
}

// Show loading spinner
function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

// Analyze text
async function analyzeText() {
    const text = document.getElementById('textInput').value.trim();
    
    if (!text) {
        alert('Please enter some text to analyze');
        return;
    }

    showLoading();
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.add('hidden');

    try {
        // Sentiment Analysis
        if (document.getElementById('sentimentCheck').checked) {
            await analyzeSentiment(text);
        }

        // Emotion Detection
        if (document.getElementById('emotionCheck').checked) {
            await detectEmotion(text);
        }

        // Named Entities
        if (document.getElementById('nerCheck').checked) {
            await extractNER(text);
        }

        // Classification
        if (document.getElementById('classifyCheck').checked) {
            await classifyText(text);
        }

        // Keywords
        if (document.getElementById('keywordsCheck').checked) {
            await extractKeywords(text);
        }

        // Show results
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during analysis. Please try again.');
    } finally {
        hideLoading();
    }
}

// Sentiment Analysis
async function analyzeSentiment(text) {
    try {
        const response = await fetch('/api/sentiment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        const resultsDiv = document.getElementById('sentimentResults');
        resultsDiv.classList.remove('hidden');

        // Create chart
        if (sentimentChart) sentimentChart.destroy();
        const ctx = document.getElementById('sentimentChartCanvas');
        
        const colors = {
            'POSITIVE': '#4CAF50',
            'NEGATIVE': '#F44336',
            'NEUTRAL': '#FFC107'
        };

        sentimentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [data.sentiment],
                datasets: [{
                    data: [data.confidence * 100, (1 - data.confidence) * 100],
                    backgroundColor: [colors[data.sentiment], '#E0E0E0'],
                    borderColor: ['white', 'white'],
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        document.getElementById('sentimentText').innerHTML = `
            <strong>Sentiment:</strong> ${data.sentiment}
            <br>
            <strong>Confidence:</strong> ${(data.confidence * 100).toFixed(2)}%
            <br>
            <em>${data.analysis}</em>
        `;
    } catch (error) {
        console.error('Sentiment analysis error:', error);
    }
}

// Emotion Detection
async function detectEmotion(text) {
    try {
        const response = await fetch('/api/emotion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        const resultsDiv = document.getElementById('emotionResults');
        resultsDiv.classList.remove('hidden');

        document.getElementById('emotionDisplay').innerHTML = data.emoji || '🤔';

        // Create chart
        if (emotionChart) emotionChart.destroy();
        const ctx = document.getElementById('emotionChartCanvas');
        
        emotionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [data.emotion],
                datasets: [{
                    label: 'Confidence',
                    data: [data.confidence * 100],
                    backgroundColor: '#667eea',
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } catch (error) {
        console.error('Emotion detection error:', error);
    }
}

// Named Entity Recognition
async function extractNER(text) {
    try {
        const response = await fetch('/api/ner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        const resultsDiv = document.getElementById('nerResults');
        resultsDiv.classList.remove('hidden');
        const content = document.getElementById('nerContent');
        content.innerHTML = '';

        for (const [type, entities] of Object.entries(data.entities)) {
            entities.forEach(entity => {
                const tag = document.createElement('span');
                tag.className = 'entity-tag';
                tag.innerHTML = `<span class="entity-type">${type}</span> ${entity.text}`;
                content.appendChild(tag);
            });
        }
    } catch (error) {
        console.error('NER error:', error);
    }
}

// Text Classification
async function classifyText(text) {
    try {
        const response = await fetch('/api/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        const resultsDiv = document.getElementById('classifyResults');
        resultsDiv.classList.remove('hidden');
        const content = document.getElementById('classifyContent');
        content.innerHTML = '';

        data.labels.forEach((label, index) => {
            const tag = document.createElement('span');
            tag.className = 'category-tag';
            tag.textContent = `${label} (${(data.scores[index] * 100).toFixed(1)}%)`;
            content.appendChild(tag);
        });
    } catch (error) {
        console.error('Classification error:', error);
    }
}

// Keyword Extraction
async function extractKeywords(text) {
    try {
        const response = await fetch('/api/keywords', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        const resultsDiv = document.getElementById('keywordsResults');
        resultsDiv.classList.remove('hidden');
        const content = document.getElementById('keywordsContent');
        content.innerHTML = '';

        data.keywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.className = 'keyword-tag';
            tag.textContent = keyword;
            content.appendChild(tag);
        });
    } catch (error) {
        console.error('Keywords error:', error);
    }
}

// Allow Enter key to analyze
document.getElementById('textInput').addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        analyzeText();
    }
});