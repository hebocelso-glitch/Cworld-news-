
// ===============================
// BOTÃO CURTIR
// ===============================

function ativarCurtir() {

    document.querySelectorAll(".like-btn").forEach((btn) => {

        btn.onclick = () => {

            btn.classList.toggle("liked");

            const texto = btn.querySelector("span");

            texto.textContent = btn.classList.contains("liked")
                ? "Curtido"
                : "Curtir";

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

            noticias.forEach((noticia) => {

                feed.innerHTML += `
                    <div class="card">

                        <h2>${noticia.title}</h2>

                        <img
                            class="noticia"
                            src="${noticia.image}"
                            alt="${noticia.title}"
                        >

                        <p>${noticia.description || ""}</p>

                        <div class="card-actions">

                            <button class="action-btn like-btn">
                                <span>Curtir</span>
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

            // Reativa o botão Curtir nos novos cards
            ativarCurtir();

        } catch (erro) {

            console.error("Erro ao buscar notícias:", erro);

        }

    });

}