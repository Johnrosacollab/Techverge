const BACKEND_URL = https://techverge-backend.onrender.com
/* ═══════════════════════════════════════════
   TECHVERGE - Clean Operational Server Sync
   ═══════════════════════════════════════════ */

const BACKEND_URL = "https://techverge-backend.onrender.com/api/games";
let gamesDB = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGames();
});

// 1. Fetch Request logic hook
async function fetchLiveGames() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error("Database network error");
        gamesDB = await response.json();

        // Render systems elements check
        updateDashboardUI();
    } catch (err) {
        console.error("Connection failed with backend:", err);
    }
}

// Toggle Display view instead of generic alert popup
function toggleAddGameForm() {
    const box = document.getElementById('addGameFormBox');
    if (!box) return;
    box.style.display = (box.style.display === "block") ? "none" : "block";
}

// 2. Render dynamic entries logic inside UI grid metrics
function updateDashboardUI() {
    const tbody = document.getElementById('liveAdminTableBody');
    const statGames = document.getElementById('statGames');
    const statPlatforms = document.getElementById('statPlatforms');
    const statCategories = document.getElementById('statCategories');
    const statDownloads = document.getElementById('statDownloads');

    // Update Counter values
    if(statGames) statGames.textContent = gamesDB.length;
    if(statPlatforms) {
        const uniquePlatforms = [...new Set(gamesDB.map(g => g.platform))];
        statPlatforms.textContent = uniquePlatforms.length;
    }
    if(statCategories) {
        const uniqueCats = [...new Set(gamesDB.map(g => g.category))];
        statCategories.textContent = uniqueCats.length;
    }

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
                <button onclick="deleteGameItem('${game._id}')" style="background:#ff3333; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 3. Form Submit Transaction handler
async function handleRealFormSubmit(event) {
    event.preventDefault();

    const gamePayload = {
        name: document.getElementById('gameName').value,
        platform: document.getElementById('gamePlatform').value,
        category: document.getElementById('gameCategory').value,
        rating: parseFloat(document.getElementById('gameRating').value) || 4.5,
        downloads: document.getElementById('gameDownloads').value || "10K+",
        desc: document.getElementById('gameDesc').value
    };

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gamePayload)
        });

        if (response.ok) {
            alert("Success: Game synchronized into MongoDB cluster!");
            document.getElementById('realAddGameForm').reset();
            toggleAddGameForm(); // Hide form box
            fetchLiveGames(); // Refresh lists
        } else {
            alert("Error: Data scheme rejected by Render server.");
        }
    } catch (err) {
        alert("Failed to hit API endpoint dashboard server.");
    }
}

// 4. Delete operation transactional logic
async function deleteGameItem(id) {
    if (!confirm("Are you sure you want to drop this database entry?")) return;
    try {
        const response = await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert("Item erased completely!");
            fetchLiveGames();
        }
    } catch (err) {
        alert("Error requesting backend component to destroy id entry.");
    }
}
