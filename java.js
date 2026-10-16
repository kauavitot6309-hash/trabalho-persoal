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