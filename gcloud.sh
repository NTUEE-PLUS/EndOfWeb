export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
gcloud builds submit --tag gcr.io/$PROJECT_ID/eeplusweb
gcloud config set run/region asia-east1
gcloud run deploy eeplus --image gcr.io/$PROJECT_ID/eeplusweb