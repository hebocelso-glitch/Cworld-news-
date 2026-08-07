import sqlite3


def conectar():
  return sqlite3.connect('banco.db')

def buscar_likes(noticia_id):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT likes FROM likes WHERE noticia_id = ?",
        (noticia_id,)
    )

    resultado = cursor.fetchone()

    conn.close()

    if resultado:
        return resultado[0]

    return 0

def adicionar_like(noticia_id):

    conn = conectar()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT likes FROM likes WHERE noticia_id = ?",
        (noticia_id,)
    )

    resultado = cursor.fetchone()

    if resultado:

        cursor.execute(
            "UPDATE likes SET likes = likes + 1 WHERE noticia_id = ?",
            (noticia_id,)
        )

    else:

        cursor.execute(
            "INSERT INTO likes (noticia_id, likes) VALUES (?, 1)",
            (noticia_id,)
        )

    conn.commit()
    conn.close()
