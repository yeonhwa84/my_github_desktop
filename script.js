// 스킬 레벨 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    // 스킬 레벨 바 애니메이션
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-level') + '%';
        level.style.setProperty('--width', width);
    });

    // 스크롤 애니메이션
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // 스크롤 시 네비게이션 바 스타일 변경
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // 현재 섹션 하이라이트
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 프로젝트 필터링
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 필터 값 가져오기
            const filter = button.getAttribute('data-filter');

            // 프로젝트 카드 필터링
            projectCards.forEach(card => {
                // 모든 카드의 애니메이션 클래스 제거
                card.style.animation = 'none';
                card.offsetHeight; // 리플로우 트리거

                if (filter === 'all') {
                    card.style.display = 'block';
                    // 애니메이션 다시 적용
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                    // 애니메이션 다시 적용
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 컨택트 폼 제출
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // 여기에 폼 제출 로직 추가
        console.log('Form submitted:', data);
        
        // 폼 초기화
        contactForm.reset();
        alert('메시지가 성공적으로 전송되었습니다!');
    });

    // 스크롤 시 요소 페이드인 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 타이핑 효과
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    // 히어로 섹션 타이핑 효과 적용
    const heroTitle = document.querySelector('.hero h1 .highlight');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText);
    }
});

// 모바일 메뉴 토글
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}); 