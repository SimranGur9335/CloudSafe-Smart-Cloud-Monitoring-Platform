def check_public_bucket(policy):
    if "AllUsers" in policy:
        return {"result": "Non-Compliant", "reason": "Public access"}
    return {"result": "Compliant"}
