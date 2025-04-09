import requests
import sqlite3
import json
import re
import ollama
from database.db import get_db_connection
def job_exists(title: str, description: str) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM jobs WHERE title = ? AND description = ?", (title, description))
    result = cursor.fetchone()
    conn.close()
    return result is not None

def summarize_job_description(description: str) -> dict:

    """Extract key information from job description using Ollama."""
    try:
        prompt = f"""Extract the following information from this job description:
        1. Required skills
        2. Required experience
        3. Required qualifications
        
        Job Description:
        {description}
        
        Format the response in a clear, structured way."""
        
        response = ollama.chat(model='tinyllama:latest', messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ])

        return response['message']['content']
    except Exception as e:
        print(f"Error in JD summarization: {str(e)}")
        return "Error analyzing job description"
