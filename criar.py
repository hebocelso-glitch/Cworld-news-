import sqlite3

conn = sqlite3.connect('banco.db')
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    noticia_id TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
)""")

conn.commit()
conn.close()
