from flask import Flask, render_template, request, jsonify,session
from api import obter_noticias
from banco import adicionar_like, buscar_likes
import sqlite3
app = Flask(__name__)
app.secret_key = "young_dark_2026_secret_key_flask_app"

# Página inicial
@app.route("/")
def inicio():

    pesquisa = request.args.get("q", "").strip()

    noticias = obter_noticias(pesquisa)

    return render_template(
        "index.html",
        noticias=noticias,
        pesquisa=pesquisa
    )
#barra de pesquisa 
@app.route('/pesquisar')
def  pesquisar():
	return render_template('pesquisar.html')

# API para o JavaScript (fetch)
@app.route("/api/noticias")
def api_noticias():

    pesquisa = request.args.get("q", "").strip()

    noticias = obter_noticias(pesquisa)

    return jsonify(noticias)
#Os likes
@app.route("/like", methods=["POST"])
def like():

    dados = request.get_json()

    noticia_id = dados.get("noticia_id")

    if "likes" not in session:
        session["likes"] = []

    if noticia_id not in session["likes"]:

        adicionar_like(noticia_id)

        session["likes"].append(noticia_id)

        session.modified = True

    return jsonify({
        "likes": buscar_likes(noticia_id)
    })


if __name__ == "__main__":
    app.run(
        debug=False
    ,host="0.0.0.0",port=8000)
