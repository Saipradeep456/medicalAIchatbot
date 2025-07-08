from flask import render_template, request, jsonify, redirect, url_for
from app import app, db
from models import ChatSession, Message
from gemini_service import gemini_service
import logging
import uuid

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html')

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "Healthcare Chatbot"})

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({"error": "Message is required"}), 400
        
        user_message = data['message'].strip()
        session_id = data.get('session_id')
        
        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400
        
        # Create new session if none provided
        if not session_id:
            session_id = str(uuid.uuid4())
            session = ChatSession(session_id=session_id)
            
            # Set title based on first message (first few words)
            title_words = user_message.split()[:5]
            session.title = ' '.join(title_words) + ('...' if len(title_words) == 5 else '')
            
            db.session.add(session)
            db.session.commit()
        else:
            # Get existing session
            session = ChatSession.query.filter_by(session_id=session_id).first()
            if not session:
                return jsonify({"error": "Session not found"}), 404
        
        # Save user message
        user_msg = Message(
            session_id=session_id,
            message=user_message,
            is_user=True
        )
        db.session.add(user_msg)
        db.session.commit()
        
        # Get chat history for context
        chat_history = Message.query.filter_by(session_id=session_id).order_by(Message.timestamp).all()
        
        # Get AI response
        ai_response = gemini_service.get_healthcare_response(user_message, chat_history[:-1])  # Exclude current message
        
        # Save AI response
        ai_msg = Message(
            session_id=session_id,
            message=ai_response,
            is_user=False
        )
        db.session.add(ai_msg)
        db.session.commit()
        
        return jsonify({
            "response": ai_response,
            "session_id": session_id,
            "user_message": user_message
        })
        
    except Exception as e:
        logging.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": "An error occurred while processing your message"}), 500

@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    """Get all chat sessions"""
    try:
        sessions = ChatSession.query.order_by(ChatSession.created_at.desc()).all()
        return jsonify([session.to_dict() for session in sessions])
    except Exception as e:
        logging.error(f"Error getting sessions: {str(e)}")
        return jsonify({"error": "Failed to retrieve sessions"}), 500

@app.route('/api/sessions/<session_id>', methods=['GET'])
def get_session_messages(session_id):
    """Get messages for a specific session"""
    try:
        session = ChatSession.query.filter_by(session_id=session_id).first()
        if not session:
            return jsonify({"error": "Session not found"}), 404
        
        messages = Message.query.filter_by(session_id=session_id).order_by(Message.timestamp).all()
        return jsonify({
            "session": session.to_dict(),
            "messages": [msg.to_dict() for msg in messages]
        })
    except Exception as e:
        logging.error(f"Error getting session messages: {str(e)}")
        return jsonify({"error": "Failed to retrieve session messages"}), 500

@app.route('/api/sessions/<session_id>', methods=['DELETE'])
def delete_session(session_id):
    """Delete a chat session and all its messages"""
    try:
        session = ChatSession.query.filter_by(session_id=session_id).first()
        if not session:
            return jsonify({"error": "Session not found"}), 404
        
        db.session.delete(session)
        db.session.commit()
        
        return jsonify({"message": "Session deleted successfully"})
    except Exception as e:
        logging.error(f"Error deleting session: {str(e)}")
        return jsonify({"error": "Failed to delete session"}), 500

@app.route('/api/new-chat', methods=['POST'])
def new_chat():
    """Create a new chat session"""
    try:
        session_id = str(uuid.uuid4())
        return jsonify({"session_id": session_id})
    except Exception as e:
        logging.error(f"Error creating new chat: {str(e)}")
        return jsonify({"error": "Failed to create new chat"}), 500
