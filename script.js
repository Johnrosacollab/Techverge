/* ═══════════════════════════════════════════
   GAMEVERSE INDIA - Complete Gaming Website JS
   ═══════════════════════════════════════════ */

// ═══════════ GAME DATABASE ═══════════
const gamesDB = [
    // -- Android --
    { id: 1, name: "GTA: Vice City", platform: "android", category: "action", rating: 4.8, downloads: "50M+", desc: "Rockstar's classic open-world action game on Android.", popular: true, new: false, img: "🎮" },
    { id: 2, name: "PUBG Mobile", platform: "android", category: "shooting", rating: 4.6, downloads: "1B+", desc: "Battle royale shooting game with TPP/FPP modes.", popular: true, new: true, img: "🔫" },
    { id: 3, name: "Free Fire Max", platform: "android", category: "shooting", rating: 4.4, downloads: "500M+", desc: "Fast-paced battle royale shooter for Android.", popular: true, new: false, img: "🔥" },
    { id: 4, name: "Asphalt 9", platform: "android", category: "racing", rating: 4.7, downloads: "200M+", desc: "Premium arcade racing with console-quality graphics.", popular: true, new: false, img: "🏎️" },
    { id: 5, name: "Clash of Clans", platform: "android", category: "strategy", rating: 4.5, downloads: "500M+", desc: "Build your village and battle globally.", popular: true, new: false, img: "⚔️" },
    { id: 6, name: "Genshin Impact", platform: "android", category: "rpg", rating: 4.7, downloads: "100M+", desc: "Open-world action RPG with gacha elements.", popular: true, new: false, img: "🌍" },
    
    // -- iOS --
    { id: 7, name: "Call of Duty Mobile", platform: "ios", category: "shooting", rating: 4.6, downloads: "300M+", desc: "Console-quality FPS on mobile.", popular: true, new: false, img: "🎯" },
    { id: 8, name: "Among Us", platform: "ios", category: "multiplayer", rating: 4.3, downloads: "500M+", desc: "Social deduction party game.", popular: false, new: false, img: "👾" },
    { id: 9, name: "Minecraft PE", platform: "ios", category: "adventure", rating: 4.7, downloads: "1B+", desc: "Endless creativity and survival.", popular: true, new: false, img: "⛏️" },
    
    // -- Windows PC --
    { id: 10, name: "GTA V", platform: "windows", category: "action", rating: 4.9, downloads: "1B+", desc: "Open-world masterpiece from Rockstar.", popular: true, new: false, img: "🏙️" },
    { id: 11, name: "Valorant", platform: "windows", category: "shooting", rating: 4.5, downloads: "100M+", desc: "Tactical FPP shooter from Riot Games.", popular: true, new: false, img: "🔫" },
    { id: 12, name: "FIFA 24", platform: "windows", category: "sports", rating: 4.3, downloads: "50M+", desc: "The world's game on PC.", popular: false, new: true, img: "⚽" },
    { id: 13, name: "Cyberpunk 2077", platform: "windows", category: "rpg", rating: 4.2, downloads: "30M+", desc: "Open-world RPG in Night City.", popular: false, new: false, img: "🤖" },
    { id: 14, name: "Forza Horizon 5", platform: "windows", category: "racing", rating: 4.8, downloads: "20M+", desc: "Open-world racing in Mexico.", popular: true, new: false, img: "🏎️" },
    { id: 15, name: "Mortal Kombat 1", platform: "windows", category: "fighting", rating: 4.4, downloads: "10M+", desc: "Brutal fighting game with kameo system.", popular: false, new: true, img: "👊" },
    
    // -- Mac --
    { id: 16, name: "Baldur's Gate 3", platform: "mac", category: "rpg", rating: 4.9, downloads: "15M+", desc: "Critically acclaimed D&D RPG.", popular: true, new: false, img: "🐉" },
    { id: 17, name: "Civilization VI", platform: "mac", category: "strategy", rating: 4.6, downloads: "20M+", desc: "Turn-based strategy empire builder.", popular: false, new: false, img: "🏛️" },
    
    // -- PS5 --
    { id: 18, name: "Spider-Man 2", platform: "ps5", category: "action", rating: 4.9, downloads: "15M+", desc: "Swing through Marvel's NYC.", popular: true, new: false, img: "🕷️" },
    { id: 19, name: "God of War Ragnarok", platform: "ps5", category: "action", rating: 4.8, downloads: "20M+", desc: "Epic Norse mythology adventure.", popular: true, new: false, img: "⚔️" },
    { id: 20, name: "Horizon Forbidden West", platform: "ps5", category: "adventure", rating: 4.7, downloads: "12M+", desc: "Open-world post-apocalyptic adventure.", popular: false, new: false, img: "🤖" },
    { id: 21, name: "Gran Turismo 7", platform: "ps5", category: "racing", rating: 4.6, downloads: "10M+", desc: "Real driving simulator.", popular: false, new: false, img: "🏎️" },
    
    // -- PS4 --
    { id: 22, name: "The Last of Us Part II", platform: "ps4", category: "action", rating: 4.7, downloads: "30M+", desc: "Emotional post-apocalyptic journey.", popular: false, new: false, img: "🌲" },
    { id: 23, name: "Red Dead Redemption 2", platform: "ps4", category: "adventure", rating: 4.9, downloads: "60M+", desc: "Wild West open-world masterpiece.", popular: true, new: false, img: "🤠" },
    { id: 24, name: "Bloodborne", platform: "ps4", category: "action", rating: 4.8, downloads: "10M+", desc: "Gothic horror action RPG.", popular: false, new: false, img: "🩸" },
    
    // -- PS2 --
    { id: 25, name: "GTA: San Andreas", platform: "ps2", category: "action", rating: 4.9, downloads: "20M+", desc: "Classic open-world from Rockstar.", popular: true, new: false, img: "🏙️" },
    { id: 26, name: "God of War II", platform: "ps2", category: "action", rating: 4.7, downloads: "10M+", desc: "Kratos' epic Greek adventure.", popular: false, new: false, img: "⚔️" },
    { id: 27, name: "Shadow of the Colossus", platform: "ps2", category: "adventure", rating: 4.8, downloads: "5M+", desc: "Artistic masterpiece of giant battles.", popular: false, new: false, img: "🏛️" },
    { id: 28, name: "Need for Speed Most Wanted", platform: "ps2", category: "racing", rating: 4.7, downloads: "15M+", desc: "Best street racing game ever.", popular: true, new: false, img: "🚗" },
    
    // -- PSP --
    { id: 29, name: "GTA: Vice City Stories", platform: "psp", category: "action", rating: 4.5, downloads: "8M+", desc: "GTA on handheld! Classic.", popular: true, new: false, img: "🌴" },
    { id: 30, name: "God of War: Chains of Olympus", platform: "psp", category: "action", rating: 4.4, downloads: "5M+", desc: "Kratos on PSP.", popular: false, new: false, img: "⚔️" },
    { id: 31, name: "Monster Hunter Freedom Unite", platform: "psp", category: "action", rating: 4.6, downloads: "6M+", desc: "Hunt monsters on the go.", popular: false, new: false, img: "🐉" },
    { id: 32, name: "Tekken 6", platform: "psp", category: "fighting", rating: 4.3, downloads: "4M+", desc: "Arcade fighting on PSP.", popular: false, new: false, img: "👊" },
    
    // -- Nintendo / Switch --
    { id: 33, name: "Super Mario Odyssey", platform: "nintendo", category: "adventure", rating: 4.9, downloads: "30M+", desc: "Mario's globetrotting 3D adventure.", popular: true, new: false, img: "⭐" },
    { id: 34, name: "The Legend of Zelda: Tears of the Kingdom", platform: "nintendo", category: "adventure", rating: 5.0, downloads: "25M+", desc: "Groundbreaking open-air adventure.", popular: true, new: false, img: "🗡️" },
    { id: 35, name: "Pokemon Scarlet/Violet", platform: "nintendo", category: "rpg", rating: 4.2, downloads: "30M+", desc: "Open-world Pokemon adventure.", popular: false, new: false, img: "⚡" },
    { id: 36, name: "Mario Kart 8 Deluxe", platform: "nintendo", category: "racing", rating: 4.8, downloads: "50M+", desc: "Best kart racing game ever.", popular: true, new: false, img: "🏎️" },
    
    // -- Emulators (PPSSPP / Dolphin / ePSXe / RetroArch) --
    { id: 37, name: "PPSSPP - God of War Ghost of Sparta", platform: "emulator", category: "action", rating: 4.5, downloads: "10M+", desc: "Play PSP God of War on PC/Android via PPSSPP.", popular: true, new: false, img: "⚔️" },
    { id: 38, name: "Dolphin - Super Mario Galaxy 2", platform: "emulator", category: "adventure", rating: 4.8, downloads: "8M+", desc: "Wii classic on Dolphin emulator.", popular: false, new: false, img: "⭐" },
    { id: 39, name: "ePSXe - Castlevania Symphony of Night", platform: "emulator", category: "action", rating: 4.7, downloads: "5M+", desc: "PS1 classic on ePSXe emulator.", popular: false, new: false, img: "🧛" },
    { id: 40, name: "RetroArch - All Retro Games", platform: "emulator", category: "multiplayer", rating: 4.4, downloads: "20M+", desc: "All-in-one retro emulation platform.", popular: true, new: false, img: "🕹️" },
    
    // -- Java (Feature Phones) --
    { id: 41, name: "Snake (Nokia Classic)", platform: "java", category: "puzzle", rating: 4.0, downloads: "100M+", desc: "The original mobile classic.", popular: false, new: false, img: "🐍" },
    { id: 42, name: "Bounce (Nokia)", platform: "java", category: "adventure", rating: 4.2, downloads: "50M+", desc: "Classic Nokia ball game.", popular: false, new: false, img: "⚪" },
    { id: 43, name: "Prince of Persia (Java)", platform: "java", category: "action", rating: 4.3, downloads: "20M+", desc: "Java port of the classic.", popular: false, new: false, img: "🗡️" },
    { id: 44, name: "Asphalt 3 (Java)", platform: "java", category: "racing", rating: 4.1, downloads: "30M+", desc: "Racing on feature phones!", popular: false, new: false, img: "🏎️" },
    
    // -- Symbian (Nokia S60) --
    { id: 45, name: "N-Gage - Tony Hawk Pro Skater", platform: "symbian", category: "sports", rating: 4.2, downloads: "5M+", desc: "Skateboarding on Symbian N-Gage.", popular: false, new: false, img: "🛹" },
    { id: 46, name: "Gameloft GT Racing (Symbian)", platform: "symbian", category: "racing", rating: 4.0, downloads: "10M+", desc: "Symbian racing game.", popular: false, new: false, img: "🏎️" },
    { id: 47, name: "Nokia N-Gage - Pathway to Glory", platform: "symbian", category: "strategy", rating: 4.1, downloads: "3M+", desc: "WWII strategy on N-Gage.", popular: false, new: false, img: "🎖️" },
    
    // -- BlackBerry --
    { id: 48, name: "BrickBreaker (BlackBerry)", platform: "blackberry", category: "puzzle", rating: 4.3, downloads: "40M+", desc: "Classic BlackBerry brick breaker.", popular: false, new: false, img: "🧱" },
    { id: 49, name: "Texas Hold'em (BlackBerry)", platform: "blackberry", category: "strategy", rating: 4.0, downloads: "15M+", desc: "Poker on BlackBerry.", popular: false, new: false, img: "🃏" },
    
    // -- Terminal / CLI Games --
    { id: 50, name: "Nethack", platform: "terminal", category: "rpg", rating: 4.5, downloads: "5M+", desc: "Classic dungeon crawler roguelike.", popular: false, new: false, img: "💀" },
    { id: 51, name: "Dwarf Fortress", platform: "terminal", category: "strategy", rating: 4.7, downloads: "3M+", desc: "Deepest simulation game ever.", popular: false, new: false, img: "⛏️" },
    { id: 52, name: "Cataclysm: Dark Days Ahead", platform: "terminal", category: "rpg", rating: 4.4, downloads: "2M+", desc: "Post-apocalyptic survival roguelike.", popular: false, new: false, img: "🧟" },
];

