import sqlite3

def get_db_connection():
    conn = sqlite3.connect("hireWise.db")
    # conn.row_factory = sqlite3.Row
    return conn

def create_candidates_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            education TEXT,
            experience TEXT,
            skills TEXT
        );
    """)
    conn.commit()
    conn.close()

def store_candidate_data(parsed_data: dict):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO candidates (name, email, phone, education, experience, skills)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        parsed_data.get("name"),
        parsed_data.get("email"),
        parsed_data.get("phone"),
        parsed_data.get("education"),
        parsed_data.get("experience"),
        parsed_data.get("skills")
    ))
    conn.commit()
    conn.close()

def create_job_table():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            summary TEXT
        );
    """)

    conn.commit()
    conn.close()

def insert_job_into_db(job_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO jobs (title, description, summary)
        VALUES (?, ?, ?)
    ''', (
        job_data['title'],
        job_data['description'],
        job_data['summary']
    ))

    conn.commit()
    conn.close()

def create_match_results_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS match_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER,
            candidate_id INTEGER,
            match_score REAL,
            is_shortlisted BOOLEAN DEFAULT 0
        );
    """)
    conn.commit()
    conn.close()

def store_match_result(job_id: int, candidate_id: int, score: float):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO match_results (job_id, candidate_id, match_score, is_shortlisted,is_emailed)
        VALUES (?, ?, ?, 0,0)
    """, (job_id, candidate_id, score))
    conn.commit()
    conn.close()

def get_all_candidates():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM candidates")
    results = cursor.fetchall()
    conn.close()
    return results

def get_all_jobs():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs")
    results = cursor.fetchall()
    conn.close()
    return results