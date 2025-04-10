
from fastapi.responses import JSONResponse

from fastapi import APIRouter, Form, Request, Query
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from database.db import get_db_connection

router = APIRouter()

# Email config
conf = ConnectionConfig(
    MAIL_USERNAME="anupamagampa1@gmail.com",
    MAIL_PASSWORD="rnna dshn gqby kqnp",
    MAIL_FROM="anupamagampa1@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

# @router.get("/shortlisted", response_class=HTMLResponse)
# def show_candidates(job_id: int = Query(...)):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     # Step 1: Mark candidates as shortlisted if score >= 70
#     cursor.execute("""
#         UPDATE match_results
#         SET is_shortlisted = 1
#         WHERE job_id = ? AND match_score >= 70
#     """, (job_id,))
#     conn.commit()
    
#     cursor.execute("""
#         SELECT c.id, c.name, c.email, m.match_score
#         FROM candidates c
#         JOIN match_results m ON c.id = m.candidate_id
#         WHERE m.job_id = ? AND m.match_score >= 70 AND m.is_shortlisted = 1 AND m.is_emailed = 0
#     """, (job_id,))
#     candidates = cursor.fetchall()
#     print("Fetched candidates:", candidates)
#     conn.close()

#     # Build HTML
#     html_content = """
#     <!DOCTYPE html>
#     <html>
#     <head>
#         <title>Shortlisted Candidates</title>
#     </head>
#     <body>
#         <h2>Shortlisted Candidates (Match Score ≥ 70)</h2>
#         <p>Total candidates found: {total}</p>
#         <table border="1" cellpadding="10">
#             <tr>
#                 <th>Name</th>
#                 <th>Email</th>
#                 <th>Score</th>
#                 <th>Action</th>
#             </tr>
#     """.format(total=len(candidates))

#     for id, name, email, score in candidates:
#         html_content += f"""
#             <tr>
#                 <td>{name}</td>
#                 <td>{email}</td>
#                 <td>{score}</td>
#                 <td>
#                     <form action="/send_email/" method="post">
#                         <input type="hidden" name="candidate_id" value="{id}">
#                         <input type="hidden" name="job_id" value="{job_id}">
#                         <button type="submit">Send Email</button>
#                     </form>
#                 </td>
#             </tr>
#         """

#     html_content += """
#         </table>
#     </body>
#     </html>
#     """

#     return HTMLResponse(content=html_content)

@router.get("/shortlisted", response_class=HTMLResponse)
def show_candidates(job_id: int = Query(...)):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Step 1: Mark candidates as shortlisted if score >= 70
    cursor.execute("""
        UPDATE match_results
        SET is_shortlisted = 1
        WHERE job_id = ? AND match_score >= 70
    """, (job_id,))
    conn.commit()
    
    cursor.execute("""
        SELECT c.id, c.name, c.email, m.match_score
        FROM candidates c
        JOIN match_results m ON c.id = m.candidate_id
        WHERE m.job_id = ? AND m.match_score >= 70 AND m.is_shortlisted = 1 AND m.is_emailed = 0
    """, (job_id,))
    candidates = cursor.fetchall()
    print("Fetched candidates:", candidates)
    conn.close()

    if not candidates:
        return JSONResponse(content={"message": "No shortlisted candidates."})

    return HTMLResponse(
        content=f"<h1>Shortlisted for job {job_id}</h1><ul>" +
                "".join(f"<li>{name} - {email} - {score}</li>" for name, email, score, _ in candidates) +
                "</ul>"
    )
    # # Build HTML
    # html_content = """
    # <!DOCTYPE html>
    # <html>
    # <head>
    #     <title>Shortlisted Candidates</title>
    # </head>
    # <body>
    #     <h2>Shortlisted Candidates (Match Score ≥ 70)</h2>
    #     <p>Total candidates found: {total}</p>
    #     <table border="1" cellpadding="10">
    #         <tr>
    #             <th>Name</th>
    #             <th>Email</th>
    #             <th>Score</th>
    #             <th>Action</th>
    #         </tr>
    # """.format(total=len(candidates))

    # for id, name, email, score in candidates:
    #     html_content += f"""
    #         <tr>
    #             <td>{name}</td>
    #             <td>{email}</td>
    #             <td>{score}</td>
    #             <td>
    #                 <form action="/send_email/" method="post">
    #                     <input type="hidden" name="candidate_id" value="{id}">
    #                     <input type="hidden" name="job_id" value="{job_id}">
    #                     <button type="submit">Send Email</button>
    #                 </form>
    #             </td>
    #         </tr>
    #     """

    # html_content += """
    #     </table>
    # </body>
    # </html>
    # """

    

@router.post("/send_email/")
async def send_email(candidate_id: int = Form(...), job_id: int = Form(...)):
    try:
        print("Received candidate_id:", candidate_id)

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT name, email FROM candidates WHERE id = ?", (candidate_id,))
        result = cursor.fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Candidate not found")

        name, email = result

        message = MessageSchema(
            subject="🎉 You're Shortlisted!",
            recipients=[email],
            body=f"""
Hi {name},

Congratulations! You have been shortlisted for the next round of interviews.

We will reach out to you soon with more details.

Best,
HR Team
            """,
            subtype="plain"
        )

        fm = FastMail(conf)
        await fm.send_message(message)

        # Update match_results
        cursor.execute("""
            UPDATE match_results 
            SET is_emailed = 1, is_shortlisted = 1 
            WHERE candidate_id = ? AND job_id = ?
        """, (candidate_id, job_id))

        conn.commit()
        conn.close()

        return {"message": "Email sent successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))