// ═══════════ THEME TOGGLE ═══════════
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    const icon = document.getElementById('themeToggle').querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.querySelector('i').className = 'fas fa-sun';
}

// ═══════════ MOBILE MENU ═══════════
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Mobile dropdown toggle
function toggleDropdown(el) {
    if (window.innerWidth <= 968) {
        const dropdown = el.parentElement.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }
}

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });
});

// ═══════════ BACK TO TOP ═══════════
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (btn) {
        if (window.scrollY > 500) {
            btn.classList.add('show');
            btn.style.display = 'flex';
        } else {
            btn.classList.remove('show');
            btn.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════ NAVBAR SCROLL SHADOW ═══════════
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// ═══════════ GAME CARD RENDERER ═══════════
function renderGameCard(game) {
    const platformIcons = {
        android: '<i class="fab fa-android"></i>',
        ios: '<i class="fab fa-apple"></i>',
        windows: '<i class="fab fa-windows"></i>',
        mac: '<i class="fab fa-apple"></i>',
        ps5: '<i class="fab fa-playstation"></i>',
        ps4: '<i class="fab fa-playstation"></i>',
        ps2: '<i class="fas fa-compact-disc"></i>',
        psp: '<i class="fas fa-gamepad"></i>',
        nintendo: '<i class="fas fa-star"></i>',
        emulator: '<i class="fas fa-microchip"></i>',
        java: '<i class="fas fa-mobile-alt"></i>',
        symbian: '<i class="fas fa-history"></i>',
        blackberry: '<i class="fas fa-mobile-alt"></i>',
        terminal: '<i class="fas fa-terminal"></i>'
    };

    const categoryColors = {
        action: '#ef4444',
        adventure: '#22c55e',
        rpg: '#7c3aed',
        strategy: '#4f46e5',
        racing: '#eab308',
        fighting: '#dc2626',
        shooting: '#ff6b35',
        horror: '#7f1d1d',
        simulation: '#0ea5e9',
        sports: '#22c55e',
        puzzle: '#d946ef',
        multiplayer: '#f97316'
    };

    const stars = '★'.repeat(Math.floor(game.rating)) + (game.rating % 1 >= 0.5 ? '½' : '');

    return `
        <div class="game-card" data-id="${game.id}" data-platform="${game.platform}" data-category="${game.category}">
            <div class="game-card-img" style="background: linear-gradient(135deg, ${categoryColors[game.category] || '#4f46e5'}, #1a1a3e);">
                <span style="font-size:3rem;">${game.img}</span>
                <span class="platform-badge">${platformIcons[game.platform] || '<i class="fas fa-gamepad"></i>'} ${game.platform.charAt(0).toUpperCase() + game.platform.slice(1)}</span>
            </div>
            <div class="game-card-body">
                <h3>${game.name}</h3>
                <div class="meta">
                    <span class="rating">${stars}</span>
                    <span><i class="fas fa-download"></i> ${game.downloads}</span>
                    <span><i class="fas fa-tag"></i> ${game.category}</span>
                </div>
                <p class="desc">${game.desc}</p>
                <div class="card-actions">
                    <a href="#" class="btn-download" onclick="event.preventDefault(); alert('Download started: ${game.name}')"><i class="fas fa-download"></i> Download</a>
                    <a href="#" class="btn-review" onclick="event.preventDefault(); alert('Write review for: ${game.name}')"><i class="fas fa-star"></i> Review</a>
                </div>
            </div>
        </div>
    `;
}

// ═══════════ FEATURED GAMES ═══════════
function loadFeaturedGames() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    const featured = gamesDB.filter(g => g.popular).slice(0, 12);
    grid.innerHTML = featured.map(g => renderGameCard(g)).join('');
}

// ═══════════ ALL GAMES ═══════════
let currentPage = 1;
const gamesPerPage = 24;
let filteredGames = [...gamesDB];

function loadAllGames() {
    const grid = document.getElementById('allGamesGrid');
    if (!grid) return;

    const start = 0;
    const end = currentPage * gamesPerPage;
    const gamesToShow = filteredGames.slice(start, end);

    if (gamesToShow.length === 0 && currentPage === 1) {
        grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:40px;color:var(--text-secondary);">No games found matching your filters.</p>';
        return;
    }

    grid.innerHTML = gamesToShow.map(g => renderGameCard(g)).join('');
}

function loadMoreGames() {
    currentPage++;
    const grid = document.getElementById('allGamesGrid');
    const start = 0;
    const end = currentPage * gamesPerPage;
    const gamesToShow = filteredGames.slice(0, end);
    if (grid) grid.innerHTML = gamesToShow.map(g => renderGameCard(g)).join('');

    if (end >= filteredGames.length) {
        const btnContainer = document.querySelector('.load-more');
        if (btnContainer) btnContainer.style.display = 'none';
    }
}

// ═══════════ FILTER GAMES ═══════════
function filterGames() {
    const platformFilter = document.getElementById('platformFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (!platformFilter) return;

    const platformVal = platformFilter.value;
    const categoryVal = categoryFilter.value;
    const sortVal = sortFilter.value;

    filteredGames = gamesDB.filter(g => {
        const platformMatch = platformVal === 'all' || g.platform === platformVal;
        const categoryMatch = categoryVal === 'all' || g.category === categoryVal;
        return platformMatch && categoryMatch;
    });

    if (sortVal === 'popular') {
        filteredGames.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating);
    } else if (sortVal === 'newest') {
        filteredGames.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    } else if (sortVal === 'rating') {
        filteredGames.sort((a, b) => b.rating - a.rating);
    }

    currentPage = 1;
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) loadMoreBtn.style.display = 'block';
    loadAllGames();
}

