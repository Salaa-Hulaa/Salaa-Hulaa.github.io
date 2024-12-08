async function updateContent() {
    try {
        // 获取项目数据
        const projectsResponse = await fetch('/data/projects.json');
        if (!projectsResponse.ok) {
            throw new Error(`HTTP error! status: ${projectsResponse.status}`);
        }
        const projectsData = await projectsResponse.json();
        
        // 获取成员数据
        const membersResponse = await fetch('/data/members.json');
        if (!membersResponse.ok) {
            throw new Error(`HTTP error! status: ${membersResponse.status}`);
        }
        const membersData = await membersResponse.json();

        // 更新项目展示
        updateProjects(projectsData.projects || []);
        
        // 更新成员展示
        updateMembers(membersData.members || []);

    } catch (error) {
        console.error('更新内容时出错:', error);
        // 显示错误提示
        showErrorMessage('数据加载失败，请稍后重试');
    }
}

// 显示错误消息
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
    errorDiv.role = 'alert';
    errorDiv.innerHTML = `
        <strong class="font-bold">错误！</strong>
        <span class="block sm:inline">${message}</span>
    `;
    document.body.insertBefore(errorDiv, document.body.firstChild);
    
    // 5秒后自动消失
    setTimeout(() => errorDiv.remove(), 5000);
}

// 更新项目展示
function updateProjects(projects) {
    const projectsContainer = document.getElementById('projects');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    projectsContainer.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-8', 'p-8');

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<div class="col-span-full text-center text-gray-500">暂无项目数据</div>';
        return;
    }

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add(
            'flip-card',
            'w-64',
            'h-96',
            'perspective-1000',
            'float-animation'
        );
        
        projectElement.innerHTML = `
            <div class="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
                <!-- 正面 -->
                <div class="flip-card-front glass-card-front absolute w-full h-full rounded-lg overflow-hidden">
                    <div class="relative h-40 bg-gray-100 dark:bg-gray-800">
                        <img src="${project.image || `https://opengraph.githubassets.com/1/${project.link.replace('https://github.com/', '')}`}" 
                             alt="${project.title}" 
                             class="w-full h-full object-cover">
                        ${project.homepage ? `
                            <a href="${project.homepage}" target="_blank" 
                               class="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                               onclick="event.stopPropagation()">
                                访问项目
                            </a>
                        ` : ''}
                    </div>
                    <div class="p-4">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">${project.description}</p>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            ${project.language ? `
                                <span class="flex items-center">
                                    <span class="w-2 h-2 rounded-full bg-${getLanguageColor(project.language)} mr-1"></span>
                                    ${project.language}
                                </span>
                            ` : ''}
                            ${project.stars ? `<span>⭐ ${project.stars}</span>` : ''}
                            ${project.forks ? `<span>🍴 ${project.forks}</span>` : ''}
                        </div>
                        <div class="mt-4 text-sm text-gray-500">点击查看详情</div>
                    </div>
                </div>
                
                <!-- 背面 -->
                <div class="flip-card-back glass-card-back absolute w-full h-full rounded-lg p-4">
                    <div class="absolute top-4 right-4 text-sm text-gray-500">点击返回</div>
                    <h3 class="text-lg font-bold mb-2">${project.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${project.description}</p>
                    ${project.topics && project.topics.length > 0 ? `
                        <div class="mb-4">
                            <div class="flex flex-wrap gap-2">
                                ${project.topics.map(topic => `
                                    <span class="tag">${topic}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    <div class="flex flex-col gap-2 mt-4">
                        <a href="${project.link}" target="_blank" 
                           class="flex items-center gap-2 text-gray-600 hover:text-purple-500 dark:text-gray-400 transition-colors"
                           onclick="event.stopPropagation()">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                            </svg>
                            GitHub 仓库
                        </a>
                        ${project.homepage ? `
                            <a href="${project.homepage}" target="_blank" 
                               class="flex items-center gap-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 transition-colors"
                               onclick="event.stopPropagation()">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                </svg>
                                在线演示
                            </a>
                        ` : ''}
                    </div>
                    ${project.last_update ? `
                        <div class="absolute bottom-4 left-4 text-sm text-gray-500">
                            最后更新: ${new Date(project.last_update).toLocaleDateString()}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // 添加图片类名
        const projectImage = projectElement.querySelector('img');
        if (projectImage) {
            projectImage.classList.add('project-image');
        }

        // 添加标签类名
        projectElement.querySelectorAll('.tag').forEach(tag => {
            tag.classList.add('hover:shadow-md');
        });

        // 添加链接类名
        projectElement.querySelectorAll('a').forEach(link => {
            link.classList.add('social-icon');
        });

        // 添加点击事件处理
        const cardInner = projectElement.querySelector('.flip-card-inner');
        const frontCard = projectElement.querySelector('.flip-card-front');
        const backCard = projectElement.querySelector('.flip-card-back');

        // 点击正面翻转到背面
        frontCard.addEventListener('click', function(e) {
            if (e.target.closest('a')) return; // 如果点击的是链接则不翻转
            cardInner.classList.add('flipped');
        });

        // 点击背面翻转到正面
        backCard.addEventListener('click', function(e) {
            if (e.target.closest('a')) return; // 如果点击的是链接则不翻转
            cardInner.classList.remove('flipped');
        });

        // 处理链接点击
        projectElement.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // 添加鼠标移动视差效果
        projectElement.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            if (!cardInner.classList.contains('flipped')) {
                cardInner.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
            }
        });

        // 鼠标离开时重置效果
        projectElement.addEventListener('mouseleave', function() {
            if (!cardInner.classList.contains('flipped')) {
                cardInner.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            }
        });
        
        projectsContainer.appendChild(projectElement);
    });
}

