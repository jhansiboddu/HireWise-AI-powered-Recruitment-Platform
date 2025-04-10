import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent_routes.resume_parser_agent import router as resume_parser_router
from agent_routes.jd_summarizer import router as jd_summarizer_router
from agent_routes.matcher import router as matcher_router
from agent_routes.shortlister import router as shortilst_router
from fastapi.responses import JSONResponse

from database.db import create_candidates_table , create_job_table , create_match_results_table
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Initialize DB tables
create_candidates_table()
create_job_table()
create_match_results_table()

def get_db_connection():
    conn = sqlite3.connect("hireWise.db")
    # conn.row_factory = sqlite3.Row
    return conn

app.include_router(resume_parser_router, prefix="/resume", tags=["Resume Parser"])
app.include_router(jd_summarizer_router, prefix="/jd", tags=["JD Summarizer"])
app.include_router(matcher_router,prefix="/match-score",tags=["Match JD and CV"])
app.include_router(shortilst_router,prefix="/shortlist",tags=["Shortlist Candidates"])

@app.get("/dashboard_summary")
def dashboard():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM jobs")
    jobs = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM candidates")
    candidates = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM match_results")
    matches = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM match_results WHERE match_score >= 0.8")
    shortlisted = cursor.fetchone()[0]

    conn.close()
    return {
        "total_jobs": jobs,
        "total_candidates": candidates,
        "total_matches": matches,
        "shortlisted_candidates": shortlisted
    }


# @app.get("/job-matches")
# def get_job_match_summary():
#     conn = get_db_connection()
#     cursor = conn.cursor()
    
#     cursor.execute("""
#         SELECT 
#             j.id as job_id,
#             j.title as job_title,
#             COUNT(m.id) as matches_found,
#             CASE 
#                 WHEN COUNT(m.id) = 0 THEN 'No Candidates'
#                 WHEN SUM(m.is_shortlisted) > 0 THEN 'Shortlisting'
#                 ELSE 'Pending'
#             END as status
#         FROM jobs j
#         LEFT JOIN match_results m ON j.id = m.job_id
#         GROUP BY j.id
#     """)
    
#     rows = cursor.fetchall()
#     columns = [desc[0] for desc in cursor.description]
#     result = [dict(zip(columns, row)) for row in rows]
#     return JSONResponse(content=result)

@app.get("/job-matches")
def get_job_match_summary():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            j.id AS job_id,
            j.title AS job_title,
            COUNT(m.id) AS matches_found,
            SUM(CASE WHEN m.is_shortlisted = 1 THEN 1 ELSE 0 END) AS shortlisted_candidates,
            CASE 
                WHEN COUNT(m.id) = 0 THEN 'No Candidates'
                WHEN SUM(m.is_shortlisted) > 0 THEN 'Shortlisting'
                ELSE 'Pending'
            END AS status
        FROM jobs j
        LEFT JOIN match_results m ON j.id = m.job_id
        GROUP BY j.id
    """)

    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in rows]
    return JSONResponse(content=result)
