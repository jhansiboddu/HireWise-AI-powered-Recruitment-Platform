from fastapi import APIRouter, UploadFile, File, HTTPException
import csv
import io
from helpers.job_summarizing_helper import summarize_job_description,job_exists
from database.db import insert_job_into_db  # 👈 you'll create this

router = APIRouter()

@router.post("/upload-jobs")
async def upload_job_csv(file: UploadFile = File(...)):
    try:
        content = await file.read()
        encodings_to_try = ['utf-8', 'windows-1252', 'iso-8859-1']
        decoded = None
        # Try decoding with various encodings
        for enc in encodings_to_try:
            try:
                decoded = content.decode(enc)
                #print(f"Decoded using {enc}")
                break
            except UnicodeDecodeError:
                continue
        if decoded is None:
            raise HTTPException(status_code=400, detail="Unsupported file encoding.")
        
        reader = csv.DictReader(io.StringIO(decoded,newline=''))

        for row in reader:
            print("Row found:", row)
            title = row.get("Job Title")
            description = row.get("Job Description")
            print(f"Title: {title}, Description: {description[:30]}...")  # ✅ Trim for readability
            if not title or not description:
                print("Skipping row due to missing title or description.")
                continue
             # 🛑 Check for duplicates
            if job_exists(title, description):
                print("Duplicate job found. Skipping:", title)
                continue
            summary = summarize_job_description(description)
            print(f"Summary Extracted: {summary}")

            job_data = {
                "title": title,
                "description": description,
                "summary": summary
            }

            insert_job_into_db(job_data)
            print("Inserted into DB:", job_data)

        return {"message": "All jobs processed and inserted."}

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail="Failed to process CSV.")