// 更新成员展示
function updateMembers(members) {
    const membersContainer = document.getElementById('teamMembers');
    if (!membersContainer) return;
    
    membersContainer.innerHTML = '';
    
    if (members.length === 0) {
        membersContainer.innerHTML = '<div class="col-span-full text-center text-gray-500">暂无成员数据</div>';
        return;
    }

    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add(
            'flip-card',
            'w-64',
            'h-96',
            'perspective-1000',
            'float-animation'
        );
        
        // 应用自定义样式
        const customStyle = member.customization || {};
        
        memberElement.innerHTML = `
            <div class="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
                <!-- 正面 -->
                <div class="flip-card-front glass-card-front absolute w-full h-full rounded-lg p-4">
                    <div class="avatar-container mb-4">
                        <img src="${member.avatar}" alt="${member.name}" 
                             class="w-full h-full object-cover">
                        ${member.contact.social.bilibili ? `
                            <div class="absolute -top-2 -right-2 bg-pink-500 text-white p-1 rounded-full z-10">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
                                </svg>
                            </div>
                        ` : ''}
                    </div>
                    <h3 class="text-lg font-bold mb-1">${member.name}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">${member.role}</p>
                    ${member.location ? `
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <span class="inline-block align-middle">📍</span> ${member.location}
                        </p>
                    ` : ''}
                    <div class="mt-4 text-sm text-gray-500">点击卡片翻转查看更多信息</div>
                </div>
                
                <!-- 背面 -->
                <div class="flip-card-back glass-card-back absolute w-full h-full rounded-lg p-4">
                    <div class="absolute top-4 right-4 text-sm text-gray-500">点击返回</div>
                    <h3 class="text-lg font-bold mb-2">${member.name}</h3>
                    ${member.introduction ? `
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">${member.introduction}</p>
                    ` : ''}
                    ${member.skills && member.skills.length > 0 ? `
                        <div class="mb-3">
                            <h4 class="font-medium mb-1">技能</h4>
                            <div class="flex flex-wrap justify-center gap-2">
                                ${member.skills.map(skill => `
                                    <span class="tag">${skill}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${member.interests && member.interests.length > 0 ? `
                        <div class="mb-3">
                            <h4 class="font-medium mb-1">兴趣</h4>
                            <div class="flex flex-wrap justify-center gap-2">
                                ${member.interests.map(interest => `
                                    <span class="tag">${interest}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    <div class="flex justify-center gap-3 mt-4">
                        <a href="${member.github}" target="_blank" 
                           class="social-icon text-gray-600 hover:text-purple-500 dark:text-gray-400"
                           onclick="event.stopPropagation()">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                            </svg>
                        </a>
                        ${member.contact.social.twitter ? `
                            <a href="https://twitter.com/${member.contact.social.twitter}" target="_blank" 
                               class="social-icon text-gray-600 hover:text-blue-400 dark:text-gray-400"
                               onclick="event.stopPropagation()">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                        ` : ''}
                        ${member.blog ? `
                            <a href="${member.blog}" target="_blank" 
                               class="social-icon text-gray-600 hover:text-green-500 dark:text-gray-400"
                               onclick="event.stopPropagation()">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // 添加图片类名
        const memberImage = memberElement.querySelector('img');
        if (memberImage) {
            memberImage.classList.add('member-image');
        }

        // 添加标签类名
        memberElement.querySelectorAll('.tag').forEach(tag => {
            tag.classList.add('hover:shadow-md');
        });

        // 添加链接类名
        memberElement.querySelectorAll('a').forEach(link => {
            link.classList.add('social-icon');
        });

        // 添加点击事件处理
        const cardInner = memberElement.querySelector('.flip-card-inner');
        const frontCard = memberElement.querySelector('.flip-card-front');
        const backCard = memberElement.querySelector('.flip-card-back');

        // 点击正面翻转到背面
        frontCard.addEventListener('click', function(e) {
            if (e.target.closest('a')) return; // 如果点击的是链接则不翻转
            cardInner.classList.add('flipped');
        });

        // 点击背面翻转到正面
        backCard.addEventListener('click', function(e) {
            if (e.target.closest('a')) return; // 如果点击的是链接则不翻转
            cardInner.classList.remove('flipped');
        });

        // 处理链接点击
        memberElement.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // 添加鼠标移动视差效果
        memberElement.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            if (!cardInner.classList.contains('flipped')) {
                cardInner.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
            }
        });

        // 鼠标离开时重置效果
        memberElement.addEventListener('mouseleave', function() {
            if (!cardInner.classList.contains('flipped')) {
                cardInner.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            }
        });
        
        membersContainer.appendChild(memberElement);
    });
}

// 获取编程语言对应的颜色
function getLanguageColor(language) {
    const colors = {
        JavaScript: 'yellow-400',
        Python: 'blue-500',
        Java: 'orange-500',
        'C++': 'pink-500',
        TypeScript: 'blue-600',
        HTML: 'red-500',
        CSS: 'purple-500',
        // 可以添加更多语言的颜色
        default: 'gray-400'
    };
    return colors[language] || colors.default;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateContent().catch(error => {
        console.error('初始化失败:', error);
        showErrorMessage('页面初始化失败，请刷新重试');
    });
}); 