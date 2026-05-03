export const profile = {
    name: '이연화',
    nameEn: 'Yeonhwa Lee',
    initials: 'LY',
    role: 'Senior Full-Stack Developer · PL',
    yearsOfExperience: 17,
    email: 'yeanhwa84@gmail.com',
    github: 'github.com/yeonhwa',
    linkedin: 'linkedin.com/in/yeonhwa',
    available: true,
    year: 2026,

    // 현재 진행 중인 프로젝트 (Hero & About에 노출)
    nowLeading: {
        kicker: 'Currently Leading',
        company: '한국청소년복지개발원',
        location: '부산 · Busan',
        role: 'Project Leader (PL)',
        period: '2025 — Now · 1 year+',
        scope: '시스템 전체 설계 · 분석 · 운영',
        stack: ['eXBuild', 'Wisenut Search', 'Java', 'Spring'],
        note: '프리랜서 PL로 합류해 시스템 전반의 아키텍처와 분석을 주도하고 있습니다.',
    },

    hero: {
        kicker: 'PL · Available for projects · 2026',
        title: ['From blueprint', 'to production.'],
        subtitle: '17 years, end-to-end.',
        bio: [
            '<strong>"이거 될까?"</strong> 싶었던 문제를 풀어낸 그 짜릿함이, 17년을 끌고 왔습니다.',
            '발전·중공업·공공 SI 현장에서 <strong>그린필드 신규 구축</strong>과 <strong>레거시 전환</strong>, 두 흐름을 모두 다뤄온 풀스택 개발자입니다.',
            '현재는 <strong>한국청소년복지개발원</strong>(부산)에서 <strong>PL</strong>로 1년 넘게, 시스템 전체 <strong>설계·분석</strong>을 주도하고 있습니다.',
        ],
        keywords: ['Java', 'Spring Boot', 'Oracle', 'PostgreSQL', '전자정부프레임워크', 'eXBuild', 'Wisenut'],
    },

    // Stance — AI 시대의 시니어 개발자 매니페스토
    stance: {
        eyebrow: 'Stance',
        title: [
            'AI writes code',
            { italic: 'faster.' },
            'Humans still own',
            { italic: 'the consequences.' },
        ],
        lead:
            '아무리 AI가 대세여도, <strong>선택과 책임은 사람이 집니다.</strong><br/>' +
            '"아는 만큼 나타나는" AI에서 무엇을 끌어낼지는, 결국 17년이 쌓아온 안목입니다.',

        principles: [
            {
                num: '01',
                title: 'Tool, not authority',
                kicker: '도구이자, 결정자는 아니다',
                desc: 'AI는 강력한 도구입니다. 그러나 어떤 코드가 신뢰할 만한지, 어디까지 위임할지를 가르는 안목은 사람의 몫. 17년의 경험이 그 안목입니다.',
            },
            {
                num: '02',
                title: 'Years > Tokens',
                kicker: '시간은 토큰을 이긴다',
                desc: 'AI는 보여주는 만큼만 보여줍니다. 그 너머의 도메인 맥락·운영 리스크·사람의 의도를 읽는 건, 결국 쌓아온 시간의 깊이입니다.',
            },
            {
                num: '03',
                title: 'Never settled',
                kicker: '안주하지 않는다',
                desc: '17년 경력은 출발점일 뿐. 새 도구·새 패러다임이 나오면 가장 먼저 들여다보고, 본인 도구함에 어떻게 안전하게 넣을지 검증합니다.',
            },
            {
                num: '04',
                title: 'Owns the outcome',
                kicker: '결과는 내가 진다',
                desc: 'AI가 짠 코드라도 운영에서의 무게는 사람이 집니다. 프리랜서·정규직 어떤 형태든, 시스템이 살아가는 동안의 책임은 자신이 가져갑니다.',
            },
        ],

        // 현재 학습/관심 — 안주하지 않는 모습 시각화
        // ※ 실제로 학습/관심 가지고 들여다보는 것만 등재. 잘하는 것 X, 익히는 것 O.
        learning: [
            { tag: 'AI Pair Coding',     detail: 'Claude / GPT 협업 워크플로우 검증' },
            { tag: 'Spring Boot 3.x',    detail: 'Virtual Threads / Native Image' },
            { tag: 'eXBuild (PL 관점)',  detail: '솔루션 도입·운영 흐름 학습 중' },
            { tag: 'Wisenut Search',     detail: '검색 색인·랭킹 원리 학습' },
            { tag: 'PostgreSQL Tuning',  detail: 'Explain plan / 튜닝 심화' },
            { tag: '청소년복지 SI 도메인', detail: '현재 PL 맡은 도메인 깊이 다지기' },
        ],
    },

    about: {
        title: ['문제를 ', '기회', '로 바꾸는 개발자입니다.'],
        lead: '2003년 학교 행정실에서 출발해, 자재정보팀·SI·차장을 거쳐 PL까지 — 한 걸음씩 쌓아온 17년입니다. 어떤 형태로 일을 맡아도, 끝까지 책임진다는 한 가지는 변하지 않았습니다.',
        quote: '맡은 일은 끝까지 — 프리랜서·정규직 어떤 형태든, 시작부터 운영 안정화까지 가져갑니다.',
        stats: [
            { label: 'Experience', value: 17, suffix: '+', desc: 'Years in enterprise SI' },
            { label: 'Projects',   value: 30, suffix: '+', desc: 'Delivered end-to-end' },
            { label: 'Industries', value: 5,  suffix: '+', desc: 'Energy · Heavy · Public · ERP' },
        ],
        principles: [
            {
                icon: 'fa-shield-halved',
                title: 'Ownership End-to-End',
                desc: '기획서 한 장에서 운영 안정화까지 — 프리랜서로 합류해도 일을 끝까지 가져가는 게 17년의 룰입니다.',
            },
            {
                icon: 'fa-sitemap',
                title: 'Architecture First',
                desc: 'DB 모델링부터 시스템 경계까지, 처음에 단단히 잡습니다. PL로서 전체 설계·분석을 주도해온 경험이 그 토대입니다.',
            },
            {
                icon: 'fa-arrows-rotate',
                title: 'Migration & Greenfield',
                desc: '한화오션 S/4 HANA 전환, 현대위아 GQIS 웹 전환부터 두산 풍력 신규 구축까지 — 두 결을 모두 다뤘습니다.',
            },
            {
                icon: 'fa-people-arrows',
                title: 'People-Centered Code',
                desc: '기술은 도구일 뿐. 결국 누구를 위한 코드인가가 본질이라고 믿습니다.',
            },
        ],
        domains: [
            { name: '발전·에너지',     detail: '두산에너빌리티 원자력 / 두산 풍력 / 부산시청 에너지' },
            { name: '조선·중공업',     detail: '한화오션 / STX 엔진·파이프 / 성동조선해양' },
            { name: '자동차 부품',     detail: '현대위아 GQIS' },
            { name: '공공·복지',       detail: '한국청소년복지개발원 PL / 한국전기연구원 LIMS / 지질연' },
            { name: 'ERP·HR·MES',     detail: '삼송 / 에스티 / 일주GNS' },
        ],
    },
};
