<script setup>
// =========================================================
// WorkerScene — "일꾼들이 왔다 갔다" 작업장 애니메이션 띠
//  - 안전모 쓴 꼬마 일꾼 모찌들이 박스를 들고 좌우로 왕복 (부지런한 연출)
//  - 현재 프로젝트 상태 티커 + 쉼 없이 도는 빌드 진행바
// 데이터: profile.nowLeading (읽기 전용)
// =========================================================
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { profile } from '@/data/profile';

const n = profile.nowLeading;

// 현재 상태 티커 라인 (실제 데이터)
const ticker = [
    `📍 ${n.company} · ${n.location}`,
    `🧭 ${n.role}`,
    `🗓 ${n.period}`,
    `🛠 ${n.scope}`,
];
// 빌드 상태 라벨 (장식 — 쉼 없이 일하는 느낌)
const phases = ['분석 중…', '설계 중…', '컴파일 중…', '테스트 중…', '배포 중…'];

const ti = ref(0);
const pi = ref(0);
let timer = null;

onMounted(() => {
    timer = setInterval(() => {
        ti.value = (ti.value + 1) % ticker.length;
        pi.value = (pi.value + 1) % phases.length;
    }, 2400);
});
onBeforeUnmount(() => clearInterval(timer));

// 일꾼들 (안전모색 / 몸색 / 든 물건 / 속도 / 지연 / 깊이 스케일)
const workers = [
    { hat: '#35c6dd', body: '#C9DBFF', item: '</>', dur: 7.5, delay: 0,    s: 1.0,  b: 8 },
    { hat: '#9b86ff', body: '#AEC6F6', item: '⚙',   dur: 9,   delay: -3,   s: 0.82, b: 14 },
    { hat: '#5be0f2', body: '#9FC0FF', item: '▤',   dur: 6.4, delay: -1.6, s: 1.05, b: 5 },
    { hat: '#ffd36e', body: '#C9DBFF', item: '✦',   dur: 8.2, delay: -4.5, s: 0.9,  b: 11 },
];
</script>

<template>
    <div class="scene" aria-hidden="true">
        <!-- 좌: 작업중 배지 + 빌드 진행바 -->
        <div class="status">
            <span class="badge"><i class="pulse" />WORKING</span>
            <span class="phase">{{ phases[pi] }}</span>
            <span class="bar"><i /></span>
        </div>

        <!-- 중앙: 왔다 갔다 하는 일꾼들 -->
        <div class="floor">
            <div
                v-for="(w, i) in workers"
                :key="i"
                class="worker"
                :style="{
                    '--dur': w.dur + 's',
                    '--delay': w.delay + 's',
                    '--s': w.s,
                    bottom: w.b + 'px',
                }"
            >
                <div class="fig">
                    <svg viewBox="0 0 40 46" width="30">
                        <!-- 다리 -->
                        <rect class="leg l1" x="14" y="35" width="4" height="9" rx="2" :fill="w.body" stroke="#2b3b52" stroke-width="0.8" />
                        <rect class="leg l2" x="22" y="35" width="4" height="9" rx="2" :fill="w.body" stroke="#2b3b52" stroke-width="0.8" />
                        <!-- 몸통(모찌) -->
                        <rect x="9" y="13" width="22" height="24" rx="11" :fill="w.body" stroke="#6E8FD6" stroke-width="1.2" />
                        <!-- 눈/입 -->
                        <circle cx="16" cy="24" r="1.6" fill="#16233b" />
                        <circle cx="24" cy="24" r="1.6" fill="#16233b" />
                        <path d="M17 28 Q20 31 23 28" stroke="#16233b" stroke-width="1.4" fill="none" stroke-linecap="round" />
                        <!-- 안전모 -->
                        <path d="M11 14 A9 9 0 0 1 29 14 Z" :fill="w.hat" />
                        <rect x="8" y="13" width="24" height="3" rx="1.5" :fill="w.hat" />
                        <rect x="19" y="5" width="2" height="4" rx="1" :fill="w.hat" />
                        <!-- 든 물건(박스) -->
                        <g class="carry">
                            <rect x="28" y="26" width="13" height="11" rx="2" fill="#0e1a30" :stroke="w.hat" stroke-width="1" />
                            <text x="34.5" y="34" text-anchor="middle" font-size="6" :fill="w.hat" font-family="monospace">{{ w.item }}</text>
                        </g>
                        <!-- 팔 -->
                        <path d="M28 27 L31 24" :stroke="w.body" stroke-width="2.4" stroke-linecap="round" />
                    </svg>
                </div>
            </div>

            <!-- 중앙 작업대 (기어 회전) -->
            <div class="bench">
                <svg viewBox="0 0 28 28" width="22">
                    <g class="gear">
                        <path d="M14 3 l2 0 1 3 3 1 2-2 2 2-2 2 1 3 3 1 0 2-3 0-1 3 2 2-2 2-2-2-3 1-1 3-2 0-1-3-3-1-2 2-2-2 2-2-1-3-3-1 0-2 3 0 1-3-2-2 2-2 2 2 3-1 1-3z"
                            fill="#2f6bed" opacity="0.9" />
                        <circle cx="14" cy="14" r="3.4" fill="#0e1a30" />
                    </g>
                </svg>
            </div>
        </div>

        <!-- 우: 현재 상태 티커 -->
        <div class="ticker">
            <transition name="tk" mode="out-in">
                <span :key="ti" class="line">{{ ticker[ti] }}</span>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$line:   rgba(120, 150, 210, 0.18);
