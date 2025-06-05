const translations = {
  en: {
    features: "Features",
    top_tokens: "Top Tokens",
    connect_wallet: "Connect Wallet",
    welcome: "Welcome to AetherSwap",
    sub_welcome: "The next-gen multi-chain DEX built on Solana."
  },
  fr: {
    features: "Fonctionnalités",
    top_tokens: "Top Tokens",
    connect_wallet: "Connecter le Wallet",
    welcome: "Bienvenue sur AetherSwap",
    sub_welcome: "Le DEX multi-chaînes de nouvelle génération sur Solana."
  },
  es: {
    features: "Características",
    top_tokens: "Tokens Populares",
    connect_wallet: "Conectar Monedero",
    welcome: "Bienvenido a AetherSwap",
    sub_welcome: "El DEX multichain de nueva generación en Solana."
  },
  zh: {
    features: "功能",
    top_tokens: "热门代币",
    connect_wallet: "连接钱包",
    welcome: "欢迎来到 AetherSwap",
    sub_welcome: "Solana 上的下一代多链 DEX。"
  }
};

document.getElementById("languageSwitcher").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
});

function connectWallet() {
  // Simule la détection
  const isDeployed = false;
  const status = document.getElementById("walletStatus");

  if (!isDeployed) {
    status.textContent = "Fonctionnalité en développement…";
  } else {
    status.textContent = "Wallet connecté !";
  }
}

// Exemple API token Solana (à remplacer par l’API réelle type Jupiter ou Gecko)
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("tokenList");
    container.innerHTML = data.map(token => `
      <div>
        <strong>${token.name}</strong>: $${token.current_price}
      </div>
    `).join("");
  })
  .catch(() => {
    document.getElementById("tokenList").textContent = "Erreur de chargement des tokens.";
  });