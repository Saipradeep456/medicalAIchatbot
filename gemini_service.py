import os
import logging
from google import genai
from google.genai import types

class GeminiService:
    def __init__(self):
        # Get API key from environment
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        self.client = genai.Client(api_key=api_key)
        
    def get_healthcare_response(self, user_message: str, chat_history: list = None) -> str:
        """
        Get a healthcare-focused response from Gemini AI
        """
        try:
            # Create a healthcare-focused system prompt
            system_prompt = """You are a helpful healthcare information assistant. You provide accurate, evidence-based information about health topics, symptoms, and general wellness advice. Please provide helpful, accurate, and comprehensive healthcare information."""

            # Build conversation context
            conversation_parts = []
            
            # Add chat history if available
            if chat_history:
                for msg in chat_history[-10:]:  # Last 10 messages for context
                    role = "user" if msg.is_user else "model"
                    conversation_parts.append(types.Content(role=role, parts=[types.Part(text=msg.message)]))
            
            # Add current user message
            conversation_parts.append(types.Content(role="user", parts=[types.Part(text=user_message)]))
            
            # Generate response
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=conversation_parts,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    temperature=0.7,
                    max_output_tokens=1000
                )
            )
            
            if response.text:
                return response.text
            else:
                return "I apologize, but I'm having trouble generating a response right now. Please try again or consult with a healthcare professional if this is urgent."
                
        except Exception as e:
            logging.error(f"Error getting Gemini response: {str(e)}")
            return "I'm sorry, but I'm experiencing technical difficulties. Please try again later. If you have urgent healthcare concerns, please contact a healthcare professional or emergency services."

# Create global instance
gemini_service = GeminiService()
