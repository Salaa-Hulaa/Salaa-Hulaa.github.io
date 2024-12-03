let canvas, ctx;

function initMosaicBackground() {
    canvas = document.getElementById('mosaicBackground');
    ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    drawMosaic();
}

function drawMosaic() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const colors = themeColors[currentTheme].mosaicColors;
    
    const tileSize = 50;
    const rows = Math.ceil(canvas.height / tileSize);
    const cols = Math.ceil(canvas.width / tileSize);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillStyle = color;
            ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
    }
}

function updateMosaicColors(isDark, theme) {
    drawMosaic();
} 