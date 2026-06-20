/* ═══════════════════════════════════════════
   TECHVERGE - Live Operational Core Engine Sync
   ═══════════════════════════════════════════ */

const BACKEND_URL = "https://techverge-backend.onrender.com/api/games";
let gamesDB = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGames();
});

// 1. Live Fetch Request on Load Execution
async function fetchLiveGames() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("Backend server cluster down");
        gamesDB = await response.json();
        
        // Push dynamic updates to elements if present
        renderDashboardView();
        renderHomeGrid();
    } catch (err) {
        console.error("Critical API fetch failed:", err);
    }
}

// 2. Control Form view Box state structure (Overrides the old generic alert popup)
window.toggleAddGameForm = function() {
    const box = document.getElementById('addGameFormBox');
    if (box) {
        box.style.display = (box.style.display === "block") ? "none" : "block";
    }
}

// 3. Render dynamic indexes in table rows and analytics counters
function renderDashboardView() {
    const tbody = document.getElementById('liveAdminTableBody');
    const statGames = document.getElementById('statGames');
    const statPlatforms = document.getElementById('statPlatforms');
    const statCategories = document.getElementById('statCategories');
    const statDownloads = document.getElementById('statDownloads');

    if (statGames) statGames.textContent = gamesDB.length;
    if (statPlatforms) {
        const platformSet = new Set(gamesDB.map(g => g.platform?.toLowerCase()));
        statPlatforms.textContent = platformSet.size;
    }
    if (statCategories) {
        const catSet = new Set(gamesDB.map(g => g.category?.toLowerCase()));
        statCategories.textContent = catSet.size;
    }

    if (!tbody) return;
    tbody.innerHTML = '';

    if (gamesDB.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#8a99ad; padding:20px;">No games found in Atlas DB. Add your first game!</td></tr>`;
        return;
    }

    gamesDB.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${game.name}</strong></td>
            <td><span style="background:#243150; padding:4px 8px; border-radius:4px; font-size:0.85rem;">${game.platform}</span></td>
            <td>${game.category}</td>
            <td>⭐ ${game.rating}</td>
            <td>${game.downloads || '0'}</td>
            <td>
                <button onclick="deleteDatabaseEntry('${game._id}')" style="background:#ff3333; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 4. Submit logic hook straight to Render instance backend route
window.handleRealFormSubmit = async function(event) {
    event.preventDefault();

    const payload = {
        name: document.getElementById('gameName').value,
        platform: document.getElementById('gamePlatform').value,
        category: document.getElementById('gameCategory').value,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        downloads: document.getElementById('gameDownloads').value || "10M+",
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
            toggleAddGameForm(); // Collapse form container block
            fetchLiveGames(); // Refresh table index layout
        } else {
            alert("ERROR: Server rejected form payload specifications.");
        }
    } catch (err) {
        alert("CRITICAL: Connection loss with Render instance router.");
    }
}

// 5. Delete operation trigger
window.deleteDatabaseEntry = async function(id) {
    if (!confirm("Are you sure you want to completely erase this entry?")) return;
    try {
        const response = await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert("Entry removed cleanly.");
            fetchLiveGames();
        }
    } catch (err) {
        alert("Error requesting backend endpoint router drop execution.");
    }
}

// 6. Index Home Grid Integration fallback hook
function renderHomeGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    featuredGrid.innerHTML = '';

    gamesDB.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-img">🎮</div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.desc || ''}</p>
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
