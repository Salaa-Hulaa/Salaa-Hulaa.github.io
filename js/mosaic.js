let canvas, ctx;

function initMosaicBackground() {
    canvas = document.getElementById('mosaicBackground');
    ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawMosaic(); // 重新绘制马赛克
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // 添加页面可见性变化的监听器
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // 页面恢复可见时重新绘制马赛克
            drawMosaic();
        }
    });
    
    // 添加窗口焦点变化的监听器
    window.addEventListener('focus', function() {
        drawMosaic();
    });
    
    resizeCanvas();
}

function drawMosaic() {
    if (!canvas || !ctx) return; // 防止在canvas未初始化时调用
    
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