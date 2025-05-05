$(document).ready(function() {
    // 네비게이션 스크롤 효과
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
        updateActiveSection();
    });

    // 네비게이션 링크 클릭 시 스크롤 애니메이션
    $('.nav-links a').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 400);
            $('.nav-links').removeClass('nav-links-active');
        }
    });

    // DOM 요소 참조
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    // 모바일 메뉴 토글 함수
    function toggleMenu() {
        if (navLinks && navOverlay) {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            if (body) {
                body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            }
        }
    }

    // 모바일 메뉴 버튼 이벤트 리스너
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // 오버레이 클릭 이벤트
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // 네비게이션 링크 클릭 이벤트
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 모바일 메뉴가 열려있으면 닫기
                if (navLinks && navLinks.classList.contains('active')) {
                    toggleMenu();
                }
                
                // 스크롤 애니메이션
                const targetPosition = targetSection.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 400;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeInOutCubic = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * easeInOutCubic);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // 스크롤 이벤트
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 10px rgba(44, 82, 130, 0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 2px 10px rgba(44, 82, 130, 0.1)';
                }
            }
        });
    });

    // ESC 키로 모바일 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // 현재 섹션 하이라이트
    function updateActiveSection() {
        const scrollPosition = window.pageYOffset + 100;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 로고 클릭 시 최상단으로 스크롤
    $('.logo').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
    });

    // 스크롤 이벤트에 디바운스 적용
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 스크롤 이벤트에 디바운스 적용
    const debouncedUpdateActiveSection = debounce(updateActiveSection, 100);
    window.addEventListener('scroll', debouncedUpdateActiveSection);

    // 초기 활성 섹션 설정
    updateActiveSection();

    // 경력 사항 애니메이션 초기화
    function initExperienceAnimations() {
        const timelineItems = $('.timeline-item');
        if (!timelineItems.length) return;

        // 스크롤 이벤트 핸들러
        $(window).scroll(function() {
            timelineItems.each(function() {
                const item = $(this);
                const itemTop = item.offset().top;
                const itemHeight = item.outerHeight();
                const windowHeight = $(window).height();
                const scrollTop = $(window).scrollTop();

                // 요소가 화면에 보일 때 애니메이션 실행
                if (scrollTop + windowHeight > itemTop + itemHeight * 0.3) {
                    animateTimelineItem(item);
                }
            });
        });

        // 초기 로드 시 애니메이션 실행
        $(window).trigger('scroll');
    }

    // 타임라인 아이템 애니메이션
    function animateTimelineItem(item) {
        if (item.hasClass('animated')) return;

        const duration = item.find('.timeline-duration');
        const level = item.find('.experience-level');
        const icon = item.find('.timeline-icon');
        const tags = item.find('.tags span');
        const achievements = item.find('.achievements li');
        const header = item.find('.timeline-header');

        // 아이템 페이드인
        item.css({
            opacity: 0,
            transform: 'translateY(50px)'
        }).animate({
            opacity: 1,
            transform: 'translateY(0)'
        }, 800);

        // 기간 라벨 애니메이션
        duration.css({
            opacity: 0,
            transform: 'scale(0)'
        }).delay(200).animate({
            opacity: 1,
            transform: 'scale(1)'
        }, 500);

        // 경력 레벨 라벨 애니메이션
        level.css({
            opacity: 0,
            transform: 'translateX(50px)'
        }).delay(300).animate({
            opacity: 1,
            transform: 'translateX(0)'
        }, 500);

        // 아이콘 회전 애니메이션
        icon.css({
            opacity: 0,
            transform: 'rotate(360deg) scale(0)'
        }).delay(400).animate({
            opacity: 1,
            transform: 'rotate(0deg) scale(1)'
        }, 1000);

        // 태그 애니메이션
        tags.each(function(index) {
            $(this).css({
                opacity: 0,
                transform: 'scale(0)'
            }).delay(500 + index * 100).animate({
                opacity: 1,
                transform: 'scale(1)'
            }, 500);
        });

        // 성과 목록 애니메이션
        achievements.each(function(index) {
            $(this).css({
                opacity: 0,
                transform: 'translateX(-20px)'
            }).delay(600 + index * 100).animate({
                opacity: 1,
                transform: 'translateX(0)'
            }, 500);
        });

        // 호버 효과
        header.hover(
            function() {
                $(this).stop().animate({
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)'
                }, 300);
                level.stop().animate({
                    transform: 'scale(1.1)'
                }, 300);
                icon.stop().animate({
                    transform: 'rotate(15deg)'
                }, 300);
            },
            function() {
                $(this).stop().animate({
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }, 300);
                level.stop().animate({
                    transform: 'scale(1)'
                }, 300);
                icon.stop().animate({
                    transform: 'rotate(0deg)'
                }, 300);
            }
        );

        item.addClass('animated');
    }

    // 스킬 레벨 바 애니메이션
    function initSkillAnimations() {
        $('.skill-level-progress').each(function() {
            const progress = $(this).data('progress');
            if (progress) {
                $(this).css({
                    transform: 'scaleX(0)'
                }).delay(200).animate({
                    transform: 'scaleX(' + (progress / 100) + ')'
                }, 1000);
            }
        });
    }

    // 프로젝트 카드 호버 효과
    $('.project-card').hover(
        function() {
            $(this).stop().animate({
                transform: 'translateY(-10px)',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
            }, 300);
        },
        function() {
            $(this).stop().animate({
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }, 300);
        }
    );

    // 애니메이션 초기화
    initExperienceAnimations();
    initSkillAnimations();

    function revealTimelineItems() {
        $('.timeline-item').each(function() {
            var $el = $(this);
            var top = $el.offset().top;
            var bottom = top + $el.outerHeight();
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (top < scroll + windowHeight - 60) {
                $el.addClass('visible');
            }
        });
    }
    $(window).on('scroll resize', revealTimelineItems);
    revealTimelineItems();
}); 