// ═══════════ SEARCH ═══════════
function searchGames(event) {
    if (event && event.key !== 'Enter') return;

    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const query = input.value.toLowerCase().trim();
    const resultsBox = document.getElementById('searchResults');
    if (!resultsBox) return;

    if (query === '') {
        resultsBox.classList.remove('show');
        return;
    }

    const results = gamesDB.filter(g =>
        g.name.toLowerCase().includes(query) ||
        g.category.toLowerCase().includes(query) ||
        g.platform.toLowerCase().includes(query) ||
        g.desc.toLowerCase().includes(query)
    ).slice(0, 8);

    if (results.length === 0) {
        resultsBox.innerHTML = '<div class="result-item" style="color:var(--text-secondary);">No games found</div>';
    } else {
        resultsBox.innerHTML = results.map(g => `
            <div class="result-item" onclick="event.preventDefault(); alert('${g.name} - ${g.platform.toUpperCase()}'); document.getElementById('searchResults').classList.remove('show');">
                <strong>${g.name}</strong> <span style="color:var(--text-secondary);font-size:0.8rem;">• ${g.platform} • ${g.category}</span>
            </div>
        `).join('');
    }

    resultsBox.classList.add('show');
}

// Close search results on outside click
document.addEventListener('click', (e) => {
    const resultsBox = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    if (resultsBox && !e.target.closest('.search-bar')) {
        resultsBox.classList.remove('show');
    }
});

