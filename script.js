const BACKEND_URL = "https://techverge-backend.onrender.com/api/games";
let gamesDB = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGames();
});

async function fetchLiveGames() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("API Offline");
        gamesDB = await response.json();
        
        if (document.getElementById('liveAdminTableBody')) renderDashboardView();
        if (document.getElementById('featuredGrid')) renderHomeGrid();
    } catch (err) {
        console.error("Database connection failure:", err);
    }
}

// AAPKA PURANA EXACT RENDERING STRUCTURE
function renderHomeGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';

    gamesDB.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card'; // Aapki css ka generator class
        card.setAttribute('onclick', `openGameModal(${index})`);
        card.innerHTML = `
            <div class="game-img">🎮</div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.desc || ''}</p>
                <div class="game-meta">
                    <span><i class="fas fa-star"></i> ${game.rating}</span>
                    <span><i class="fas fa-download"></i> ${game.downloads}</span>
                </div>
                <button class="btn btn-primary" style="margin-top:10px; width:100%;">Read More & Download</button>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

window.openGameModal = function(index) {
    const game = gamesDB[index];
    if (!game) return;

    document.getElementById('modalGameTitle').textContent = game.name;
    document.getElementById('modalGamePlatform').textContent = "Platform: " + (game.platform || "PC/Mobile");
    document.getElementById('modalGameDesc').textContent = game.desc || "";
    document.getElementById('modalGameRating').textContent = "⭐ " + game.rating;
    document.getElementById('modalGameDownloads').innerHTML = `<i class="fas fa-download"></i> ` + game.downloads;
    
    // Agar naye game me download link nahi hai, toh default redirect backup rakhega
    const dlBtn = document.getElementById('modalDownloadBtn');
    dlBtn.href = game.downloadUrl || "#";

    document.getElementById('gameDetailModal').style.display = "flex";
}

window.closeGameModal = function() {
    document.getElementById('gameDetailModal').style.display = "none";
}

// Dashboard handling functions
function renderDashboardView() {
    const tbody = document.getElementById('liveAdminTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    gamesDB.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${game.name}</strong></td>
            <td><span style="background:#243150; padding:4px 8px; border-radius:4px;">${game.platform}</span></td>
            <td>${game.category}</td>
            <td>⭐ ${game.rating}</td>
            <td>${game.downloads}</td>
            <td>
                <button onclick="event.stopPropagation(); deleteDatabaseEntry('${game._id}')" style="background:#ff3333; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
