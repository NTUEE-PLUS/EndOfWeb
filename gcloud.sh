export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
gcloud builds submit --tag gcr.io/$PROJECT_ID/eeplusweb
gcloud run deploy --image gcr.io/$PROJECT_ID/eeplusweb