// Big search on homepage
function searchBigGames() {
    const input = document.getElementById('searchBigInput');
    if (!input) return;
    
    const query = input.value.toLowerCase().trim();
    if (query === '') return;

    const results = gamesDB.filter(g =>
        g.name.toLowerCase().includes(query) ||
        g.category.toLowerCase().includes(query) ||
        g.platform.toLowerCase().includes(query) ||
        g.desc.toLowerCase().includes(query)
    );

    const grid = document.getElementById('allGamesGrid');
    if (grid) {
        filteredGames = results;
        currentPage = 1;
        const loadMoreBtn = document.querySelector('.load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = results.length > gamesPerPage ? 'block' : 'none';
        }
        loadAllGames();

        // Scroll to all games section
        const allGamesSection = document.getElementById('allGames');
        if (allGamesSection) allGamesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Allow Enter key on big search
document.addEventListener('DOMContentLoaded', () => {
    const bigInput = document.getElementById('searchBigInput');
    if (bigInput) {
        bigInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') searchBigGames();
        });
    }
});

// ═══════════ NEWSLETTER ═══════════
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    if (email) {
        alert(`🎮 Thank you for subscribing! We'll send game updates to ${email}`);
        event.target.querySelector('input').value = '';
    }
}

// ═══════════ ADMIN PANEL ═══════════
function loadAdminPanel() {
    if (!document.querySelector('.admin-table')) return;

    // Stats
    const totalGames = gamesDB.length;
    const platforms = [...new Set(gamesDB.map(g => g.platform))].length;
    const categories = [...new Set(gamesDB.map(g => g.category))].length;
    const totalDownloads = gamesDB.reduce((sum, g) => {
        const num = parseInt(g.downloads.replace(/[^0-9]/g, ''));
        return sum + (num || 0);
    }, 0);

    const statCards = document.querySelectorAll('.admin-stat-card h3');
    if (statCards.length >= 4) {
        statCards[0].textContent = totalGames;
        statCards[1].textContent = platforms;
        statCards[2].textContent = categories;
        statCards[3].textContent = totalDownloads.toLocaleString() + '+';
    }

    // Table
    const tbody = document.querySelector('.admin-table tbody');
    if (tbody) {
        t