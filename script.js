const BACKEND_URL = https://techverge-backend.onrender.com
/* ═══════════════════════════════════════════
   TECHVERGE - Connected to Live Backend API
   ═══════════════════════════════════════════ */

// 🔴 CHANGE THIS URL AFTER DEPLOYING BACKEND ON RENDER
const BACKEND_URL = "http://localhost:5000/api/games";

let gamesDB = [];

// Base initialization on load
document.addEventListener('DOMContentLoaded', () => {
    fetchGamesFromBackend();
    initTheme();
});

// ═══════════ FETCH DATA FROM BACKEND ═══════════
async function fetchGamesFromBackend() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        gamesDB = await response.json();

        // Refresh UI components
        if (document.getElementById('featuredGrid')) loadFeaturedGames();
        if (document.querySelector('.admin-table')) loadAdminPanel();
    } catch (error) {
        console.error("Error fetching games:", error);
        // Fallback placeholder dynamic notification
        const grids = ['featuredGrid', 'androidGrid', 'pcGrid'];
        grids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = `<p style="color:red; padding:20px;">Server Connecting... Please wait.</p>`;
        });
    }
}

// ═══════════ UI RENDERING ═══════════
function loadFeaturedGames() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';

    gamesDB.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-img">${game.img}</div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.desc}</p>
                <div class="game-meta">
                    <span><i class="fas fa-star"></i> ${game.rating}</span>
                    <span><i class="fas fa-download"></i> ${game.downloads}</span>
                </div>
                <button class="btn btn-primary" style="margin-top:10px; width:100%;">Download</button>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

// ═══════════ ADMIN PANEL REAL LOGIC ═══════════
function loadAdminPanel() {
    const tbody = document.querySelector('.admin-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Update Stats cards dynamically
    document.querySelectorAll('.admin-stat-card h3')[0].textContent = gamesDB.length;

    gamesDB.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${game._id.substring(0,6)}...</td>
            <td><strong>${game.name}</strong></td>
            <td><span class="badge">${game.platform}</span></td>
            <td>${game.category}</td>
            <td>⭐ ${game.rating}</td>
            <td>${game.downloads}</td>
            <td>
                <button class="btn-action btn-delete" onclick="deleteGameFromBackend('${game._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Add Game via Admin Panel
async function handleAddGame(event) {
    event.preventDefault();
    const newGame = {
        name: document.getElementById('gameName').value,
        platform: document.getElementById('gamePlatform').value,
        category: document.getElementById('gameCategory').value,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        downloads: document.getElementById('gameDownloads').value || "100K+",
        desc: document.getElementById('gameDesc').value,
        img: "🎮"
    };

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGame)
        });
        if (response.ok) {
            alert("Game Added to Database Successfully!");
            document.getElementById('addGameForm').reset();
            fetchGamesFromBackend(); // Reload list
        }
    } catch (err) {
        alert("Failed to save game to database.");
    }
}

// Delete Game via Admin Panel
async function deleteGameFromBackend(id) {
    if (!confirm("Are you sure you want to delete this game?")) return;
    try {
        const response = await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert("Game Deleted From Database!");
            fetchGamesFromBackend();
        }
    } catch (err) {
        alert("Error deleting game.");
    }
}

// Theme logic preserve
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') document.body.classList.add('light-theme');
}
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
}
