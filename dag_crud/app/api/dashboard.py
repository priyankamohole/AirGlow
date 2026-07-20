from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.auth import get_current_user
from app.db.dependencies import get_db
from app.models.dag import DAG
from app.models.dag_runs import DAGRun
from app.models.output_file import OutputFile

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):

    total_dags = (
        db.query(DAG)
        .filter(DAG.user_id == user_id)
        .count()
    )

    total_runs = (
        db.query(DAGRun)
        .filter(DAGRun.user_id == user_id)
        .count()
    )

    successful_runs = (
        db.query(DAGRun)
        .filter(
            DAGRun.user_id == user_id,
            DAGRun.status == "success"
        )
        .count()
    )

    failed_runs = (
        db.query(DAGRun)
        .filter(
            DAGRun.user_id == user_id,
            DAGRun.status == "failed"
        )
        .count()
    )

    files_generated = (
        db.query(OutputFile)
        .filter(OutputFile.user_id == user_id)
        .count()
    )

    return {
        "total_dags": total_dags,
        "total_runs": total_runs,
        "successful_runs": successful_runs,
        "failed_runs": failed_runs,
        "files_generated": files_generated
    }