document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('themeSelect');
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const html = document.documentElement;
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedMode = localStorage.getItem('mode') || 'light';
    
    themeSelect.value = savedTheme;
    html.setAttribute('data-theme', savedTheme);
    html.classList.toggle('dark', savedMode === 'dark');
    updateThemeIcons(savedMode);
    
    // 主题切换
    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateMosaicBackground(theme);
    });
    
    // 明暗模式切换
    themeToggle.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        updateThemeIcons(isDark ? 'dark' : 'light');
        localStorage.setItem('mode', isDark ? 'dark' : 'light');
        updateMosaicBackground(themeSelect.value);
    });
    
    // 更新主题图标
    function updateThemeIcons(mode) {
        sunIcon.classList.toggle('hidden', mode === 'dark');
        moonIcon.classList.toggle('hidden', mode === 'light');
    }
    
    // 更新背景
    function updateMosaicBackground(theme) {
        const colors = themeColors[theme]?.mosaicColors || themeColors.light.mosaicColors;
        if (window.updateMosaicColors) {
            window.updateMosaicColors(colors);
        }
    }
    
    // 初始化背景
    updateMosaicBackground(savedTheme);
});

// 加载状态管理
const loadingIndicator = {
    element: document.getElementById('loadingIndicator'),
    show() {
        this.element.style.transform = 'scaleX(1)';
    },
    hide() {
        this.element.style.transform = 'scaleX(0)';
    }
};

// 错误提示管理
const errorHandler = {
    container: document.getElementById('errorContainer'),
    messageElement: document.getElementById('errorMessage'),
    show(message) {
        this.messageElement.textContent = message;
        this.container.classList.remove('hidden');
        setTimeout(() => {
            this.hide();
        }, 5000);
    },
    hide() {
        this.container.classList.add('hidden');
    }
};

// 导出工具函数
window.uiTools = {
    loading: loadingIndicator,
    error: errorHandler
}; 