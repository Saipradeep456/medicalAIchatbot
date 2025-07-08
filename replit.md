# Healthcare Chatbot - K-HUB 2025-26

## Overview

This is a Flask-based healthcare chatbot application that leverages Google's Gemini AI to provide healthcare information and assistance. The system features a web-based chat interface with persistent chat history, session management, and a responsive design optimized for healthcare-related conversations.

## System Architecture

### Backend Architecture
- **Framework**: Flask web framework with SQLAlchemy ORM
- **Database**: SQLite for development (configurable via environment variables)
- **AI Integration**: Google Gemini API for natural language processing
- **Session Management**: UUID-based chat sessions with persistent storage

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask
- **Styling**: Bootstrap 5 for responsive design with custom CSS
- **JavaScript**: Vanilla JavaScript for dynamic chat interactions
- **Icons**: Font Awesome for UI elements

### Database Schema
- **ChatSession**: Stores chat sessions with unique IDs, titles, and timestamps
- **Message**: Stores individual messages linked to sessions with user/AI classification

## Key Components

### Core Application (`app.py`)
- Flask application factory with database initialization
- SQLAlchemy configuration with connection pooling
- ProxyFix middleware for deployment compatibility
- Environment-based configuration for database and session secrets

### AI Service (`gemini_service.py`)
- Google Gemini API integration with healthcare-focused system prompts
- Conversation context management with chat history
- Safety guidelines for medical information delivery
- Temperature and token limit configuration for appropriate responses

### Data Models (`models.py`)
- **ChatSession**: Session management with UUID generation and metadata
- **Message**: Message storage with timestamp and user classification
- Relationship mapping between sessions and messages with cascade deletion

### API Routes (`routes.py`)
- REST endpoints for chat functionality
- Session creation and management
- Message persistence and retrieval
- Health check endpoint for monitoring

### Frontend Components
- **Chat Interface**: Real-time messaging with typing indicators
- **Session Management**: New chat creation and history navigation
- **Responsive Design**: Mobile-friendly sidebar and chat layout
- **Message Display**: Differentiated styling for user and AI messages

## Data Flow

1. **User Interaction**: User submits message through web interface
2. **Session Management**: System creates new session or retrieves existing one
3. **Message Storage**: User message saved to database with session association
4. **AI Processing**: Message sent to Gemini API with conversation context
5. **Response Generation**: AI generates healthcare-appropriate response
6. **Response Storage**: AI response saved to database and returned to frontend
7. **UI Update**: Frontend displays conversation with proper formatting

## External Dependencies

### Required Services
- **Google Gemini API**: Primary AI service for healthcare responses
- **SQLite3 Database**: Local database storage for chat sessions and messages

### Environment Variables
- `GEMINI_API_KEY`: Google Gemini API authentication (required)
- `SESSION_SECRET`: Flask session encryption key (optional, has default)

### Python Packages
- Flask: Web framework
- SQLAlchemy: Database ORM
- google-genai: Google Gemini API client
- Werkzeug: WSGI utilities and middleware

### Frontend Dependencies
- Bootstrap 5: CSS framework
- Font Awesome: Icon library
- Modern web browser with JavaScript support

## Deployment Strategy

### Development Environment
- Local SQLite database for rapid development
- Flask development server with debug mode
- Environment variable configuration for API keys

### Production Considerations
- Database migration to PostgreSQL recommended
- ProxyFix middleware configured for reverse proxy deployment
- Environment-based configuration for security
- Logging configured for debugging and monitoring

### Scalability Features
- Database connection pooling with recycle and ping settings
- Session-based architecture allows horizontal scaling
- Stateless API design for load balancer compatibility

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.