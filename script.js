// Quote data
const quotes = [
    {
        id: 1,
        topic: "life",
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        id: 2,
        topic: "life",
        text: "The purpose of our lives is to be happy.",
        author: "Dalai Lama"
    },
    {
        id: 3,
        topic: "life",
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius"
    },
    {
        id: 4,
        topic: "success",
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        id: 5,
        topic: "success",
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        id: 6,
        topic: "love",
        text: "Love is composed of a single soul inhabiting two bodies.",
        author: "Aristotle"
    },
    {
        id: 7,
        topic: "love",
        text: "The best thing to hold onto in life is each other.",
        author: "Audrey Hepburn"
    },
    {
        id: 8,
        topic: "wisdom",
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates"
    },
    {
        id: 9,
        topic: "wisdom",
        text: "Knowing yourself is the beginning of all wisdom.",
        author: "Aristotle"
    },
    {
        id: 10,
        topic: "motivation",
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        id: 11,
        topic: "motivation",
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        id: 12,
        topic: "happiness",
        text: "Happiness is not something ready made. It comes from your own actions.",
        author: "Dalai Lama"
    }
];

// DOM Elements
const topicInput = document.getElementById('topicInput');
const searchBtn = document.getElementById('searchBtn');
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const errorElement = document.getElementById('error');
const quoteContainer = document.getElementById('quoteContainer');
const resultsContainer = document.getElementById('results');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);

topicInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Functions
function handleSearch() {
    const topic = topicInput.value.trim().toLowerCase();
    
    // Validate input
    if (!topic) {
        showError("Please enter a topic");
        return;
    }
    
    // Show loading state
    btnText.textContent = "Searching...";
    spinner.classList.remove('hidden');
    searchBtn.disabled = true;
    errorElement.textContent = '';
    
    // Simulate API call with timeout
    setTimeout(() => {
        const filteredQuotes = getQuotesByTopic(topic);
        displayQuotes(filteredQuotes, topic);
        
        // Reset button state
        btnText.textContent = "Get Quotes";
        spinner.classList.add('hidden');
        searchBtn.disabled = false;
    }, 800);
}

function getQuotesByTopic(topic) {
    // Filter quotes that match the topic
    const matchedQuotes = quotes.filter(quote => 
        quote.topic.includes(topic)
    );
    
    // If no exact matches, try partial matches
    if (matchedQuotes.length === 0) {
        return quotes.filter(quote => 
            quote.topic.includes(topic) || 
            quote.text.toLowerCase().includes(topic)
        ).slice(0, 3);
    }
    
    // Return 3 random quotes from matches
    return shuffleArray(matchedQuotes).slice(0, 3);
}

function displayQuotes(quotes, topic) {
    // Clear previous quotes
    quoteContainer.innerHTML = '';
    
    if (quotes.length === 0) {
        showError(`No quotes found for "${topic}". Try "life", "love", "success", or "wisdom".`);
        resultsContainer.classList.remove('show');
        return;
    }
    
    // Show results container
    resultsContainer.classList.add('show');
    
    // Add each quote to the container with animation delay
    quotes.forEach((quote, index) => {
        const quoteElement = createQuoteElement(quote);
        quoteElement.style.animationDelay = `${index * 0.2}s`;
        quoteContainer.appendChild(quoteElement);
    });
}

function createQuoteElement(quote) {
    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'quote-card animate-quote';
    
    quoteDiv.innerHTML = `
        <span class="quote-topic">${quote.topic}</span>
        <p class="quote-text">${quote.text}</p>
        <p class="quote-author">— ${quote.author}</p>
    `;
    
    return quoteDiv;
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.add('animate__animated', 'animate__headShake');
    
    setTimeout(() => {
        errorElement.classList.remove('animate__animated', 'animate__headShake');
    }, 1000);
}

// Utility function to shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
