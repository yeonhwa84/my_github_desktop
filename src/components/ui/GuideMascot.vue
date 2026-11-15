<script setup>
// 안내 마스코트(모찌 친구).
//  - 모바일: 탭(라우트)이 바뀌면 말풍선 문구 전환
//  - PC: 한 페이지 스크롤이라, 보이는 섹션(IntersectionObserver)에 맞춰 전환
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useDevice } from '@/composables/useDevice';

const { isMobile } = useDevice();
const route = useRoute();
const open = ref(true);
const pop = ref(false);

// 섹션별 표정 [눈, 입]
const EXPR = {
    home:       ['arc', 'smile'],
    about:      ['wink', 'smile'],
    skills:     ['star', 'grin'],
    projects:   ['wide', 'o'],
    work:       ['wide', 'o'],
    experience: ['arc', 'cat'],
    stance:     ['dot', 'flat'],
    contact:    ['arc', 'grin'],
};

const lines = {
    home:       '안녕! 둘러보는 걸 도와줄 모찌야. 천천히 구경해 봐!',
    about:      '여긴 소개 영역! 어떤 사람인지 알려줄게.',
    skills:     '기술 스택이야. 막대가 길수록 더 자신 있는 거야!',
    projects:   '프로젝트들이야. 카드를 누르면 자세히 볼 수 있어.',
    work:       '프로젝트들이야. 카드를 누르면 자세히 볼 수 있어.',
    experience: '경력 타임라인이야. 어떤 일을 해왔는지 볼 수 있어.',
    stance:     '일할 때 중요하게 생각하는 가치들이야.',
    contact:    '연락은 여기서! 편하게 말 걸어줘.',
};
const current = ref('home');
const msg = ref(lines.home);
const eye = computed(() => (EXPR[current.value] || EXPR.home)[0]);
const mouth = computed(() => (EXPR[current.value] || EXPR.home)[1]);

function setMsg(id) {
    if (!id || id === current.value) return;
    current.value = id;
    msg.value = lines[id] || '천천히 둘러봐!';
    open.value = true;
    pop.value = false;
    requestAnimationFrame(() => { pop.value = true; });
}

// 모바일: 라우트(탭) 기준
watch(() => route.name, (n) => { if (isMobile.value) setMsg(n); });

