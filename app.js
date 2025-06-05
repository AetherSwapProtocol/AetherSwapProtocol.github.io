// Languages and translations
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
    connect_wallet: "Connecter le portefeuille",
    welcome: "Bienvenue sur AetherSwap",
    sub_welcome: "Le DEX multi-chaîne nouvelle génération basé sur Solana."
  },
  es: {
    features: "Características",
    top_tokens: "Top Tokens",
    connect_wallet: "Conectar billetera",
    welcome: "Bienvenido a AetherSwap",
    sub_welcome: "El DEX multi-cadena de nueva generación basado en Solana."
  },
  zh: {
    features: "特点",
    top_tokens: "热门代币",
    connect_wallet: "连接钱包",
    welcome: "欢迎来到 AetherSwap",
    sub_welcome: "基于 Solana 构建的下一代多链去中心化交易所。"
  }
};

const languageSwitcher = document.getElementById('languageSwitcher');
const elementsToTranslate = document.querySelectorAll('[data-i18n]');

function setLanguage(lang) {
  elementsToTranslate.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

languageSwitcher.addEventListener('change', () => {
  setLanguage(languageSwitcher.value);
});

// Initialize default language
setLanguage('en');

// Dummy tokens data - to be replaced by real API calls
const tokens = [
  {
    name: "SOL",
    price: 27.58,
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=022"
  },
  {
    name: "USDC",
    price: 1.00,
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022"
  },
  {
    name: "RAY",
    price: 5.23,
    logo: "https://cryptologos.cc/logos/raydium-ray-logo.png?v=022"
  },
  {
    name: "SRM",
    price: 3.12,
    logo: "https://cryptologos.cc/logos/serum-srm-logo.png?v=022"
  }
];

// Function to render tokens list
function renderTokens() {
  const tokenList = document.getElementById('tokenList');
  tokenList.innerHTML = '';
  tokens.forEach(token => {
    const card = document.createElement('div');
    card.className = 'token-card';
    card.innerHTML = `
      <img src="${token.logo}" alt="${token.name} logo" class="token-logo" />
      <div class="token-name">${token.name}</div>
      <div class="token-price">$${token.price.toFixed(2)}</div>
    `;
    tokenList.appendChild(card);
  });
}

// Call render once at load
renderTokens();

// Wallet connect simulation (replace with real solana wallet adapter integration)
const connectBtn = document.getElementById('connectWalletBtn');
const walletStatus = document.getElementById('walletStatus');

connectBtn.addEventListener('click', () => {
  walletStatus.textContent = "Connected: Phantom Wallet (simulated)";
  connectBtn.disabled = true;
  connectBtn.textContent = "Connected";
});