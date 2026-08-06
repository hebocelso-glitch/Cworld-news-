const form = document.querySelector(".busca");
const input = document.getElementById("pesquisa");
const resultado = document.querySelector(".resultado");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pesquisa = input.value.trim();

    const resposta = await fetch(`/api/noticias?q=${encodeURIComponent(pesquisa)}`);
    const noticias = await resposta.json();

    resultado.innerHTML = "";

    if (noticias.length === 0) {
        resultado.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        return;
    }

    noticias.forEach(noticia => {
        resultado.innerHTML += `
            <div class="noticia">
                ${noticia.image ? `<img src="${noticia.image}" alt="">` : ""}
                <h3>${noticia.title}</h3>
                <p>${noticia.description || ""}</p>
                <a href="${noticia.url}" target="_blank">Ler mais</a>
            </div>
        `;
    });
});
resultado.innerHTML += `
<div class="card">

    <h2>${noticia.title}</h2>

    <img class="noticia" src="${noticia.image}" alt="">

    <p>${noticia.description || ""}</p>

    <a class="ler-mais" href="${noticia.url}" target="_blank">
        Ler mais
    </a>

    <div class="card-actions">

        <button class="action-btn like-btn">

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>

            <span>Curtir</span>

        </button>

        <button class="action-btn">

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>

            <span>Comentar</span>

        </button>

        <button class="action-btn">

            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>

            <span>Compartilhar</span>

        </button>

    </div>

</div>
`;