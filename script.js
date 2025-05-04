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
            }, 800);
            $('.nav-links').removeClass('nav-links-active');
        }
    });

    // 모바일 메뉴 토글
    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('nav-links-active');
    });

    // 현재 섹션 하이라이트
    function updateActiveSection() {
        const scrollPosition = $(window).scrollTop() + 100;

        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).height();
            const sectionId = '#' + $(this).attr('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                $('.nav-links a').removeClass('active');
                $('.nav-links a[href="' + sectionId + '"]').addClass('active');
            }
        });
    }

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

    // 로고 클릭 시 최상단으로 스크롤
    $('.logo').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // 초기 활성 섹션 설정
    updateActiveSection();

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