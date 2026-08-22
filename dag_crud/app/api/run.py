from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.dependencies import get_db
from app.worker.tasks import run_dag
from app.models.dag_runs import DAGRun
from app.core.auth import get_current_user

router = APIRouter(prefix="/dags", tags=["Executions"])

@router.post("/{dag_id}/run")
def run_pipeline(
    dag_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    dag_run = DAGRun(
        dag_id=dag_id,
        user_id=current_user["sub"],
        status="Queued",
    )

    db.add(dag_run)
    db.commit()
    db.refresh(dag_run)

    run_dag.delay(dag_id, dag_run.id)

    return {
        "message": f"DAG {dag_id} execution started",
        "run_id": dag_run.id,
    }

@router.get("/runs")
def get_runs(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    runs = (
        db.query(DAGRun)
        .filter(DAGRun.user_id == current_user["sub"])
        .order_by(DAGRun.id.desc())
        .all()
    )

    return [
        {
            "id": run.id,
            "dag_id": run.dag_id,
            "dag_name": run.dag.dag_name if run.dag else None,
            "status": run.status,
            "start_time": run.start_time,
            "end_time": run.end_time,
            "execution_time": run.execution_time,
            "records_extracted": run.records_extracted,
            "records_transformed": run.records_transformed,
            "records_loaded": run.records_loaded,
        }
        for run in runs
    ]

@router.get("/runs/{run_id}")
def get_run(
    run_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    run = (
        db.query(DAGRun)
        .filter(
            DAGRun.id == run_id,
            DAGRun.user_id == current_user["sub"],
        )
        .first()
    )

    if not run:
        raise HTTPException(status_code=404, detail="Run not found")

    return {
        "id": run.id,
        "dag_id": run.dag_id,
        "dag_name": run.dag.dag_name if run.dag else None,
        "status": run.status,
        "start_time": run.start_time,
        "end_time": run.end_time,
        "execution_time": run.execution_time,
        "records_extracted": run.records_extracted,
        "records_transformed": run.records_transformed,
        "records_loaded": run.records_loaded,
        "logs": run.log,
    }


