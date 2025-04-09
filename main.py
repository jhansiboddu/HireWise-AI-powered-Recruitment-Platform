from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent_routes.resume_parser_agent import router as resume_parser_router
from agent_routes.jd_summarizer import router as jd_summarizer_router
from agent_routes.matcher import router as matcher_router
from agent_routes.shortlister import router as shortilst_router
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

app.include_router(resume_parser_router, prefix="/resume", tags=["Resume Parser"])
app.include_router(jd_summarizer_router, prefix="/jd", tags=["JD Summarizer"])
app.include_router(matcher_router,prefix="/match-score",tags=["Match JD and CV"])
app.include_router(shortilst_router,prefix="/shortlist",tags=["Shortlist Candidates"])