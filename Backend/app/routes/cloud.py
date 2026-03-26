from fastapi import APIRouter

router = APIRouter()

@router.get("/scan")
def perform_scan():
    # Example logic
    issues = [
        {"resource": "AWS S3 Bucket", "issue": "Public Access Enabled"},
        {"resource": "EC2 Instance", "issue": "Open SSH Port 22"}
    ]
    return {"status": "Scan Complete", "issues": issues}
