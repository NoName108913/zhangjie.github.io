// 张杰官方网站 - 蓝色科技风交互效果

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 22, 40, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 22, 40, 0.8)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 102, 255, 0.1)';
    }
});

// 音乐波形Canvas动画 - 蓝色版
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Wave {
    constructor(y, amplitude, frequency, color) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.color = color;
        this.phase = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;

        for (let x = 0; x < canvas.width; x++) {
            const y = this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
        this.phase += 0.015;
    }
}

const waves = [
    new Wave(canvas.height * 0.3, 35, 0.008, 'rgba(0, 102, 255, 0.4)'),
    new Wave(canvas.height * 0.5, 45, 0.012, 'rgba(0, 212, 255, 0.3)'),
    new Wave(canvas.height * 0.7, 40, 0.010, 'rgba(0, 255, 255, 0.35)')
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waves.forEach(wave => wave.draw());
    requestAnimationFrame(animate);
}

animate();

// 滚动动画观察器
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.album-card, .concert-item, .award-card, .news-card, .stat-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});

// 专辑卡片播放按钮 - 增强版
document.querySelectorAll('.album-card').forEach(card => {
    const playBtn = card.querySelector('.play-btn');
    
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 创建波纹效果
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 212, 255, 0.6);
            width: 10px;
            height: 10px;
            animation: ripple-expand 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = playBtn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        playBtn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // 切换播放/暂停
        const icon = playBtn.querySelector('i');
        if (icon.classList.contains('fa-play')) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            alert('🎵 正在播放专辑...');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
});

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 数字计数动画
function animateCounter(element, target, duration = 2500) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const hasPlus = element.textContent.includes('+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 16);
}

// 统计数字进入视口时触发动画
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;
            const value = parseInt(text.replace(/\D/g, ''));
            
            animateCounter(number, value);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// 英雄区域按钮效果
const btnPrimary = document.querySelector('.btn-primary');
const btnSecondary = document.querySelector('.btn-secondary');

btnPrimary.addEventListener('click', () => {
    alert('🎵 正在为您准备音乐播放列表...');
});

btnSecondary.addEventListener('click', () => {
    alert('🎫 演唱会门票购买功能即将开放！');
});

// 演唱会购票按钮
document.querySelectorAll('.concert-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const concertName = this.closest('.concert-item').querySelector('h3').textContent;
        if (this.textContent.includes('立即购票')) {
            alert(`🎫 正在为您跳转到《${concertName}》购票页面...`);
        } else {
            alert(`⏰ 《${concertName}》门票即将开售，敬请期待！`);
        }
    });
});

// 新闻卡片点击效果
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const newsTitle = link.closest('.news-card').querySelector('h3').textContent;
        alert(`📰 正在打开新闻详情：${newsTitle}`);
    });
});

// 奖项卡片悬停3D效果
document.querySelectorAll('.award-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        this.style.transform = `translateY(-15px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
    });
});

// 社交媒体链接
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = icon.querySelector('i').classList[1].replace('fa-', '');
        alert(`🔗 正在跳转到张杰的${platform}主页...`);
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    setTimeout(() => {
        hero.style.transition = 'opacity 2s ease-in-out';
        hero.style.opacity = '1';
    }, 100);
});

// 鼠标跟随光晕效果 - 蓝色版
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
cursor.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
    transition: opacity 0.3s;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(updateCursor);
}

updateCursor();

// 隐藏光晕在离开页面时
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        btnPrimary.click();
    }
});

// 滚动进度条 - 蓝色渐变
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #0066ff 0%, #00d4ff 50%, #00ffff 100%);
    z-index: 10001;
    transition: width 0.1s ease-out;
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.8), 0 0 25px rgba(0, 212, 255, 0.4);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// 音乐均衡器动画增强
const equalizer = document.querySelector('.equalizer');
if (equalizer) {
    setInterval(() => {
        equalizer.querySelectorAll('span').forEach(bar => {
            const randomHeight = Math.random() * 35 + 10;
            bar.style.height = randomHeight + 'px';
        });
    }, 250);
}

// 专辑卡片3D跟随效果
document.querySelectorAll('.album-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        
        this.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// 新闻卡片悬停发光效果
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// 添加粒子效果到背景
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// 添加粒子浮动动画
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// 控制台彩蛋 - 蓝色版
console.log('%c🎤 张杰官方网站', 'color: #00d4ff; font-size: 28px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);');
console.log('%c用音乐点燃梦想，用歌声传递力量 🎵', 'color: #0066ff; font-size: 16px; font-weight: bold;');
console.log('%c蓝色科技风 - 创意无限 ✨', 'color: #00ffff; font-size: 14px;');

console.log('💙 蓝色主题网站已加载完成！');
