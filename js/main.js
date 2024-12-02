document.addEventListener('DOMContentLoaded', function() {
    // 主题相关
    const themeToggle = document.getElementById('themeToggle');
    const themeSelect = document.getElementById('themeSelect');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const html = document.documentElement;
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedMode = localStorage.getItem('mode') || 'dark';
    
    // 设置初始主题
    html.setAttribute('data-theme', savedTheme);
    html.classList.toggle('dark', savedMode === 'dark');
    themeSelect.value = savedTheme;
    updateThemeIcons(savedMode === 'dark');

    // 主题选择器事件
    themeSelect.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateMosaicColors(html.classList.contains('dark'), newTheme);
    });

    // 暗色/亮色模式切换
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('mode', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
        
        // 添加过渡类
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
        
        updateMosaicColors(isDark, html.getAttribute('data-theme'));
    });

    function updateThemeIcons(isDark) {
        moonIcon.classList.toggle('hidden', !isDark);
        sunIcon.classList.toggle('hidden', isDark);
    }

    // 初始化马赛克背景
    initMosaicBackground();
    updateMosaicColors(savedMode === 'dark', savedTheme);

    // 渲染团队成员
    const teamMembersContainer = document.getElementById('teamMembers');
    teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'card hover:scale-105 transition-all duration-300 w-80';
        
        // 创建正面内容
        const frontContent = document.createElement('div');
        frontContent.className = 'member-info';
        frontContent.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${member.name}</h3>
            <p class="text-muted-foreground mb-4">${member.role}</p>
            ${member.links.github ? 
                `<a href="${member.links.github}" target="_blank" class="text-primary hover:text-primary/80">GitHub</a>` : ''}
            ${member.links.personal ? 
                `<a href="${member.links.personal}" target="_blank" class="text-primary hover:text-primary/80">个人网站</a>` : ''}
        `;

        // 创建背面内容
        const backContent = document.createElement('div');
        backContent.className = 'idea-info hidden';
        backContent.innerHTML = `
            <div class="p-4 bg-muted rounded">
                <h4 class="font-bold mb-2">${member.idea.title}</h4>
                <p class="text-muted-foreground">${member.idea.description}</p>
            </div>
        `;

        // 添加点击切换效果
        memberCard.addEventListener('click', () => {
            frontContent.classList.toggle('hidden');
            backContent.classList.toggle('hidden');
        });

        // 添加提示文本
        const hintText = document.createElement('div');
        hintText.className = 'text-sm text-muted-foreground mt-4 text-center';
        hintText.textContent = '点击查看更多信息';
        
        memberCard.appendChild(frontContent);
        memberCard.appendChild(backContent);
        memberCard.appendChild(hintText);
        teamMembersContainer.appendChild(memberCard);
    });

    // 渲染项目
    const projectsContainer = document.getElementById('projects');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card hover:scale-105 transition-all duration-300 w-80';
        
        // 创建正面内容
        const frontContent = document.createElement('div');
        frontContent.className = 'project-info';
        frontContent.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${project.title}</h3>
            <p class="text-muted-foreground mb-2">${project.date}</p>
            <p class="mb-4">${project.description}</p>
            ${project.link ? 
                `<a href="${project.link}" target="_blank" class="text-primary hover:text-primary/80">查看项目</a>` : ''}
        `;

        // 创建背面内容（标签和详细信息）
        const backContent = document.createElement('div');
        backContent.className = 'project-details hidden';
        backContent.innerHTML = `
            <div class="mt-4 flex flex-wrap gap-2">
                ${project.tags.map(tag => 
                    `<span class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm">${tag}</span>`
                ).join('')}
            </div>
            <div class="mt-4 p-4 bg-muted rounded">
                <p class="text-muted-foreground">项目详情敬请期待...</p>
            </div>
        `;

        // 添加点击切换效果
        projectCard.addEventListener('click', (e) => {
            // 如果点击的是链接，不触发卡片翻转
            if (e.target.tagName === 'A') return;
            frontContent.classList.toggle('hidden');
            backContent.classList.toggle('hidden');
        });

        // 添加提示文本
        const hintText = document.createElement('div');
        hintText.className = 'text-sm text-muted-foreground mt-4 text-center';
        hintText.textContent = '点击查看更多信息';
        
        projectCard.appendChild(frontContent);
        projectCard.appendChild(backContent);
        projectCard.appendChild(hintText);
        projectsContainer.appendChild(projectCard);
    });
}); 