import pdfplumber
import docx2txt
import os
from fastapi import UploadFile
import re
def extract_text_from_resume(file: UploadFile) -> str:
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext == ".pdf":
        with pdfplumber.open(file.file) as pdf:
            text = "\n".join([page.extract_text() or "" for page in pdf.pages])
    
    elif file_ext == ".docx":
        text = docx2txt.process(file.file)
    
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX are allowed.")
    
    return text

def parse_resume_text(text: str) -> dict:
    name_match = re.search(r"Name:\s*(.+?)\s*Email:", text)
    email_match = re.search(r"Email:\s*([^\s]+)", text)
    phone_match = re.search(r"Phone:\s*([\+\d\-() ]+)", text)
    education_match = re.search(r"Education\s*(.*?)\s*Work Experience", text, re.DOTALL)
    experience_match = re.search(r"Work Experience\s*(.*?)\s*Skills", text, re.DOTALL)
    skills_match = re.search(r"Skills\s*(.*?)\s*Certifications", text, re.DOTALL)

    return {
        "name": name_match.group(1).strip() if name_match else None,
        "email": email_match.group(1).strip() if email_match else None,
        "phone": phone_match.group(1).strip() if phone_match else None,
        "education": education_match.group(1).strip() if education_match else None,
        "experience": experience_match.group(1).strip() if experience_match else None,
        "skills": skills_match.group(1).strip() if skills_match else None
    }