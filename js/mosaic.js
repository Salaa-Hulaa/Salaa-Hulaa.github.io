// 马赛克背景
const canvas = document.getElementById('mosaicBackground');
const ctx = canvas.getContext('2d');
let currentColors = themeColors.light.mosaicColors;

// 调整画布大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawMosaic(); // 重绘背景
}

// 初始化
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 绘制马赛克图案
function drawMosaic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const tileSize = 60;
    const cols = Math.ceil(canvas.width / tileSize);
    const rows = Math.ceil(canvas.height / tileSize);
    
    // 使用固定的随机种子来保持图案稳定
    let seed = 1;
    function random() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * tileSize;
            const y = j * tileSize;
            
            // 使用伪随机数选择颜色，保持图案稳定
            const colorIndex = Math.floor(random() * currentColors.length);
            ctx.fillStyle = currentColors[colorIndex];
            
            // 绘制略微偏移的矩形，制造自然的效果
            const offset = random() * 4 - 2; // -2 到 2 之间的随机偏移
            ctx.fillRect(x + offset, y + offset, tileSize - Math.abs(offset), tileSize - Math.abs(offset));
        }
    }
}

// 更新颜色
window.updateMosaicColors = function(colors) {
    currentColors = colors;
    drawMosaic();
}; 