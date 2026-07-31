import os
from celery import Celery

celery = Celery(
    "airglow_clone",
    broker=os.getenv("CELERY_BROKER_URL"),
    backend=os.getenv("CELERY_RESULT_BACKEND"),
    include=["app.worker.tasks"],
)

celery.conf.beat_schedule = {
    "scan-dags-every-minute":{
        "task": "app.worker.tasks.scan_and_trigger_dags",
        "schedule": 60.0
    }
    }
