from banco import buscar_likes
import requests
from datetime import datetime
import re

GNEWS_KEY = "714967fd689f68977bee43bd43c14014"
WORLDNEWS_KEY = "56d4943aecfd4acc9a95cd1ea676b173"


def gnews(pesquisa):
    url = "https://gnews.io/api/v4/search"

    params = {
        "q": pesquisa,
        "lang": "pt",
        "max": 15,
        "apikey": GNEWS_KEY
    }

    r = requests.get(url, params=params)

    if r.status_code != 200:
        return []

    return r.json().get("articles", [])


def worldnews(pesquisa):
    url = "https://api.worldnewsapi.com/search-news"

    params = {
        "api-key": WORLDNEWS_KEY,
        "text": pesquisa,
        "language": "pt",
        "number": 15
    }

    r = requests.get(url, params=params)

    if r.status_code != 200:
        return []

    noticias = []

    for n in r.json().get("news", []):
        noticias.append({
            "title": n.get("title"),
            "description": re.sub(r"<.*?>", "", n.get("text") or ""),
            "image": n.get("image"),
            "url": n.get("url"),
            "publishedAt": n.get("publish_date"),
            "source": {
                "name": "World News API"
            }
        })

    return noticias

def obter_noticias(pesquisa=""):
    if not pesquisa:
        pesquisa = "Angola"

    noticias = []

    noticias.extend(gnews(pesquisa))
    noticias.extend(worldnews(pesquisa))

    for noticia in noticias:
        if noticia.get("publishedAt"):
            try:
                data = datetime.fromisoformat(
                    noticia["publishedAt"].replace("Z", "+00:00")
                )

                noticia["data"] = data.strftime("%d/%m/%Y %H:%M")

            except Exception:
                noticia["data"] = noticia["publishedAt"]
        noticia["likes"] = buscar_likes(noticia["url"])
    return noticias
