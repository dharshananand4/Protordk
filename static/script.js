// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Update button styles
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Show loading state
function showLoading(resultId) {
    const result = document.getElementById(resultId);
    result.classList.add('show');
    result.innerHTML = '<p><span class="loading"></span> Processing...</p>';
}

// Display result
function displayResult(resultId, html) {
    const result = document.getElementById(resultId);
    result.classList.add('show');
    result.innerHTML = html;
}

// Display error
function displayError(resultId, error) {
    const result = document.getElementById(resultId);
    result.classList.add('show', 'error');
    result.innerHTML = `<h3>Error</h3><p>${error}</p>`;
}

// Sentiment Analysis
async function analyzeSentiment() {
    const text = document.getElementById('sentimentText').value.trim();
    if (!text) {
        displayError('sentimentResult', 'Please enter some text');
        return;
    }

    showLoading('sentimentResult');

    try {
        const response = await fetch('/api/sentiment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        const sentimentClass = `sentiment-${data.sentiment.toLowerCase()}`;
        displayResult('sentimentResult', `
            <h3>Sentiment Analysis Result</h3>
            <p><strong>Sentiment:</strong> <span class="${sentimentClass}">${data.sentiment}</span></p>
            <p><strong>Confidence:</strong> ${(data.confidence * 100).toFixed(2)}%</p>
            <p><strong>Analysis:</strong> ${data.analysis}</p>
        `);
    } catch (error) {
        displayError('sentimentResult', error.message);
    }
}

// Text Classification
async function classifyText() {
    const text = document.getElementById('classifyText').value.trim();
    const categories = document.getElementById('categories').value;

    if (!text) {
        displayError('classifyResult', 'Please enter some text');
        return;
    }

    showLoading('classifyResult');

    try {
        const response = await fetch('/api/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, categories })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        let categoriesHtml = '';
        data.labels.forEach((label, index) => {
            categoriesHtml += `<p><strong>${label}:</strong> ${(data.scores[index] * 100).toFixed(2)}%</p>`;
        });

        displayResult('classifyResult', `
            <h3>Text Classification Result</h3>
            <p><strong>Top Category:</strong> ${data.top_category}</p>
            <p><strong>Confidence:</strong> ${(data.top_score * 100).toFixed(2)}%</p>
            <h4>All Classifications:</h4>
            ${categoriesHtml}
        `);
    } catch (error) {
        displayError('classifyResult', error.message);
    }
}

// Named Entity Recognition
async function extractEntities() {
    const text = document.getElementById('nerText').value.trim();

    if (!text) {
        displayError('nerResult', 'Please enter some text');
        return;
    }

    showLoading('nerResult');

    try {
        const response = await fetch('/api/ner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        let entitiesHtml = '<h4>Extracted Entities:</h4>';
        for (const [type, entities] of Object.entries(data.entities)) {
            entitiesHtml += `<p><strong>${type}:</strong> `;
            entities.forEach(entity => {
                entitiesHtml += `<span class="entity-badge">${entity.text}</span>`;
            });
            entitiesHtml += '</p>';
        }

        displayResult('nerResult', `
            <h3>Named Entity Recognition Result</h3>
            <p><strong>Total Entities Found:</strong> ${data.entity_count}</p>
            ${entitiesHtml}
        `);
    } catch (error) {
        displayError('nerResult', error.message);
    }
}

// Text Summarization
async function summarizeText() {
    const text = document.getElementById('summarizeText').value.trim();
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const minLength = parseInt(document.getElementById('minLength').value);

    if (!text) {
        displayError('summarizeResult', 'Please enter some text');
        return;
    }

    showLoading('summarizeResult');

    try {
        const response = await fetch('/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, max_length: maxLength, min_length: minLength })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        displayResult('summarizeResult', `
            <h3>Text Summarization Result</h3>
            <p><strong>Original Length:</strong> ${data.original_length} words</p>
            <p><strong>Summary Length:</strong> ${data.summary_length} words</p>
            <p><strong>Reduction:</strong> ${((1 - data.summary_length / data.original_length) * 100).toFixed(2)}%</p>
            <h4>Summary:</h4>
            <p>${data.summary}</p>
        `);
    } catch (error) {
        displayError('summarizeResult', error.message);
    }
}

// Keyword Extraction
async function extractKeywords() {
    const text = document.getElementById('keywordsText').value.trim();
    const numKeywords = parseInt(document.getElementById('numKeywords').value);

    if (!text) {
        displayError('keywordsResult', 'Please enter some text');
        return;
    }

    showLoading('keywordsResult');

    try {
        const response = await fetch('/api/keywords', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, num_keywords: numKeywords })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        let keywordsHtml = '';
        data.keywords.forEach(keyword => {
            keywordsHtml += `<span class="keyword-badge">${keyword}</span>`;
        });

        displayResult('keywordsResult', `
            <h3>Keyword Extraction Result</h3>
            <p><strong>Keywords Found:</strong> ${data.keyword_count}</p>
            <p>${keywordsHtml}</p>
        `);
    } catch (error) {
        displayError('keywordsResult', error.message);
    }
}

// Complete Analysis
async function analyzeAll() {
    const text = document.getElementById('analyzeAllText').value.trim();

    if (!text) {
        displayError('analyzeAllResult', 'Please enter some text');
        return;
    }

    showLoading('analyzeAllResult');

    try {
        const response = await fetch('/api/analyze-all', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        let entitiesHtml = '';
        for (const [type, entities] of Object.entries(data.entities)) {
            entitiesHtml += `<p><strong>${type}:</strong> ${entities.join(', ')}</p>`;
        }

        let keywordsHtml = '';
        data.keywords.forEach(keyword => {
            keywordsHtml += `<span class="keyword-badge">${keyword}</span>`;
        });

        displayResult('analyzeAllResult', `
            <h3>Complete Text Analysis</h3>
            <h4>Sentiment Analysis</h4>
            <p><strong>Sentiment:</strong> ${data.sentiment.label} (${(data.sentiment.confidence * 100).toFixed(2)}%)</p>
            
            <h4>Text Classification</h4>
            <p><strong>Category:</strong> ${data.classification.top_category} (${(data.classification.score * 100).toFixed(2)}%)</p>
            
            <h4>Named Entities</h4>
            ${entitiesHtml || '<p>No entities found</p>'}
            
            <h4>Keywords</h4>
            <p>${keywordsHtml}</p>
        `);
    } catch (error) {
        displayError('analyzeAllResult', error.message);
    }
}
