from fastapi import APIRouter
from helpers.jd_cv_matcher import run_matching

router = APIRouter()

@router.post("/run-matching")
def run_job_candidate_matching():
    return run_matching()
