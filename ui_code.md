# Healthcare Chatbot UI Code

## HTML Structure (templates/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healthcare Chatbot - K-HUB 2025-26</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <!-- Sidebar for Chat History -->
            <div class="col-md-3 col-lg-2 sidebar" id="sidebar">
                <div class="sidebar-header">
                    <h5><i class="fas fa-stethoscope me-2"></i>Healthcare Chat</h5>
                    <button class="btn btn-primary btn-sm w-100 mb-3" id="newChatBtn">
                        <i class="fas fa-plus me-2"></i>New Chat
                    </button>
                </div>
                
                <div class="chat-history">
                    <h6 class="text-muted mb-3">Chat History</h6>
                    <div id="chatHistory" class="chat-history-list">
                        <!-- Chat history will be loaded here -->
                    </div>
                </div>
            </div>
            
            <!-- Main Chat Area -->
            <div class="col-md-9 col-lg-10 main-content">
                <!-- Header -->
                <div class="chat-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h4 class="mb-0"><i class="fas fa-robot me-2 text-primary"></i>Healthcare Assistant</h4>
                            <small class="text-muted">Powered by Google Gemini AI</small>
                        </div>
                        <button class="btn btn-outline-secondary d-md-none" id="toggleSidebar">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Chat Messages Area -->
                <div class="chat-messages" id="chatMessages">
                    <div class="welcome-message text-center">
                        <div class="welcome-icon mb-3">
                            <i class="fas fa-heart-pulse fa-3x text-primary"></i>
                        </div>
                        <h3>Welcome to Healthcare Assistant</h3>
                        <p class="text-muted">I'm here to help you with healthcare-related questions and information.</p>
                        
                        <div class="example-questions mt-4">
                            <h6>Try asking about:</h6>
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <button class="btn btn-outline-primary btn-sm w-100 example-btn" data-question="What are the symptoms of diabetes?">
                                        <i class="fas fa-question-circle me-2"></i>Symptoms of diabetes
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-outline-primary btn-sm w-100 example-btn" data-question="How can I manage high blood pressure?">
                                        <i class="fas fa-question-circle me-2"></i>Managing blood pressure
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-outline-primary btn-sm w-100 example-btn" data-question="What should I do for a minor cut?">
                                        <i class="fas fa-question-circle me-2"></i>First aid for cuts
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-outline-primary btn-sm w-100 example-btn" data-question="When should I see a doctor for a headache?">
                                        <i class="fas fa-question-circle me-2"></i>When to see a doctor
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Loading Indicator -->
                <div class="loading-indicator" id="loadingIndicator" style="display: none;">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span class="text-muted ms-2">Healthcare Assistant is typing...</span>
                </div>
                
                <!-- Input Area -->
                <div class="chat-input-area">
                    <form id="chatForm" class="d-flex gap-2">
                        <div class="flex-grow-1">
                            <textarea 
                                id="messageInput" 
                                class="form-control" 
                                placeholder="Ask me about your health concerns..."
                                rows="1"
                                style="resize: none; overflow-y: hidden;"
                            ></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" id="sendBtn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom JavaScript -->
    <script src="{{ url_for('static', filename='js/main.js') }}"></script>
</body>
</html>
```

## CSS Styling (static/css/style.css)

```css
/* Healthcare Chatbot Custom Styles */

:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #27ae60;
    --warning-color: #f39c12;
    --danger-color: #e74c3c;
    --light-bg: #f8f9fa;
    --dark-bg: #2c3e50;
    --message-bg: #ffffff;
    --user-message-bg: #e3f2fd;
    --ai-message-bg: #f1f8e9;
    --border-color: #dee2e6;
    --text-color: #333333;
    --text-muted: #6c757d;
}

html, body {
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--light-bg);
}

