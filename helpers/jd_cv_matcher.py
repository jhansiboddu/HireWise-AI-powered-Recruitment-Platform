import ollama
from database.db import get_db_connection, store_match_result

def get_match_score(job_summary,cand_skills, cand_qualifications, cand_experience):
    prompt = f"""
You are a helpful AI recruitment assistant.

Based on the following job description and candidate profile, give a match score from 0 to 100.
Score should reflect how well the candidate matches the required skills, qualifications, and experience. 
Consider partial matches and transferable skills too.

Give only a number. No explanation.

Job Description:
{job_summary}

Candidate Profile:
Skills: {cand_skills}
Qualifications: {cand_qualifications}
Experience: {cand_experience}
Match Score:
    """

    response = ollama.chat(model='phi', messages=[{'role': 'user', 'content': prompt}])
    try:
        return float(response['message']['content'].strip())
    except:
        return 0.0

def run_matching():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Fetch existing match records to avoid duplicates
    cursor.execute("SELECT job_id, candidate_id FROM match_results")
    existing_matches = set(cursor.fetchall())  # Set of tuples like (job_id, candidate_id)

    # Fetch all jobs
    cursor.execute("SELECT id, summary FROM jobs")
    jobs = cursor.fetchall()

    # Fetch all candidates
    cursor.execute("SELECT id, skills, education, experience FROM candidates")
    candidates = cursor.fetchall()

    for job in jobs:
        
        job_id, job_summary = job
        job_summary = job_summary or ''

        for candidate in candidates:
            candidate_id = candidate[0]
            cand_skills = candidate[1] or ''
            cand_qualifications = candidate[2] or ''
            cand_experience = candidate[3] or ''
            # 🚫 Skip if already matched
            if (job_id, candidate_id) in existing_matches:
                continue
            score = get_match_score(
                job_summary,
                cand_skills, cand_qualifications, cand_experience
            )

            store_match_result(job_id, candidate_id, score)

    conn.close()
    return {"message": "Matching complete using focused job/candidate attributes."}
