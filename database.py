import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

# Vercel's filesystem is read-only except /tmp, so fall back to a writable
# SQLite database when no DATABASE_URL is provided. For production, always set
# DATABASE_URL to a managed Postgres instance (e.g. Neon/Supabase).
if not DATABASE_URL:
    DATABASE_URL = "sqlite:////tmp/todo.db"

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
    )
else:
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_size=1,
        max_overflow=0,
    )

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)

Base = declarative_base()