/* Sidebar Styles */
.sidebar {
    background-color: var(--dark-bg);
    color: white;
    padding: 0;
    min-height: 100vh;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sidebar h5 {
    color: white;
    margin-bottom: 1rem;
    font-weight: 600;
}

.chat-history {
    padding: 1rem;
}

.chat-history-list {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}

.chat-history-item {
    background-color: rgba(255,255,255,0.1);
    border: none;
    border-radius: 8px;
    color: white;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    text-align: left;
    transition: all 0.3s ease;
    width: 100%;
    cursor: pointer;
}

.chat-history-item:hover {
    background-color: rgba(255,255,255,0.2);
    transform: translateX(5px);
}

.chat-history-item.active {
    background-color: var(--secondary-color);
}

.chat-history-item .chat-title {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chat-history-item .chat-date {
    font-size: 0.75rem;
    opacity: 0.7;
}

.chat-history-item .delete-btn {
    float: right;
    background: none;
    border: none;
    color: rgba(255,255,255,0.7);
    font-size: 0.8rem;
    padding: 0.25rem;
    border-radius: 3px;
    transition: all 0.3s ease;
}

.chat-history-item .delete-btn:hover {
    color: var(--danger-color);
    background-color: rgba(255,255,255,0.1);
}

/* Main Content Styles */
.main-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0;
}

.chat-header {
    background-color: white;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.welcome-message {
    padding: 3rem 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.welcome-icon {
    opacity: 0.8;
}

.example-questions {
    max-width: 500px;
    margin: 0 auto;
}

.example-btn {
    text-align: left;
    font-size: 0.9rem;
    border-color: var(--secondary-color);
    color: var(--secondary-color);
    transition: all 0.3s ease;
}

.example-btn:hover {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
    color: white;
    transform: translateY(-2px);
}

/* Message Styles */
.message {
    margin-bottom: 1.5rem;
    max-width: 70%;
    animation: fadeInUp 0.3s ease;
}

.message.user-message {
    margin-left: auto;
}

.message.ai-message {
    margin-right: auto;
}

.message-content {
    padding: 1rem 1.25rem;
    border-radius: 18px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-message .message-content {
    background-color: var(--secondary-color);
    color: white;
    border-bottom-right-radius: 6px;
}

.ai-message .message-content {
    background-color: white;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-bottom-left-radius: 6px;
}

.message-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
}

.message-header i {
    margin-right: 0.5rem;
}

.user-message .message-header {
    color: rgba(255,255,255,0.9);
}

.ai-message .message-header {
    color: var(--secondary-color);
}

.message-text {
    line-height: 1.6;
    font-size: 0.95rem;
}

.message-time {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-top: 0.5rem;
    text-align: right;
}

/* Loading Indicator */
.loading-indicator {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
}

.typing-indicator {
    display: flex;
    gap: 0.3rem;
}

.typing-dot {
    width: 8px;
    height: 8px;
    background-color: var(--text-muted);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Input Area */
.chat-input-area {
    background-color: white;
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
}

#messageInput {
    border: 2px solid var(--border-color);
    border-radius: 25px;
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    max-height: 120px;
}

#messageInput:focus {
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}

#sendBtn {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: var(--secondary-color);
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

#sendBtn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

#sendBtn:disabled {
    background-color: var(--text-muted);
    transform: none;
    box-shadow: none;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        top: 0;
        left: -100%;
        width: 280px;
        z-index: 1050;
        transition: left 0.3s ease;
    }
    
    .sidebar.show {
        left: 0;
    }
    
    .main-content {
        width: 100%;
    }
    
    .message {
        max-width: 85%;
    }
    
    .chat-input-area {
        padding: 1rem;
    }
    
    .welcome-message {
        padding: 2rem 1rem;
    }
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar,
.chat-history-list::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-track,
.chat-history-list::-webkit-scrollbar-track {
    background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.2);
    border-radius: 3px;
}

.chat-history-list::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,0.3);
    border-radius: 3px;
}
```

## JavaScript Functionality (static/js/main.js)

```javascript
// Healthcare Chatbot JavaScript

