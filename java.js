const camada = document.getElementById("particulas");

const simbolos = [
    { simbolo: "✦", classe: "estrela" },
    { simbolo: "✧", classe: "estrela" },
    { simbolo: "✶", classe: "estrela" },
    { simbolo: "⋆", classe: "estrela" },
    { simbolo: "♥", classe: "coracao" },
    { simbolo: "♡", classe: "coracao" }
];

function numeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function criarParticula() {
    if (!camada) {
        console.error('Elemento "#particulas" não encontrado.');
        return;
    }

    const item = simbolos[
        Math.floor(Math.random() * simbolos.length)
    ];

    const particula = document.createElement("span");

    particula.classList.add("particula", item.classe);
    particula.textContent = item.simbolo;

    // Posição horizontal inicial
    particula.style.left = numeroAleatorio(0, 98) + "vw";

    // Tamanho
    particula.style.fontSize =
        numeroAleatorio(12, 32) + "px";

    // Duração da animação
    particula.style.setProperty(
        "--duracao",
        numeroAleatorio(6, 12) + "s"
    );

    // Desvio lateral
    particula.style.setProperty(
        "--desvio",
        numeroAleatorio(-100, 100) + "px"
    );

    camada.appendChild(particula);

    // Remove o elemento quando terminar de atravessar a tela
    particula.addEventListener("animationend", () => {
        particula.remove();
    }, { once: true });
}

// Cria partículas em intervalos regulares
const intervalo = 350;

setInterval(criarParticula, intervalo);

// Cria algumas partículas iniciais para o efeito começar logo
for (let i = 0; i < 12; i++) {
    setTimeout(() => {
        criarParticula();
    }, i * 120);
}
function mostrarConvite() {
  const convite = document.getElementById("convite");

  convite.style.display = "block";

  convite.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function responderConvite(resposta) {
  const mensagem = document.getElementById("respostaConvite");

  if (resposta === "sim") {
    mensagem.textContent =
      "Fico feliz! ❤️ Agora só falta combinarmos um dia.";
  } else {
    mensagem.textContent =
      "Tudo bem! 😊 Sem pressa. Obrigado por considerar o convite.";
  }
}
document.addEventListener("DOMContentLoaded", () => {
    const chuva = document.querySelector(".chuva-folhas");

    // Se o elemento não existir, não executa.
    if (!chuva) return;

    // Respeita a preferência de reduzir animações.
    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (movimentoReduzido.matches) return;

    // Folhas representando as quatro estações.
    const folhas = [
        { simbolo: "🍃", estacao: "primavera" },
        { simbolo: "🌿", estacao: "verao" },
        { simbolo: "🍂", estacao: "outono" },
        { simbolo: "🍁", estacao: "outono" },
        { simbolo: "❄", estacao: "inverno" }
    ];

    // Quantidade máxima de folhas na tela.
    const quantidadeFolhas = window.innerWidth < 600 ? 16 : 28;

    function criarFolha() {
        const folha = document.createElement("span");

        const modelo = folhas[
            Math.floor(Math.random() * folhas.length)
        ];

        folha.classList.add("folha", `folha-${modelo.estacao}`);
        folha.textContent = modelo.simbolo;

        // Posição horizontal aleatória.
        folha.style.left = `${Math.random() * 100}%`;

        // Tamanhos variados.
        folha.style.fontSize =
            `${14 + Math.random() * 18}px`;

        // Velocidade diferente para cada folha.
        const duracao = 10 + Math.random() * 16;
        folha.style.animationDuration = `${duracao}s`;

        // Distribui as folhas pelo céu desde o início.
        folha.style.animationDelay =
            `${-Math.random() * duracao}s`;

        // Movimento lateral personalizado.
        const deslocamento = -100 + Math.random() * 200;

        folha.style.setProperty(
            "--deslocamento",
            `${deslocamento}px`
        );

        // Pequena variação de transparência.
        folha.style.opacity = `${0.45 + Math.random() * 0.5}`;

        // Evita que leitores de tela anunciem cada folha.
        folha.setAttribute("aria-hidden", "true");

        chuva.appendChild(folha);
    }

    // Cria todas as folhas iniciais.
    for (let i = 0; i < quantidadeFolhas; i++) {
        criarFolha();
    }

    // Cria uma folha nova periodicamente.
    const intervalo = window.setInterval(() => {
        if (document.hidden) return;

        // Evita crescimento infinito de elementos.
        if (chuva.childElementCount >= quantidadeFolhas + 8) {
            return;
        }

        criarFolha();
    }, 900);

    // Pausa a criação quando a página é encerrada.
    window.addEventListener("pagehide", () => {
        window.clearInterval(intervalo);
    }, { once: true });
});