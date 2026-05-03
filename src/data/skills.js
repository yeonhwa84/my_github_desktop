// =========================================================
// Skills — Detailed Matrix
// 각 스킬: name, years (실 사용 연차), level (1~5), context (실제 사용 컨텍스트)
// current: true → "NOW" 뱃지 표시
// =========================================================

export const skillCategories = [
    {
        id: 'lead',
        kicker: '01',
        title: 'Lead & Architecture',
        meta: 'PL · 시스템 설계 · 분석',
        icon: 'fa-compass-drafting',
        accent: 'coral',
        summary: 'PL로 합류하든 정규직으로 합류하든, 시스템 전체 설계와 분석을 끌고 가는 게 본업입니다.',
        skills: [
            { name: 'PL (Project Leader)',  years: 1,  level: 5, current: true, context: '한국청소년복지개발원 (부산, 1년+ 진행 중)' },
            { name: 'Architecture Design',  years: 17, level: 5,                context: '17년간 SI/공공/대기업 시스템 설계 주도' },
            { name: 'System Analysis',      years: 17, level: 5,                context: '요구사항 → 도메인 모델링 → 명세서까지' },
            { name: 'DB Modeling',          years: 17, level: 5,                context: 'Oracle / PostgreSQL / S/4 HANA 풀사이클' },
            { name: '운영 안정화',           years: 17, level: 5,                context: '대용량 트랜잭션·쿼리 튜닝, 장애 대응' },
            { name: '레거시 전환 설계',       years: 10, level: 5,                context: 'GQIS 웹전환 / S/4 HANA / LIMS 고도화' },
        ],
    },
    {
        id: 'backend',
        kicker: '02',
        title: 'Backend Engineering',
        meta: 'Server-side core stack',
        icon: 'fa-server',
        accent: 'sage',
        summary: 'Java + Spring을 메인으로, 공공·대기업 SI 환경에서 검증된 서버 스택.',
        skills: [
            { name: 'Java',                 years: 17, level: 5, context: 'JDK 6 → 17, 17년 메인 백엔드' },
            { name: 'Spring / Spring Boot', years: 14, level: 5, context: 'MVC, JPA, MyBatis, RESTful API' },
            { name: '전자정부프레임워크',      years: 10, level: 5, context: '공공 SI · 한국전기연구원 LIMS · GQIS' },
            { name: 'JSP / Servlet',        years: 15, level: 4, context: '레거시 운영 + 신규 개발' },
            { name: 'PowerBuilder',         years: 4,  level: 4, context: '성동조선해양 자재/회계 (4년)' },
        ],
    },
    {
        id: 'database',
        kicker: '03',
        title: 'Database',
        meta: 'Modeling · Tuning · Migration',
        icon: 'fa-database',
        accent: 'butter',
        summary: '17년간 DB는 항상 메인 도구. 모델링부터 마이그레이션까지 풀사이클.',
        skills: [
            { name: 'Oracle',                years: 17, level: 5, context: '17년 메인 RDB, 모델링·튜닝·운영' },
            { name: 'Query Optimization',    years: 17, level: 5, context: '대용량 쿼리·인덱스·실행계획 분석' },
            { name: 'Data Migration',        years: 10, level: 5, context: 'GQIS / S/4 HANA / LIMS 다수' },
            { name: 'PostgreSQL',            years: 5,  level: 4, context: '두산 풍력 / 가온소프트 신규 시스템' },
            { name: 'SAP S/4 HANA',          years: 1,  level: 3, context: '한화오션 전환 프로젝트' },
        ],
    },
    {
        id: 'frontend',
        kicker: '04',
        title: 'Frontend',
        meta: 'Responsive · Web App · jQuery-centric',
        icon: 'fa-code',
        accent: 'lilac',
        summary: 'SI 현장에서 직접 손으로 다뤄온 프론트 스택. 제이쿼리 12년이 그 중심. (React·Vue 등 SPA 프레임워크는 미사용 / Vue 3는 학습 단계)',
        skills: [
            { name: 'jQuery',               years: 12, level: 5, context: '대다수 SI 프로젝트의 핸즈온 기반 — 본인의 메인 프론트 도구' },
            { name: 'JavaScript',           years: 15, level: 4, context: 'ES5 → ES6+ 전반' },
            { name: '웹스퀘어 5',            years: 8,  level: 5, context: '두산에너빌리티 / 가온소프트 — UI 프레임워크 운용' },
            { name: 'HTML5 / CSS3',         years: 15, level: 4, context: '반응형·모바일웹 / 디자인 협업' },
            { name: 'paramQuery',           years: 4,  level: 4, context: '삼송 ERP UI 그리드 — 직접 구현' },
        ],
    },
    {
        id: 'platform',
        kicker: '05',
        title: 'Platform & Search',
        meta: 'PL 관점의 솔루션 운영 경험',
        icon: 'fa-magnifying-glass',
        accent: 'rose',
        summary: '직접 코딩보다는 PL 관점에서 도입·운영·통합을 끌고 가는 솔루션들. 제이쿼리·EMRO 같은 핸즈온 경험이 그 토대.',
        skills: [
            { name: 'EMRO',                 years: 1,  level: 4, context: '현대위아 GQIS SCM 통합 — 핸즈온 경험' },
            { name: 'eXBuild (PL 관점)',    years: 1,  level: 3, current: true, context: '한국청소년복지개발원 — 도입·운영 리딩' },
            { name: 'Wisenut Search',       years: 1,  level: 3, current: true, context: '검색엔진 도입·통합 — PL 시점' },
            { name: '시스템 통합 (EAI)',     years: 12, level: 5, context: '레거시 ↔ 신규 연동 다수 — 직접 구현' },
        ],
    },
    {
        id: 'domain',
        kicker: '06',
        title: 'Domain & Process',
        meta: '도메인 노하우',
        icon: 'fa-industry',
        accent: 'mint',
        summary: '코드만이 아니라 산업 도메인 언어를 함께 한다는 게 17년의 자산.',
        skills: [
            { name: '발전·에너지',            years: 4,  level: 5, context: '원자력(두산에너빌리티) / 풍력 / 부산시청 모니터링' },
            { name: '조선·중공업',            years: 5,  level: 5, context: 'STX 엔진·파이프 / 한화오션 / 성동조선해양' },
            { name: '공공·복지 SI',          years: 5,  level: 5, context: '한국청소년복지개발원 / 한국전기연구원 / 지질연' },
            { name: 'ERP / MES / LIMS',     years: 8,  level: 5, context: '삼송 / 일주GNS / 에스티 / LIMS 3년' },
            { name: '자동차 부품',            years: 1,  level: 4, context: '현대위아 GQIS' },
        ],
    },
];

// 호환용 — 단순 카드 형태 데이터 (기존 StackCard 사용 시)
export const skills = skillCategories.map((c) => ({
    id: c.id,
    title: c.title,
    meta: c.meta,
    icon: c.icon,
    accent: c.accent,
    primary:   c.skills.slice(0, 2).map((s) => s.name),
    secondary: c.skills.slice(2).map((s) => s.name),
}));

// 마퀴 스트립용 키워드 (trendy scrolling band)
export const skillKeywords = [
    'Java', 'Spring Boot', 'Oracle', 'PostgreSQL', 'JSP', '전자정부프레임워크',
    'eXBuild', 'Wisenut Search', 'PL', 'Architecture Design', 'DB Modeling',
    '시스템 분석', '운영 안정화', '데이터 마이그레이션', '웹스퀘어 5', 'jQuery',
    'EMRO', 'SAP S/4 HANA', 'PowerBuilder', 'LIMS', 'ERP', 'MES',
];
