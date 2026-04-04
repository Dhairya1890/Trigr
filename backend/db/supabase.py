import os


def get_supabase_config() -> dict:
    return {"url": os.getenv("SUPABASE_URL", ""), "key": os.getenv("SUPABASE_KEY", "")}
