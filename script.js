const BACKEND_URL = "https://techverge-backend.onrender.com/api/games";
let gamesDB = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGames();
});

async function fetchLiveGames() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("Backend offline");
        gamesDB = await response.json();
        
        // Failsafe triggers initialization check
        if (document.getElementById('liveAdminTableBody')) renderDashboardView();
        if (document.getElementById('featuredGrid')) renderHomeGrid();
    } catch (err) {
        console.error("Database connection tracking drop:", err);
    }
}

// Home dynamic grid injection keeping original CSS layout styling
function renderHomeGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';

    gamesDB.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card'; // Keeps your layout styles intact
        card.setAttribute('onclick', `openGameModal(${index})`);
        
        card.innerHTML = `
            <div class="game-img" style="font-size: 2.5rem; display: flex; align-items: center; justify-content: center; background: #0f1422; height: 140px; border-radius: 6px; margin-bottom: 12px;">🎮</div>
            <div class="game-info">
                <h3 style="color:#fff; font-size:1.25rem; margin-bottom:8px;">${game.name}</h3>
                <p style="color:#64748b; font-size:0.88rem; line-height:1.4; margin-bottom:15px; height:40px; overflow:hidden;">${game.desc || ''}</p>
                <div class="game-meta" style="display:flex; justify-content:space-between; font-size:0.85rem; color:#ff7a00; font-weight:bold;">
                    <span><i class="fas fa-star"></i> ${game.rating}</span>
                    <span><i class="fas fa-download"></i> ${game.downloads}</span>
                </div>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

// Modal handling routines
window.openGameModal = function(index) {
    const game = gamesDB[index];
    if (!game) return;

    document.getElementById('modalGameTitle').textContent = game.name;
    document.getElementById('modalGamePlatform').textContent = (game.platform || 'Multiplatform').toUpperCase();
    document.getElementById('modalGameDesc').textContent = game.desc || 'No available logs.';
    document.getElementById('modalGameRating').textContent = "⭐ " + game.rating;
    document.getElementById('modalGameDownloads').innerHTML = `<i class="fas fa-download"></i> ` + game.downloads;
    
    const dlBtn = document.getElementById('modalDownloadBtn');
    dlBtn.href = game.downloadUrl || "#";

    document.getElementById('gameDetailModal').style.display = "flex";
}

window.closeGameModal = function() {
    document.getElementById('gameDetailModal').style.display = "none";
}

// Admin management engine script tracking logic
function renderDashboardView() {
    const tbody = document.getElementById('liveAdminTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    gamesDB.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${game.name}</strong></td>
            <td>${game.platform}</td>
            <td>${game.category}</td>
            <td>⭐ ${game.rating}</td>
            <td>${game.downloads}</td>
            <td>
                <button onclick="deleteDatabaseEntry('${game._id}')" style="background:#ff3333; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
