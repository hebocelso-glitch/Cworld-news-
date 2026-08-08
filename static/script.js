// ===============================
// MENU LATERAL
// ===============================

const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");

if (menu && sidebar) {

    menu.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("ativo");
    });

    document.addEventListener("click", (e) => {

        if (
            !sidebar.contains(e.target) &&
            !menu.contains(e.target)
        ) {
            sidebar.classList.remove("ativo");
        }

    });

}


// ===============================
// BOTÃO CURTIR
// ===============================

function ativarCurtir() {

    document.querySelectorAll(".like-btn").forEach((btn) => {

        btn.onclick = async () => {

            const noticia_id = btn.dataset.id;

            try {

                const resposta = await fetch("/like", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        noticia_id: noticia_id
                    })
                });

                const dados = await resposta.json();

                btn.classList.add("liked");

                let contador = btn.querySelector(".contador");

                if (!contador) {

                    contador = document.createElement("span");
                    contador.className = "contador";
                    btn.appendChild(contador);

                }

                contador.textContent = ` ${dados.likes}`;

            } catch (erro) {

                console.error("Erro ao curtir:", erro);

            }

        };

    });

}

ativarCurtir();


// ===============================
// PESQUISA DE NOTÍCIAS
// ===============================

const pesquisa = document.getElementById("pesquisa");
const feed = document.getElementById("feed");

if (pesquisa && feed) {

    pesquisa.addEventListener("keydown", async (e) => {

        if (e.key !== "Enter") return;

        e.preventDefault();

        const texto = pesquisa.value.trim();

        if (texto === "") return;

        try {

            const resposta = await fetch(
                `/api/noticias?q=${encodeURIComponent(texto)}`
            );

            const noticias = await resposta.json();

            feed.innerHTML = "";
          //alterar isso aqui !

            noticias.forEach((noticia) => {

                feed.innerHTML += `
                    <div class="card">

                        <h2>${noticia.title}</h2>
<p class="data"> Publicado em ${noticia.data}</p>

                        <img
                            class="noticia"
                            src="${noticia.image}"
                            alt="${noticia.title}"
                        >

                        <p class = "descricao">${noticia.description || ""}</p>

                        <div class="card-actions">

                            <button class="action-btn like-btn" data-id="${noticia.url}">
                    <svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">

                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                                <span>Curtir</span>
<span class="contador">${noticia.likes}</span>
                            </button>

                            <button class="action-btn">
                    <svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">

                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg
                                <span>Comentar</span>
                            </button>

                            <button class="action-btn"><svg viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2">

                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>

                        <line x1="8.59" y1="13.51"
                              x2="15.42" y2="17.49"/>

                        <line x1="15.41" y1="6.51"
                              x2="8.59" y2="10.49"/>

                    </svg>
                                <span>Compartilhar</span>
                            </button>

                        </div>

                    </div>
                `;

            });

            // Reativa o botão Curtir nos novos cards
          

        } catch (erro) {

            console.error("Erro ao buscar notícias:", erro);

        }

    });

}
// Expandir e recolher descrição
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("descricao")) {
        e.target.classList.toggle("aberta");
    }

});
//pegar localizacao
const local = document.getElementById("btn-local");

if (local) {

    local.addEventListener("click", (e) => {

        e.preventDefault();

        navigator.geolocation.getCurrentPosition(

            async (pos) => {

                const { latitude, longitude } = pos.coords;

                try {

                    const resposta = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );

                    const dados = await resposta.json();

                    const cidade =
                        dados.address.city ||
                        dados.address.town ||
                        dados.address.village ||
                        dados.address.state ||
                        dados.address.country;

                    pesquisa.value = cidade;

                    const respostaNoticias = await fetch(
                        `/api/noticias?q=${encodeURIComponent(cidade)}`
                    );

                    const noticias = await respostaNoticias.json();

                    feed.innerHTML = "";

                    noticias.forEach((noticia) => {

                        feed.innerHTML += `
                            <div class="card">

                                <h2>${noticia.title}</h2>

                                <p class="data">Publicado em ${noticia.data}</p>

                                <img
                                    class="noticia"
                                    src="${noticia.image}"
                                    alt="${noticia.title}"
                                >

                                <p class="descricao">${noticia.description || ""}</p>

                                <div class="card-actions">

                                    <button class="action-btn like-btn" data-id="${noticia.url}">
                                        <svg viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                        </svg>
                                        <span>Curtir</span>
<span class="contador">${noticia.likes}</span>
                                    </button>

                                    <button class="action-btn">
                                        <span>Comentar</span>
                                    </button>

                                    <button class="action-btn">
                                        <span>Compartilhar</span>
                                    </button>

                                </div>

                            </div>
                        `;

                    });

                    ativarCurtir();

                } catch (erro) {

                    console.error(erro);

                }

            },
            () => {

                alert("Não foi possível obter sua localização.");

            }

        );

    });

}
//partilhar as noticias
// ===============================
// COMPARTILHAR
// ===============================

document.querySelectorAll(".share-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const title = button.dataset.title;
        const description = button.dataset.description;

        // Link do próprio Cworld
        const cworldUrl = window.location.origin;

        if (navigator.share) {

            navigator.share({
                title: "Cworld",
                text: `${title}\n\n${description}\n\nVeja mais no Cworld:`,
                url: cworldUrl
            })
            .then(function() {
                console.log("Notícia compartilhada!");
            })
            .catch(function(error) {

                // O usuário simplesmente cancelou
                if (error.name !== "AbortError") {
                    console.log("Erro ao compartilhar:", error);
                }

            });

        } else {

            alert("Seu navegador não suporta compartilhamento.");

        }

    });

});