const BACKEND_URL = "https://techverge-backend.onrender.com/api/games";
let gamesDB = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGames();
});

async function fetchLiveGames() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("Server communication break");
        gamesDB = await response.json();
        
        if (document.getElementById('liveAdminTableBody')) renderDashboardView();
        if (document.getElementById('featuredGrid')) renderHomeGrid();
    } catch (err) {
        console.error("Fetch status failed:", err);
    }
}

window.toggleAddGameForm = function() {
    const box = document.getElementById('addGameFormBox');
    if (box) box.style.display = (box.style.display === "block") ? "none" : "block";
}

// 1. Home Grid Logic (Cards click mechanism configured)
function renderHomeGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';

    if (gamesDB.length === 0) {
        featuredGrid.innerHTML = `<p style="color:#8a99ad;">No games hosted yet.</p>`;
        return;
    }

    gamesDB.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        // Triggers openGameModal passing current dynamic database array reference index
        card.setAttribute('onclick', `openGameModal(${index})`);
        card.innerHTML = `
            <div style="font-size:3rem; margin-bottom:10px; text-align:center;">🎮</div>
            <div class="game-info">
                <h3 style="color:#fff; margin-bottom:8px;">${game.name}</h3>
                <p style="color:#8a99ad; font-size:0.85rem; height:40px; overflow:hidden;">${game.desc || ''}</p>
                <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:0.85rem; color:#ff7a00;">
                    <span><i class="fas fa-star"></i> ${game.rating}</span>
                    <span><i class="fas fa-download"></i> ${game.downloads}</span>
                </div>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

// 2. Open pop-up detail and inject dynamic target download values
window.openGameModal = function(index) {
    const game = gamesDB[index];
    if (!game) return;

    document.getElementById('modalGameTitle').textContent = game.name;
    document.getElementById('modalGamePlatform').textContent = "Platform: " + (game.platform || 'N/A');
    document.getElementById('modalGameDesc').textContent = game.desc || 'No description provided.';
    document.getElementById('modalGameRating').textContent = "⭐ " + game.rating;
    document.getElementById('modalGameDownloads').innerHTML = `<i class="fas fa-download"></i> ` + game.downloads;
    
    // Bind real download target database strings to button href element
    const dlBtn = document.getElementById('modalDownloadBtn');
    dlBtn.href = game.downloadUrl || "#";

    document.getElementById('gameDetailModal').style.display = "flex";
}

window.closeGameModal = function() {
    document.getElementById('gameDetailModal').style.display = "none";
}

// 3. Admin View Render
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

// 4. Submit logic tracking download url payload properties 
window.handleRealFormSubmit = async function(event) {
    event.preventDefault();

    const payload = {
        name: document.getElementById('gameName').value,
        platform: document.getElementById('gamePlatform').value,
        category: document.getElementById('gameCategory').value,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        downloads: document.getElementById('gameDownloads').value || "10M+",
        downloadUrl: document.getElementById('gameDownloadUrl').value, // Saved directly to database payload schema
        desc: document.getElementById('gameDesc').value
    };

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("SUCCESS: Game live with redirect download links!");
            document.getElementById('realAddGameForm').reset();
            toggleAddGameForm();
            fetchLiveGames();
        } else {
            alert("Server storage synchronization error.");
        }
    } catch (err) {
        alert("Network deployment execution failure.");
    }
}

window.deleteDatabaseEntry = async function(id) {
    if (!confirm("Delete this?")) return;
    try {
        const response = await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) fetchLiveGames();
    } catch (err) { console.error(err); }
}
