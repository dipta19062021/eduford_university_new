// Chatbot Configuration
const chatbotData = {
    greetings: ['hello', 'hi', 'hey', 'greetings'],
    faq: {
        'admission': {
            keywords: ['admission', 'apply', 'enroll', 'admission process'],
            response: 'To apply for admission, visit our enrollment page at /enroll.html. You need to fill the enrollment form with your details, qualifications, and preferred course. Our admissions team will review your application within 3-5 business days.'
        },
        'courses': {
            keywords: ['courses', 'programs', 'what courses', 'degrees'],
            response: 'We offer Undergraduate (UG - 3 years), Postgraduate (PG - 2 years), and PhD (3-4 years) programs across multiple disciplines including Computer Science, Physics, Biology, Chemistry, Economics, and Mathematics.'
        },
        'faculty': {
            keywords: ['faculty', 'professors', 'teachers', 'staff'],
            response: 'Our faculty members are accomplished scholars with extensive research experience. Visit our Faculty page at /faculty.html to see detailed profiles, research interests, ongoing projects, and publication records.'
        },
        'contact': {
            keywords: ['contact', 'address', 'phone', 'email', 'location'],
            response: 'You can reach us at:\n📍 ABC Road, XYZ City\n📞 +91 1234567890\n📧 info@university.com\nOffice hours: Monday to Saturday, 9am to 10pm'
        },
        'fees': {
            keywords: ['fees', 'cost', 'tuition', 'price', 'payment'],
            response: 'Annual fees vary by program:\n• UG: $5,000\n• PG: $7,000\n• PhD: $6,000\nPlease contact our admissions office for scholarship and financial aid information.'
        },
        'extracurricular': {
            keywords: ['activities', 'clubs', 'sports', 'extracurricular', 'events'],
            response: 'We offer diverse extracurricular activities including sports, arts, cultural programs, clubs, and community service. Explore our Extracurricular Activities page to see all available options!'
        },
        'facilities': {
            keywords: ['facilities', 'library', 'lab', 'campus', 'infrastructure'],
            response: 'Our campus includes state-of-the-art laboratories, a comprehensive library, sports facilities, computer labs, research centers, and modern classrooms to support quality education.'
        },
        'placement': {
            keywords: ['placement', 'job', 'career', 'placement rate', 'internship'],
            response: 'We have a dedicated placement cell that assists students with internships and job placements. Our alumni work at leading companies worldwide with strong career growth opportunities.'
        },
        'scholarship': {
            keywords: ['scholarship', 'financial aid', 'grant', 'fellowship'],
            response: 'We offer merit-based and need-based scholarships to deserving students. Contact our admissions office for detailed information about available scholarship programs.'
        },
        'about': {
            keywords: ['about', 'mission', 'vision', 'history', 'university'],
            response: 'Eduford University is committed to providing quality education and fostering academic excellence. We focus on developing skilled professionals and researchers through innovative teaching and cutting-edge research.'
        }
    }
};

// Initialize Chatbot
function initChatbot() {
    createChatbotWidget();
    setupChatbotListeners();
}

function createChatbotWidget() {
    const chatbotHTML = `
        <div id="chatbot-widget" class="chatbot-widget">
            <div class="chatbot-header">
                <h3>Eduford Bot</h3>
                <button id="chatbot-close" class="chatbot-close">✕</button>
            </div>
            <div id="chatbot-messages" class="chatbot-messages">
                <div class="chatbot-message bot-message">
                    <p>Hello! 👋 I'm Eduford Bot. Ask me anything about Eduford University!</p>
                </div>
            </div>
            <div class="chatbot-input-area">
                <input 
                    type="text" 
                    id="chatbot-input" 
                    placeholder="Ask me anything..." 
                    autocomplete="off"
                >
                <button id="chatbot-send">Send</button>
            </div>
        </div>
        
        <button id="chatbot-toggle" class="chatbot-toggle">
            <i class="fa-solid fa-comments"></i>
        </button>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

function setupChatbotListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    const widget = document.getElementById('chatbot-widget');
    
    toggle.addEventListener('click', () => {
        widget.classList.toggle('active');
        if (widget.classList.contains('active')) {
            input.focus();
        }
    });
    
    close.addEventListener('click', () => {
        widget.classList.remove('active');
    });
    
    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // Display user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chatbot-message user-message';
    userDiv.innerHTML = `<p>${escapeHtml(userMessage)}</p>`;
    messages.appendChild(userDiv);
    
    // Get bot response
    const botResponse = getBotResponse(userMessage);
    
    // Simulate typing delay
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'chatbot-message bot-message';
        botDiv.innerHTML = `<p>${botResponse}</p>`;
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
    }, 500);
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(userInput) {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (chatbotData.greetings.some(greeting => input.includes(greeting))) {
        return 'Hi there! 👋 Welcome to Eduford University. How can I help you today?';
    }
    
    // Check FAQ
    for (const [key, data] of Object.entries(chatbotData.faq)) {
        if (data.keywords.some(keyword => input.includes(keyword))) {
            return data.response;
        }
    }
    
    // Default response
    return `I understand you\'re asking about: "${userInput}". I don\'t have specific information about that, but you can:\n• Visit our website\n• Contact us at +91 1234567890\n• Email: info@university.com\n\nOr ask me about: Courses, Admission, Faculty, Contact, Fees, Extracurricular, Facilities, Placement, or Scholarships!`;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
