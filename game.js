// Game Data
const levelNames = [
    "Bronze", "Silver", "Gold", "Platinum", "Diamond", 
    "Epic", "Legendary", "Master", "GrandMaster", "Lord"
];

const levelMinPoints = [
    0, 5000, 25000, 100000, 1000000,
    2000000, 10000000, 50000000, 100000000, 1000000000
];

// Game State
let levelIndex = 6;
let points = 22749365;
const pointsToAdd = 11;
const profitPerHour = 126420;
let clickEffects = [];

// DOM Elements
const levelNameEl = document.getElementById('levelName');
const levelProgressEl = document.getElementById('levelProgress');
const levelProgressBarEl = document.getElementById('levelProgressBar');
const profitValueEl = document.getElementById('profitValue');
const pointsValueEl = document.getElementById('pointsValue');
const dailyRewardTimeEl = document.getElementById('dailyRewardTime');
const dailyCipherTimeEl = document.getElementById('dailyCipherTime');
const dailyComboTimeEl = document.getElementById('dailyComboTime');
const mainCharacterEl = document.getElementById('mainCharacter');

// Initialize Game
function initGame() {
    updateLevelInfo();
    updatePointsDisplay();
    startPassiveIncome();
    setupEventListeners();
    updateDailyTimers();
    setInterval(updateDailyTimers, 60000);
}

// Update Level Information
function updateLevelInfo() {
    levelNameEl.textContent = levelNames[levelIndex];
    levelProgressEl.textContent = `${levelIndex + 1} / ${levelNames.length}`;
    levelProgressBarEl.style.width = `${calculateProgress()}%`;
}

// Calculate Level Progress
function calculateProgress() {
    if (levelIndex >= levelNames.length - 1) return 100;
    const current = points - levelMinPoints[levelIndex];
    const next = levelMinPoints[levelIndex + 1] - levelMinPoints[levelIndex];
    return Math.min((current / next) * 100, 100);
}

// Update Points Display
function updatePointsDisplay() {
    pointsValueEl.textContent = points.toLocaleString();
    profitValueEl.textContent = formatProfit(profitPerHour);
}

// Format Profit Value
function formatProfit(profit) {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
}

// Passive Income
function startPassiveIncome() {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    setInterval(() => {
        points += pointsPerSecond;
        updatePointsDisplay();
        checkLevelUp();
    }, 1000);
}

// Check for Level Up/Down
function checkLevelUp() {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
        levelIndex++;
        updateLevelInfo();
    } else if (points < currentLevelMin && levelIndex > 0) {
        levelIndex--;
        updateLevelInfo();
    } else {
        levelProgressBarEl.style.width = `${calculateProgress()}%`;
    }
}

// Daily Timers
function updateDailyTimers() {
    dailyRewardTimeEl.textContent = calculateTimeLeft(0);
    dailyCipherTimeEl.textContent = calculateTimeLeft(19);
    dailyComboTimeEl.textContent = calculateTimeLeft(12);
}

function calculateTimeLeft(targetHour) {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
        target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Event Listeners
function setupEventListeners() {
    mainCharacterEl.addEventListener('click', (e) => {
        handleCharacterClick(e);
        addClickEffect(e);
    });
}

function handleCharacterClick(e) {
    // Add tilt effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
        e.currentTarget.style.transform = '';
    }, 100);

    // Add points
    points += pointsToAdd;
    updatePointsDisplay();
    checkLevelUp();
}

function addClickEffect(e) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = `+${pointsToAdd}`;
    effect.style.left = `${e.pageX - 20}px`;
    effect.style.top = `${e.pageY - 40}px`;
    
    document.body.appendChild(effect);
    effect.addEventListener('animationend', () => {
        effect.remove();
    });
}

// Start the game
document.addEventListener('DOMContentLoaded', initGame);