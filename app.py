from flask import Flask, render_template, request, jsonify
from api import obter_noticias

app = Flask(__name__)


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


# API para o JavaScript (fetch)
@app.route("/api/noticias")
def api_noticias():

    pesquisa = request.args.get("q", "").strip()

    noticias = obter_noticias(pesquisa)

    return jsonify(noticias)


if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )