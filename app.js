// Dark mode toggle
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if(document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
});

// Wallet connection stub (remplace par ta logique)
function connectWallet() {
  const status = document.getElementById('walletStatus');
  status.textContent = 'Wallet connected (mock)';
  status.style.color = '#00ffcc';
}