// PC: 보이는 섹션 기준
let io = null;
function connectObserver() {
    disconnectObserver();
    const secs = document.querySelectorAll('section[id]');
    if (!secs.length) return;
    io = new IntersectionObserver(
        (entries) => {
            const vis = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (vis) setMsg(vis.target.id);
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    secs.forEach((s) => io.observe(s));
}
function disconnectObserver() { if (io) { io.disconnect(); io = null; } }

function setup() {
    if (isMobile.value) {
        disconnectObserver();
        setMsg(route.name || 'home');
    } else {
        setTimeout(connectObserver, 150); // 섹션 DOM 렌더 후 관찰
    }
}

onMounted(setup);
watch(isMobile, setup);
onBeforeUnmount(disconnectObserver);

function toggle() { open.value = !open.value; }
</script>

<template>
    <div class="guide" :class="{ mobile: isMobile }">
        <transition name="bubble">
            <div v-if="open" class="bubble" :class="{ pop }">
                <span>{{ msg }}</span>
                <button class="close" @click.stop="open = false" aria-label="말풍선 닫기">×</button>
            </div>
        </transition>
        <button class="mochi" @click="toggle" :aria-expanded="open" aria-label="안내 친구 모찌">
            <svg class="face" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                    <linearGradient id="mochiG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#C4D6FA" />
                        <stop offset="1" stop-color="#E9F0FE" />
                    </linearGradient>
                </defs>
                <!-- AI 안테나 -->
                <line x1="50" y1="20" x2="50" y2="9" stroke="#7B61FF" stroke-width="3" stroke-linecap="round" />
                <circle class="antenna-tip" cx="50" cy="7" r="3.6" fill="#7B61FF" />
                <!-- 몸통(모찌) -->
                <rect x="15" y="18" width="70" height="66" rx="33" ry="31" fill="url(#mochiG)" stroke="#AEC6F6" stroke-width="2" />
                <!-- 볼터치 -->
                <circle cx="30" cy="62" r="6" fill="#2f6bed" opacity="0.14" />
                <circle cx="70" cy="62" r="6" fill="#2f6bed" opacity="0.14" />

                <!-- 눈 -->
                <g v-if="eye === 'dot'">
                    <circle cx="38" cy="50" r="4.5" fill="#16233b" />
                    <circle cx="62" cy="50" r="4.5" fill="#16233b" />
                </g>
                <g v-else-if="eye === 'arc'">
                    <path d="M33 52 Q38 45 43 52" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M57 52 Q62 45 67 52" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                </g>
                <g v-else-if="eye === 'wink'">
                    <path d="M33 50 Q38 44 43 50" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                    <circle cx="62" cy="50" r="4.5" fill="#16233b" />
                </g>
                <g v-else-if="eye === 'star'">
                    <path d="M38 44 L39.6 48.4 L44 50 L39.6 51.6 L38 56 L36.4 51.6 L32 50 L36.4 48.4 Z" fill="#16233b" />
                    <path d="M62 44 L63.6 48.4 L68 50 L63.6 51.6 L62 56 L60.4 51.6 L56 50 L60.4 48.4 Z" fill="#16233b" />
                </g>
                <g v-else>
                    <circle cx="38" cy="50" r="6" fill="#fff" stroke="#16233b" stroke-width="2" />
                    <circle cx="39" cy="51" r="3" fill="#16233b" />
                    <circle cx="62" cy="50" r="6" fill="#fff" stroke="#16233b" stroke-width="2" />
                    <circle cx="63" cy="51" r="3" fill="#16233b" />
                </g>

                <!-- 입 -->
                <path v-if="mouth === 'smile'" d="M44 64 Q50 69 56 64" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                <path v-else-if="mouth === 'grin'" d="M43 63 Q50 73 57 63 Z" fill="#16233b" />
                <circle v-else-if="mouth === 'o'" cx="50" cy="66" r="4" fill="none" stroke="#16233b" stroke-width="3" />
                <line v-else-if="mouth === 'flat'" x1="45" y1="66" x2="55" y2="66" stroke="#16233b" stroke-width="3" stroke-linecap="round" />
                <path v-else d="M43 64 Q46.5 68 50 64 Q53.5 68 57 64" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                <!-- AI 스파클 -->
                <path class="spark s1" d="M80 27 l1.3 3.4 3.4 1.3 -3.4 1.3 -1.3 3.4 -1.3 -3.4 -3.4 -1.3 3.4 -1.3 Z" fill="#22B8CF" />
                <path class="spark s2" d="M19 35 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 Z" fill="#7B61FF" />
            </svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mobile' as *;

.guide {
    position: fixed;
    right: 20px;
    bottom: 24px;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    pointer-events: none; // 틈새는 통과, 요소만 클릭
}

// 모바일: 바텀 탭바 위로
.guide.mobile {
    right: 14px;
    bottom: calc(#{$mc-tabbar-h} + env(safe-area-inset-bottom, 0px) + 14px);
}

.mochi,
.bubble { pointer-events: auto; }

// === 모찌 캐릭터 버튼 (인라인 SVG) ===
.mochi {
    width: 72px;
    height: 72px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    filter: drop-shadow(0 6px 14px rgba(20, 32, 56, 0.18));
    animation: bob 3.2s $mc-ease infinite;
    transition: transform 0.18s $mc-ease;

    .face { width: 100%; height: 100%; display: block; }

    &:active { transform: scale(0.92); }
}

@keyframes bob {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50%      { transform: translateY(-5px) rotate(2deg); }
}

// AI 안테나 글로우 + 생성 스파클
.antenna-tip {
    filter: drop-shadow(0 0 3px #7b61ff);
    animation: tip 1.6s $mc-ease infinite;
}
.spark {
    transform-box: fill-box;
    transform-origin: center;
    animation: tw 2.2s $mc-ease infinite;
}
.spark.s2 { animation-delay: 1.1s; }
@keyframes tip { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes tw {
    0%, 100% { opacity: 0.25; transform: scale(0.6); }
    50%      { opacity: 1; transform: scale(1); }
}

// === 말풍선 ===
.bubble {
    position: relative;
    max-width: 230px;
    background: $mc-surface;
    color: $mc-ink-2;
    font-family: $mc-font-sans;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 500;
    padding: 12px 30px 12px 14px;
    border: 1px solid $mc-border-soft;
    border-radius: 18px 18px 6px 18px; // 오른쪽 아래가 뾰족 (모찌를 가리킴)
    box-shadow: $mc-shadow-md;

    // 꼬리
    &::after {
        content: '';
        position: absolute;
        right: 18px;
        bottom: -7px;
        width: 14px;
        height: 14px;
        background: $mc-surface;
        border-right: 1px solid $mc-border-soft;
        border-bottom: 1px solid $mc-border-soft;
        transform: rotate(45deg);
    }

    &.pop { animation: pop 0.34s $mc-ease; }
}

.close {
    position: absolute;
    top: 6px;
    right: 8px;
    width: 18px;
    height: 18px;
    line-height: 1;
    border: none;
    background: transparent;
    color: $mc-ink-4;
    font-size: 16px;
    cursor: pointer;
}

@keyframes pop {
    0%   { transform: translateY(6px) scale(0.92); opacity: 0; }
    60%  { transform: translateY(-2px) scale(1.03); }
    100% { transform: translateY(0) scale(1); opacity: 1; }
}

// 등장/퇴장 트랜지션
.bubble-enter-active,
.bubble-leave-active { transition: opacity 0.2s $mc-ease, transform 0.2s $mc-ease; }
.bubble-enter-from,
.bubble-leave-to { opacity: 0; transform: translateY(6px) scale(0.95); }

@media (prefers-reduced-motion: reduce) {
    .mochi { animation: none; }
    .bubble.pop { animation: none; }
    .antenna-tip { animation: none; }
    .spark { animation: none; opacity: 0.85; transform: scale(1); }
}
</style>
