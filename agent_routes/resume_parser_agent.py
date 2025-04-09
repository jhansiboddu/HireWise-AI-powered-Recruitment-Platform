from fastapi import APIRouter, UploadFile, File, HTTPException
from helpers.resume_parsing_helper import extract_text_from_resume , parse_resume_text
from database.db import create_candidates_table , get_db_connection,store_candidate_data
router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        raw_text = extract_text_from_resume(file)
        # Assume you’ve already extracted text as `text`
        print("Extracted Text:\n", raw_text)
        parsed_data = parse_resume_text(raw_text)
         # Assume you’re calling: parsed_data = extract_details(text)
        print("Parsed Data:\n", parsed_data)
        create_candidates_table()
        store_candidate_data(parsed_data)  # inserts data
        return {"message": "Candidate parsed and stored successfully", "candidate": parsed_data}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print("Error:", str(e))  # 👈 Add this
        raise HTTPException(status_code=500, detail="Something went wrong while processing the resume.")
