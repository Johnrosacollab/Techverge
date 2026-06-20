const BACKEND_URL = "https://techverge-backend.onrender.com/api/games";
let gamesDB = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGames();
});

async function fetchLiveGames() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("API down");
        gamesDB = await response.json();
        
        if (document.getElementById('liveAdminTableBody')) renderDashboardView();
        if (document.getElementById('featuredGrid')) renderHomeGrid();
    } catch (err) {
        console.error("Initialization loop breakdown:", err);
    }
}

window.toggleAddGameForm = function() {
    const box = document.getElementById('addGameFormBox');
    if (box) box.style.display = (box.style.display === "block") ? "none" : "block";
}

// Cards Renderer targeting your standard style card properties layout
function renderHomeGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';

    gamesDB.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card'; 
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
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

window.openGameModal = function(index) {
    const game = gamesDB[index];
    if (!game) return;

    document.getElementById('modalGameTitle').textContent = game.name;
    document.getElementById('modalGamePlatform').textContent = "Platform Target: " + (game.platform || "Universal");
    document.getElementById('modalGameDesc').textContent = game.desc || "";
    document.getElementById('modalGameRating').textContent = "⭐ " + game.rating;
    document.getElementById('modalGameDownloads').innerHTML = `<i class="fas fa-download"></i> ` + game.downloads;
    
    // Direct link binding execution redirection string
    const dlBtn = document.getElementById('modalDownloadBtn');
    dlBtn.href = game.downloadUrl || "#";

    document.getElementById('gameDetailModal').style.display = "flex";
}

window.closeGameModal = function() {
    document.getElementById('gameDetailModal').style.display = "none";
}

function renderDashboardView() {
    const tbody = document.getElementById('liveAdminTableBody');
    const statGames = document.getElementById('statGames');
    const statPlatforms = document.getElementById('statPlatforms');
    const statCategories = document.getElementById('statCategories');

    if (statGames) statGames.textContent = gamesDB.length;
    if (statPlatforms) statPlatforms.textContent = new Set(gamesDB.map(g => g.platform?.toLowerCase())).size;
    if (statCategories) statCategories.textContent = new Set(gamesDB.map(g => g.category?.toLowerCase())).size;

    if (!tbody) return;
    tbody.innerHTML = '';

    gamesDB.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${game.name}</strong></td>
            <td><span style="background:#243150; padding:4px 8px; border-radius:4px; font-size:0.85rem;">${game.platform}</span></td>
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

window.handleRealFormSubmit = async function(event) {
    event.preventDefault();

    const payload = {
        name: document.getElementById('gameName').value,
        platform: document.getElementById('gamePlatform').value,
        category: document.getElementById('gameCategory').value,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        downloads: document.getElementById('gameDownloads').value || "10M+",
        downloadUrl: document.getElementById('gameDownloadUrl').value, 
        desc: document.getElementById('gameDesc').value
    };

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("SUCCESS: Game added into dynamic cluster database!");
            document.getElementById('realAddGameForm').reset();
            toggleAddGameForm();
            fetchLiveGames();
        } else {
            alert("Error communicating payload parameters.");
        }
    } catch (err) {
        alert("Server router runtime synchronization lost.");
    }
}

window.deleteDatabaseEntry = async function(id) {
    if (!confirm("Erase entry?")) return;
    try {
        const response = await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) fetchLiveGames();
    } catch (err) { console.error(err); }
}