$dim:    #7d90b4;
$cyan:   #35c6dd;

.scene {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 72px;
    padding: 0 14px;
    border-bottom: 1px solid $line;
    background:
        repeating-linear-gradient(90deg, transparent 0 22px, rgba(120, 150, 210, 0.04) 22px 23px),
        linear-gradient(180deg, rgba(7, 14, 27, 0.35), rgba(47, 107, 237, 0.06));
    overflow: hidden;
    font-family: 'JetBrains Mono', 'SF Mono', monospace;
}

// 좌: 작업중 배지
.status { flex: none; display: flex; flex-direction: column; gap: 4px; width: 118px; }
.badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10.5px; font-weight: 800; letter-spacing: 0.1em; color: #bdf0f9;
}
.pulse {
    width: 7px; height: 7px; border-radius: 50%; background: #35e0a0;
    box-shadow: 0 0 0 0 rgba(53, 224, 160, 0.6); animation: pulse 1.5s ease-out infinite;
}
.phase { font-size: 10px; color: $dim; }
.bar {
    position: relative; height: 4px; border-radius: 3px; overflow: hidden;
    background: rgba(120, 150, 210, 0.16);
    i {
        position: absolute; inset: 0; width: 40%; border-radius: 3px;
        background: linear-gradient(90deg, #2f6bed, #35c6dd);
        animation: load 1.8s ease-in-out infinite;
    }
}

// 중앙: 일꾼 바닥
.floor {
    position: relative; flex: 1; height: 100%;
    border-bottom: 2px solid rgba(120, 150, 210, 0.25);
    min-width: 120px;
}
.worker {
    position: absolute; left: 2%;
    transform-origin: center bottom;
    animation: walk var(--dur) ease-in-out var(--delay) infinite;
    will-change: left, transform;
    .fig { animation: bob 0.5s ease-in-out infinite; transform: scale(var(--s)); transform-origin: center bottom; }
    svg { display: block; filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3)); }
}
.leg { transform-origin: 50% 0%; }
.l1 { animation: swing 0.5s ease-in-out infinite; }
.l2 { animation: swing 0.5s ease-in-out infinite reverse; }

.bench { position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); }
.gear { transform-origin: 14px 14px; animation: spin 3.5s linear infinite; }

// 우: 티커
.ticker {
    flex: none; width: 190px; overflow: hidden;
    .line { font-size: 11px; color: #c7d6f2; white-space: nowrap; display: inline-block; }
}
.tk-enter-active, .tk-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.tk-enter-from { opacity: 0; transform: translateY(6px); }
.tk-leave-to { opacity: 0; transform: translateY(-6px); }

// 왔다 갔다(좌우 왕복 + 방향 전환)
@keyframes walk {
    0%   { left: 2%;  transform: scaleX(1); }
    47%  { left: 82%; transform: scaleX(1); }
    50%  { left: 82%; transform: scaleX(-1); }
    97%  { left: 2%;  transform: scaleX(-1); }
    100% { left: 2%;  transform: scaleX(1); }
}
@keyframes bob { 0%, 100% { transform: scale(var(--s)) translateY(0); } 50% { transform: scale(var(--s)) translateY(-2px); } }
@keyframes swing { 0%, 100% { transform: rotate(16deg); } 50% { transform: rotate(-16deg); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes load { 0% { left: -40%; } 100% { left: 100%; } }
@keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(53, 224, 160, 0.55); }
    70%  { box-shadow: 0 0 0 7px rgba(53, 224, 160, 0); }
    100% { box-shadow: 0 0 0 0 rgba(53, 224, 160, 0); }
}

@media (max-width: 640px) {
    .scene { gap: 8px; padding: 0 10px; height: 66px; }
    .status { width: 96px; }
    .ticker { width: 118px; .line { font-size: 10px; } }
    // 좁은 화면에선 느린 일꾼 2명 숨겨 혼잡 완화
    .worker:nth-child(n + 3) { display: none; }
}

@media (prefers-reduced-motion: reduce) {
    .worker { animation: none; left: 20%; }
    .worker:nth-child(2) { left: 50%; }
    .worker:nth-child(3) { left: 75%; }
    .fig, .leg, .gear, .bar i, .pulse { animation: none !important; }
}
</style>