class HealthcareChatbot {
    constructor() {
        this.currentSessionId = null;
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.chatHistory = document.getElementById('chatHistory');
        this.sidebar = document.getElementById('sidebar');
        
        this.initializeEventListeners();
        this.loadChatHistory();
        this.autoResizeTextarea();
    }

    initializeEventListeners() {
        // Chat form submission
        document.getElementById('chatForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Enter key handling (Shift+Enter for new line, Enter to send)
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // New chat button
        document.getElementById('newChatBtn').addEventListener('click', () => {
            this.startNewChat();
        });

        // Toggle sidebar for mobile
        document.getElementById('toggleSidebar')?.addEventListener('click', () => {
            this.sidebar.classList.toggle('show');
        });

        // Example question buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('example-btn') || e.target.closest('.example-btn')) {
                const button = e.target.classList.contains('example-btn') ? e.target : e.target.closest('.example-btn');
                const question = button.getAttribute('data-question');
                this.messageInput.value = question;
                this.sendMessage();
            }
        });
    }

    autoResizeTextarea() {
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Disable input and show loading
        this.setLoading(true);
        
        // Clear welcome message if it exists
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // Add user message to chat
        this.addMessage(message, true);
        
        // Clear input
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    session_id: this.currentSessionId
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Update session ID if it's a new chat
            if (!this.currentSessionId) {
                this.currentSessionId = data.session_id;
                this.loadChatHistory(); // Refresh chat history
            }

            // Add AI response to chat
            this.addMessage(data.response, false);

        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage(
                "I apologize, but I'm experiencing technical difficulties. Please try again later.",
                false,
                true
            );
        } finally {
            this.setLoading(false);
        }
    }

    addMessage(text, isUser, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content ${isError ? 'border-danger' : ''}">
                <div class="message-header">
                    <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
                    ${isUser ? 'You' : 'Healthcare Assistant'}
                </div>
                <div class="message-text">${this.formatMessage(text)}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(text) {
        // Basic formatting for AI responses
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/- (.*?)(?=\n|$)/g, '• $1') // Bullet points
            .replace(/(\d+\.) (.*?)(?=\n|$)/g, '<strong>$1</strong> $2'); // Numbered lists
    }

    setLoading(loading) {
        this.loadingIndicator.style.display = loading ? 'flex' : 'none';
        this.sendBtn.disabled = loading;
        this.messageInput.disabled = loading;
        
        if (loading) {
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    async loadChatHistory() {
        try {
            const response = await fetch('/api/sessions');
            const sessions = await response.json();

            if (!response.ok) {
                throw new Error('Failed to load chat history');
            }

            this.chatHistory.innerHTML = '';

            if (sessions.length === 0) {
                this.chatHistory.innerHTML = '<p class="text-muted small text-center">No chat history yet</p>';
                return;
            }

            sessions.forEach(session => {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'chat-history-item';
                sessionDiv.innerHTML = `
                    <span class="chat-title">${session.title}</span>
                    <small class="chat-date">${this.formatDate(session.created_at)}</small>
                    <button class="delete-btn" onclick="event.stopPropagation(); chatbot.deleteSession('${session.session_id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                `;

                sessionDiv.addEventListener('click', () => this.loadSession(session.session_id));
                this.chatHistory.appendChild(sessionDiv);
            });

        } catch (error) {
            console.error('Error loading chat history:', error);
            this.chatHistory.innerHTML = '<p class="text-muted small text-center">Failed to load chat history</p>';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new HealthcareChatbot();
});
```

This complete UI code creates a professional healthcare chatbot interface with:

1. **Modern Design**: Clean, responsive layout with Bootstrap 5
2. **Chat Features**: Real-time messaging, typing indicators, message formatting
3. **Session Management**: Create new chats, view history, delete sessions
4. **Mobile Support**: Responsive sidebar, touch-friendly controls
5. **Interactive Elements**: Example questions, auto-resizing textarea
6. **Professional Styling**: Healthcare-themed colors, smooth animations