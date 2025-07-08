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
                "I apologize, but I'm experiencing technical difficulties. Please try again later. If you have urgent healthcare concerns, please contact a healthcare professional or emergency services.",
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

    async startNewChat() {
        try {
            const response = await fetch('/api/new-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create new chat');
            }

            // Reset current session
            this.currentSessionId = null;
            
            // Clear chat messages and show welcome message
            this.chatMessages.innerHTML = `
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
            `;

            // Clear any active chat history items
            document.querySelectorAll('.chat-history-item').forEach(item => {
                item.classList.remove('active');
            });

            // Focus on input
            this.messageInput.focus();

        } catch (error) {
            console.error('Error creating new chat:', error);
            alert('Failed to create new chat. Please try again.');
        }
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

    async loadSession(sessionId) {
        try {
            const response = await fetch(`/api/sessions/${sessionId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to load session');
            }

            // Set current session
            this.currentSessionId = sessionId;

            // Clear current messages
            this.chatMessages.innerHTML = '';

            // Load messages
            data.messages.forEach(message => {
                this.addMessage(message.message, message.is_user);
            });

            // Update active state in history
            document.querySelectorAll('.chat-history-item').forEach(item => {
                item.classList.remove('active');
            });
            event.currentTarget.classList.add('active');

            // Hide sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                this.sidebar.classList.remove('show');
            }

        } catch (error) {
            console.error('Error loading session:', error);
            alert('Failed to load chat session. Please try again.');
        }
    }

    async deleteSession(sessionId) {
        if (!confirm('Are you sure you want to delete this chat session?')) {
            return;
        }

        try {
            const response = await fetch(`/api/sessions/${sessionId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete session');
            }

            // If we're deleting the current session, start a new chat
            if (this.currentSessionId === sessionId) {
                this.startNewChat();
            }

            // Reload chat history
            this.loadChatHistory();

        } catch (error) {
            console.error('Error deleting session:', error);
            alert('Failed to delete chat session. Please try again.');
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

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(e.target) && 
        e.target !== toggleBtn) {
        sidebar.classList.remove('show');
    }
});
