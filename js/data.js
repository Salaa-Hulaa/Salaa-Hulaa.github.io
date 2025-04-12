// 主题颜色配置
const themeColors = {
    light: {
        mosaicColors: ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af']
    },
    dark: {
        mosaicColors: ['#1f2937', '#374151', '#4b5563', '#6b7280']
    },
    pixel: {
        mosaicColors: ['#c7f0d8', '#faf3dd', '#e76f51', '#43523d']
    },
    tech: {
        mosaicColors: ['#0a192f', '#112240', '#64ffda', '#8892b0']
    },
    minimal: {
        mosaicColors: ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0']
    },
    chinese: {
        mosaicColors: ['#f2e8cf', '#e4d5b7', '#c41e3a', '#5c0011']
    }
};

// 团队成员数据
const teamMembers = [
    {
        id: 1,
        name: "Siupal",
        role: "皮皮黑",
        links: {
            github: "https://github.com/siupal"
        },
        idea: {
            title: "hulaa",
            description: "野心勃勃地半途而废"
        }
    },
    {
        id: 2,
        name: "壹位姜",
        role: "一块姜而已",
        links: {
            personal: "https://abitginger.github.io"
        },
        idea: {
            title: "不务正业的参与者",
            description: "“这是什么？玩一下”"
        }
    },
    {
        id: 3,
        name: "Yangcloong",
        role: "龙哥",
        links: {
            github: "https://github.com/Yangcloong"
        },
        idea: {
            title: "技术支持",
            description: "提供技术支持和解决方案，专注于代码质量和性能优化"
        }
    }
];

// 项目数据
const projects = [
    {
        id: 1,
        title: "坦克游戏",
        date: "2024-12-01",
        description: "经典的坦克大战游戏，支持多人对战模式，包含了一个小小的AI，对碳基生物可能不是那么公平",
        link: "https://salaa-hulaa.github.io/TankGame/",
        tags: ["游戏", "JavaScript", "HTML5"]
    },
    {
        id: 2,
        title: "追逐游戏",
        date: "2024-12-15",
        description: "点击开始游戏，然后，跑！",
        link: "https://siupal.github.io/Chasing-Game/",
        tags: ["游戏", "JavaScript", "HTML5", "Canvas"]
    },
    {
        id: 3,
        title: "钢琴游戏",
        date: "2025-01-10",
        description: "在线弹钢琴，释放你的音乐才华——————(音色为曲线拟合，远远不如真实采样，仅做娱乐)",
        link: "https://siupal.github.io/Piano/",
        tags: ["音乐", "JavaScript", "HTML5", "Web Audio API"]
    },
    {
        id: 4,
        title: "触觉振荡器",
        date: "2025-02-20",
        description: "移动设备触觉反馈原型，提供可调节的振动体验(我的朋友更愿意称呼他为一个噪声制造器，点击-拖动-调节滑块，创造奇特的声音)",
        link: "https://siupal.github.io/HapticOscillatorPrototype-Mobile/",
        tags: ["触觉反馈", "移动设备", "JavaScript", "Web Vibration API"]
    }
]; 
