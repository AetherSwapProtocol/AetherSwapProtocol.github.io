// --- Traductions ---
const translations = {
  en: {
    home: "Home",
    top_tokens: "Top Tokens",
    connect_wallet: "Connect Wallet",
    social: "Social",
    welcome: "Welcome to AetherSwap",
    sub_welcome: "The next-gen multi-chain DEX built on Solana, ultra-fast and secure.",
    join_us: "Join Us on Social Media",
    social_desc: "Follow AetherSwap and stay updated with all latest news and developments!",
    not_connected: "Not connected",
    connected: "Wallet connected",
    connect: "Connect",
  },
  fr: {
    home: "Accueil",
    top_tokens: "Top Tokens",
    connect_wallet: "Connecter le portefeuille",
    social: "Réseaux",
    welcome: "Bienvenue sur AetherSwap",
    sub_welcome: "Le DEX multi-chaînes nouvelle génération sur Solana, ultra-rapide et sécurisé.",
    join_us: "Rejoignez-nous sur les réseaux sociaux",
    social_desc: "Suivez AetherSwap et restez à jour avec toutes les dernières actualités !",
    not_connected: "Non connecté",
    connected: "Portefeuille connecté",
    connect: "Connecter",
  },
  es: {
    home: "Inicio",
    top_tokens: "Tokens Principales",
    connect_wallet: "Conectar Billetera",
    social: "Social",
    welcome: "Bienvenido a AetherSwap",
    sub_welcome: "El DEX multi-cadena de próxima generación en Solana, ultra rápido y seguro.",
    join_us: "Únete a nosotros en redes sociales",
    social_desc: "Sigue AetherSwap y mantente actualizado con todas las últimas noticias.",
    not_connected: "No conectado",
    connected: "Billetera conectada",
    connect: "Conectar",
  },
  zh: {
    home: "主页",
    top_tokens: "热门代币",
    connect_wallet: "连接钱包",
    social: "社交",
    welcome: "欢迎来到 AetherSwap",
    sub_welcome: "基于 Solana 的下一代多链 DEX，超快速且安全。",
    join_us: "加入我们的社交媒体",
    social_desc: "关注 AetherSwap，获取最新资讯！",
    not_connected: "未连接",
    connected: "钱包已连接",
    connect: "连接",
  },
  // Ajoute d'autres langues ici si besoin
};

// --- Variables ---
const languageSwitcher = document.getElementById("languageSwitcher");
const i18nElements = document.querySelectorAll("[data-i18n]");
const tokenList = document.getElementById("tokenList");
const connectBtn = document.querySelector("#connect button");
const walletStatus = document.getElementById("walletStatus");

let currentLanguage = "en";
let walletConnected = false;
let walletPublicKey = null;

// --- Fonctions traduction ---
function translatePage() {
  i18nElements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      el.textContent = translations[currentLanguage][key];
    }
  });
  connectBtn.textContent = translations[currentLanguage].connect;
  walletStatus.textContent = walletConnected
    ? translations[currentLanguage].connected + `: ${walletPublicKey.slice(0,6)}...${walletPublicKey.slice(-4)}`
    : translations[currentLanguage].not_connected;
}

// Changement langue
languageSwitcher.addEventListener("change", e => {
  currentLanguage = e.target.value;
  translatePage();
});

// --- Wallet Phantom ---
async function connectWallet() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      walletConnected = true;
      walletPublicKey = resp.publicKey.toString();
      walletStatus.textContent = translations[currentLanguage].connected + `: ${walletPublicKey.slice(0,6)}...${walletPublicKey.slice(-4)}`;
      connectBtn.disabled = true;
    } catch (err) {
      alert("Connection failed, try again.");
      console.error(err);
    }
  } else {
    alert("Phantom Wallet not found. Please install it from https://phantom.app/");
  }
}

connectBtn.addEventListener("click", connectWallet);

// --- Chargement tokens avec API CoinGecko ---
async function fetchTopTokens() {
  const tokenIds = [
    "solana",
    "usd-coin",
    "raydium",
    "serum",
    "stepn",
    "saber",
    "marinade-finance",
    "oxygen",
    "psyoptions"
  ];
  const idsParam = tokenIds.join(",");

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`);
    const data = await response.json();
    renderTokens(data);
  } catch (error) {
    tokenList.innerHTML = `<p style="color:#ff6666">Failed to load tokens data. Try refreshing.</p>`;
    console.error(error);
  }
}

function renderTokens(tokens) {
  tokenList.innerHTML = "";
  tokens.forEach(token => {
    const priceChange = token.price_change_percentage_24h?.toFixed(2) ?? "0.00";
    const priceChangeClass = priceChange >= 0 ? "positive" : "negative";
    const sparklineData = token.sparkline_in_7d?.price || [];

    const card = document.createElement("div");
    card.className = "token-card";

    card.innerHTML = `
      <img src="${token.image}" alt="${token.name} logo" />
      <h3>${token.symbol.toUpperCase()}</h3>
      <p>Price: $${token.current_price.toFixed(4)}</p>
      <p class="${priceChangeClass}">24h: ${priceChange}%</p>
      <canvas id="sparkline-${token.id}" width="100" height="30"></canvas>
    `;
    tokenList.appendChild(card);

    // Graph sparkline
    if (sparklineData.length > 0) {
      const ctx = document.getElementById(`sparkline-${token.id}`).getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: sparklineData.map((_, i) => i),
          datasets: [{
            data: sparklineData,
            borderColor: priceChange >= 0 ? '#00ffcc' : '#ff0033',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            tension: 0.3,
          }]
        },
        options: {
          responsive: false,
          plugins: {legend: {display: false}},
          scales: {
            x: {display: false},
            y: {display: false}
          }
        }
      });
    }
  });
}

// --- Init ---
window.onload = () => {
  translatePage();
  fetchTopTokens();
};