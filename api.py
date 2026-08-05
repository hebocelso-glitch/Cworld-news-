import requests

API_KEY = "714967fd689f68977bee43bd43c14014"

def obter_noticias(pesquisa=""):

    if pesquisa:

        url = (
            f"https://gnews.io/api/v4/search?"
            f"q={pesquisa}"
            f"&lang=pt"
            f"&max=20"
            f"&apikey={API_KEY}"
        )

    else:

        # Notícias de Angola quando não houver pesquisa
        url = (
            f"https://gnews.io/api/v4/search?"
            f"q=Angola"
            f"&lang=pt"
            f"&max=20"
            f"&apikey={API_KEY}"
        )

    resposta = requests.get(url)

    print("URL:", url)
    print("Status:", resposta.status_code)

    if resposta.status_code == 200:
        dados = resposta.json()
        return dados.get("articles", [])

    print(resposta.text)
    return []