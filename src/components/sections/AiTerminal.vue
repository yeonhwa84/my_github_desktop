<script setup>
// =========================================================
// AiTerminal — 모찌(mochi) AI 어시스턴트 챗/터미널
// 사이트 전체를 하나의 대화형 터미널로 재구성(옵션 3).
//  - 칩을 누르거나 직접 입력 → 모찌가 데이터로 답변을 "스트리밍"
//  - 표정은 주제에 따라 바뀜 (AI 느낌)
//  - 겨울/AI 다크 팔레트 + 모노 터미널 미학, PC·모바일 반응형
// 데이터: profile.js / skills.js / projects.js / experience.js
// =========================================================
import { reactive, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { profile } from '@/data/profile';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';
import { experienceRecent } from '@/data/experience';
import WorkerScene from '@/components/sections/WorkerScene.vue';
import { faq } from '@/data/faq';
import { INBOX_URL } from '@/data/inbox';

const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();

// === 주제별 표정 [눈, 입] ===
const EXPR = {
    greet:      ['arc', 'smile'],
    now:        ['star', 'grin'],
    about:      ['wink', 'smile'],
    skills:     ['star', 'grin'],
    projects:   ['wide', 'o'],
    experience: ['arc', 'cat'],
    stance:     ['dot', 'flat'],
    contact:    ['arc', 'grin'],
    help:       ['arc', 'smile'],
};

// === 답변 빌더 (각 주제 → 블록 배열) ===
const ANSWERS = {
    greet: () => [
        { k: 'h', v: '안녕하세요! 저는 모찌예요 ✦ 이연화(Yeonhwa Lee)님의 AI 포트폴리오 어시스턴트입니다.' },
        { k: 'p', v: '17년차 풀스택 개발자 · 현재 PL. 궁금한 걸 아래에서 고르거나 직접 입력해 보세요.' },
        { k: 'note', v: '사용 가능: now · about · skills · projects · experience · stance · contact' },
    ],
    now: () => [
        { k: 'h', v: '지금 이렇게 일하고 있어요 👩‍💻' },
        { k: 'kv', key: '소속', v: `${profile.nowLeading.company} · ${profile.nowLeading.location}` },
        { k: 'kv', key: '역할', v: profile.nowLeading.role },
        { k: 'kv', key: '기간', v: profile.nowLeading.period },
        { k: 'kv', key: '범위', v: profile.nowLeading.scope },
        { k: 'item', title: '진행 중인 일', meta: profile.nowLeading.kicker, desc: profile.nowLeading.note, tags: profile.nowLeading.stack },
        { k: 'note', v: '매일 조금씩, 끝까지 — 부지런히 가고 있어요. (위 작업장에서 일꾼들이 쉬지 않아요 ✦)' },
    ],
    about: () => [
        { k: 'p', v: strip(profile.about.lead) },
        { k: 'kv', key: 'NOW', v: `${profile.nowLeading.company} · ${profile.nowLeading.role} (${profile.nowLeading.period})` },
        { k: 'kv', key: '경력', v: `${profile.yearsOfExperience}년+ · 발전 · 중공업 · 공공 SI 풀스택` },
        ...profile.about.stats.map((s) => ({ k: 'kv', key: s.label, v: `${s.value}${s.suffix} — ${s.desc}` })),
        { k: 'note', v: `"${strip(profile.about.quote)}"` },
    ],
    skills: () => [
        { k: 'p', v: 'Java · Spring 백엔드와 DB를 메인으로, PL 관점의 설계·분석까지. 카테고리별 핵심 스택이에요.' },
        ...skillCategories.map((c) => ({
            k: 'item',
            title: `${c.kicker}. ${c.title}`,
            meta: c.meta,
            desc: c.skills.slice(0, 3).map((s) => `${s.name} (${s.years}y)`).join(' · '),
        })),
    ],
    projects: () => [
        { k: 'p', v: '실무 SI와 최근 개인 실습·사이드 프로젝트예요. 링크로 결과물을 바로 볼 수 있어요.' },
        ...projects.map((p) => ({
            k: 'item',
            title: `${p.num}. ${p.title}`,
            meta: `${p.sector} · ${p.period}`,
            desc: p.description,
            tags: p.stack,
            link: p.link,
            label: p.linkLabel,
        })),
    ],
    experience: () => [
        { k: 'p', v: '2003년 학교 행정실에서 PL까지 — 최근 이력입니다.' },
        ...experienceRecent.map((e) => ({
            k: 'item',
            title: e.company,
            meta: `${e.role} · ${e.period}`,
            desc: `${e.project} — ${e.description}`,
            tags: e.tags,
        })),
    ],
    stance: () => [
        { k: 'h', v: 'AI writes code faster. Humans still own the consequences.' },
        { k: 'p', v: strip(profile.stance.lead) },
        ...profile.stance.principles.map((pr) => ({
            k: 'item',
            title: `${pr.num} ${pr.title}`,
            meta: pr.kicker,
            desc: pr.desc,
        })),
    ],
    contact: () => [
        { k: 'kv', key: 'Email', v: profile.email, href: `mailto:${profile.email}` },
        { k: 'kv', key: 'GitHub', v: 'github.com/yeonhwa84', href: 'https://github.com/yeonhwa84' },
        { k: 'kv', key: 'LinkedIn', v: profile.linkedin, href: `https://${profile.linkedin}` },
        { k: 'p', v: '프리랜서 · 정규직 어떤 형태든 편하게 연락 주세요!' },
    ],
    help: () => [
        { k: 'p', v: '이렇게 물어볼 수 있어요:' },
        { k: 'kv', key: 'about', v: '어떤 사람인지 · 현재 하는 일' },
        { k: 'kv', key: 'skills', v: '기술 스택 · 전문 영역' },
        { k: 'kv', key: 'projects', v: '프로젝트 · 실습 (링크 포함)' },
        { k: 'kv', key: 'experience', v: '경력 타임라인' },
        { k: 'kv', key: 'stance', v: 'AI 시대에 일하는 관점' },
        { k: 'kv', key: 'contact', v: '연락처' },
    ],
};

const CHIPS = [
    { id: 'now', label: 'now' },
    { id: 'about', label: 'about' },
    { id: 'skills', label: 'skills' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'stance', label: 'stance' },
    { id: 'contact', label: 'contact' },
];

// 입력 텍스트 → 주제 매칭
function resolveTopic(text) {
    const t = text.toLowerCase();
    if (/현재|지금|now|작업\s*중|상태|근황/.test(t)) return 'now';
    if (/소개|about|누구|프로필|profile/.test(t)) return 'about';
    if (/기술|스킬|skill|스택|stack/.test(t)) return 'skills';
    if (/프로젝트|project|포폴|포트폴리오|작업|work/.test(t)) return 'projects';
    if (/경력|이력|experience|career|타임라인/.test(t)) return 'experience';
    if (/가치|철학|관점|생각|stance|ai|에이아이/.test(t)) return 'stance';
    if (/연락|contact|이메일|email|메일|깃|git|링크드인|linkedin/.test(t)) return 'contact';
    if (/도움|help|명령|\?/.test(t)) return 'help';
    return null;
}

// === 대화 상태 ===
const messages = reactive([]); // {from, topic?, text?, blocks?, shown, done}
const activeTopic = ref('greet');
const busy = ref(false);
const input = ref('');
const logEl = ref(null);
const pendingQ = ref('');   // 봇이 모르던 질문(남기기 대기)
const sending = ref(false);

const eye = computed(() => (EXPR[activeTopic.value] || EXPR.greet)[0]);
const mouth = computed(() => (EXPR[activeTopic.value] || EXPR.greet)[1]);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function scrollEnd() {
    await nextTick();
    if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight;
}

async function streamBlocks(topic, blocks) {
    activeTopic.value = topic;
    const msg = reactive({ from: 'mochi', topic, blocks, shown: 0, done: false });
    messages.push(msg);
    await scrollEnd();
    for (let i = 0; i < blocks.length; i++) {
        await delay(i === 0 ? 260 : 130);
        msg.shown = i + 1;
        await scrollEnd();
    }
    msg.done = true;
}

async function reply(topic) {
    await streamBlocks(topic, (ANSWERS[topic] || ANSWERS.help)());
}

// 방문자 질문 → FAQ(이연화님이 적어둔 답) 매칭
function matchFaq(text) {
    const t = text.toLowerCase();
    return faq.find((f) => (f.keywords || []).some((k) => t.includes(String(k).toLowerCase())));
}

async function answerFaq(text, entry) {
    if (busy.value) return;
    busy.value = true;
    messages.push({ from: 'user', text });
    await scrollEnd();
    await delay(180);
    const ans = typeof entry.a === 'function' ? entry.a() : entry.a; // 함수면 호출(나이 등 동적 답변)
    const body = typeof ans === 'string' ? [{ k: 'p', v: ans }] : ans;
    await streamBlocks('about', [{ k: 'h', v: entry.q || '답변' }, ...body]);
    busy.value = false;
}

// 못 받은 질문 → 남기기 제안
async function leaveQuestion(text) {
    if (busy.value) return;
    busy.value = true;
    pendingQ.value = text;
    messages.push({ from: 'user', text });
    await scrollEnd();
    await delay(180);
    await streamBlocks('help', [
        { k: 'p', v: '음… 아직 제가 답변을 준비 못 한 질문이에요.' },
        ...(INBOX_URL
            ? [{ k: 'note', v: "아래 '📩 이 질문 남기기'를 누르면 이연화님께 전달돼요. 답이 준비되면 여기서 답해줄게요!" }]
            : [{ k: 'note', v: '아래에서 다른 주제를 골라볼 수도 있어요.' }]),
    ]);
    busy.value = false;
}

// Formspree 전송
async function sendQuestion(q) {
    if (!INBOX_URL) return false;
    try {
        const res = await fetch(INBOX_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ message: q, page: location.href, _subject: '[포트폴리오] 새 질문' }),
        });
        return res.ok;
    } catch (e) {
        return false;
    }
}

async function submitQuestion() {
    if (!pendingQ.value || sending.value) return;
    sending.value = true;
    const q = pendingQ.value;
    const ok = await sendQuestion(q);
    sending.value = false;
    pendingQ.value = '';
    if (ok) {
        await streamBlocks('contact', [
            { k: 'h', v: '고마워요! 질문을 잘 전달했어요 ✦' },
            { k: 'p', v: `"${q}" — 답이 준비되면 이 터미널에서 바로 답할 수 있게 반영해 둘게요.` },
        ]);
    } else {
        await streamBlocks('help', [
            { k: 'p', v: '앗, 전송에 실패했어요. 잠시 후 다시 시도하거나 contact로 직접 연락 주세요!' },
        ]);
    }
}

async function run(topic, echo) {
    if (busy.value) return;
    busy.value = true;
    pendingQ.value = '';
    messages.push({ from: 'user', text: echo || topic });
    await scrollEnd();
    await delay(180);
    await reply(topic);
    busy.value = false;
}

function submit() {
    const text = input.value.trim();
    if (!text || busy.value) return;
    input.value = '';
    pendingQ.value = '';
    const topic = resolveTopic(text);
    if (topic) { run(topic, text); return; }
    const hit = matchFaq(text);
    if (hit) { answerFaq(text, hit); return; }
    leaveQuestion(text);
}

function clearLog() {
    messages.splice(0, messages.length);
    activeTopic.value = 'greet';
    reply('greet');
}

// === 배경 FX: 은은한 눈 + 간간이 귀여운 이모지 이벤트 ===
const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function snowStyle(k) {
    const left = (k * 53) % 100;
    const size = 4 + (k % 4) * 2;        // 4~10px
    const dur = 9 + (k % 6) * 2.4;       // 9~21s
    const delay = -((k * 2.3) % 14);
    const op = 0.18 + (k % 3) * 0.12;
    return {
        left: `${left}%`, width: `${size}px`, height: `${size}px`,
        '--sdur': `${dur}s`, animationDelay: `${delay}s`, opacity: op,
    };
}

const EMOJIS = ['❄️', '✦', '⭐', '🧊', '💙', '🤖', '🫧', '🐧', '☃️', '💫', '🌟', '🩵'];
const fx = reactive([]);
let fxId = 0;
let fxTimer = null;

function spawnFx() {
    const id = ++fxId;
    const f = {
        id,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: 6 + Math.random() * 88,            // %
        size: 16 + Math.random() * 14,           // px
        dur: 5.5 + Math.random() * 3,            // s
        drift: (Math.random() * 2 - 1) * 46,     // px 좌우 흔들림
    };
    fx.push(f);
    setTimeout(() => {
        const i = fx.findIndex((x) => x.id === id);
        if (i !== -1) fx.splice(i, 1);
    }, f.dur * 1000 + 300);
    fxTimer = setTimeout(spawnFx, 12000 + Math.random() * 12000); // 12~24초마다
}

onMounted(() => {
    reply('greet');
    if (!reduceMotion) fxTimer = setTimeout(spawnFx, 4000);
});
onBeforeUnmount(() => clearTimeout(fxTimer));
</script>

<template>
    <div class="term">
        <!-- 은은하게 움직이는 배경(오로라 + 눈) -->
        <div class="bgfx" aria-hidden="true">
            <span class="aurora a1" />
            <span class="aurora a2" />
            <i v-for="k in 14" :key="'s' + k" class="snow" :style="snowStyle(k)" />
        </div>

        <div class="win">
            <!-- 터미널 헤더 -->
            <header class="bar">
                <span class="dots"><i class="r" /><i class="y" /><i class="g" /></span>
                <span class="path">mochi@yeonhwa : ~/portfolio</span>
                <button class="reset" @click="clearLog" title="처음으로">⟲</button>
            </header>

            <!-- 모찌 아바타 띠 -->
            <div class="hero">
                <button class="mochi" aria-label="모찌" @click="run('help', 'help')">
                    <svg class="face" viewBox="0 0 100 100" aria-hidden="true">
                        <defs>
                            <linearGradient id="mG" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stop-color="#9FC0FF" />
                                <stop offset="1" stop-color="#C9DBFF" />
                            </linearGradient>
                        </defs>
                        <line x1="50" y1="20" x2="50" y2="9" stroke="#7B61FF" stroke-width="3" stroke-linecap="round" />
                        <circle class="tip" cx="50" cy="7" r="3.6" fill="#7B61FF" />
                        <rect x="15" y="18" width="70" height="66" rx="33" ry="31" fill="url(#mG)" stroke="#6E8FD6" stroke-width="2" />
                        <circle cx="30" cy="62" r="6" fill="#2f6bed" opacity="0.18" />
                        <circle cx="70" cy="62" r="6" fill="#2f6bed" opacity="0.18" />
                        <!-- 눈 -->
                        <g v-if="eye === 'dot'">
                            <circle cx="38" cy="50" r="4.5" fill="#16233b" /><circle cx="62" cy="50" r="4.5" fill="#16233b" />
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
                            <circle cx="38" cy="50" r="6" fill="#fff" stroke="#16233b" stroke-width="2" /><circle cx="39" cy="51" r="3" fill="#16233b" />
                            <circle cx="62" cy="50" r="6" fill="#fff" stroke="#16233b" stroke-width="2" /><circle cx="63" cy="51" r="3" fill="#16233b" />
                        </g>
                        <!-- 입 -->
                        <path v-if="mouth === 'smile'" d="M44 64 Q50 69 56 64" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                        <path v-else-if="mouth === 'grin'" d="M43 63 Q50 73 57 63 Z" fill="#16233b" />
                        <circle v-else-if="mouth === 'o'" cx="50" cy="66" r="4" fill="none" stroke="#16233b" stroke-width="3" />
                        <line v-else-if="mouth === 'flat'" x1="45" y1="66" x2="55" y2="66" stroke="#16233b" stroke-width="3" stroke-linecap="round" />
                        <path v-else d="M43 64 Q46.5 68 50 64 Q53.5 68 57 64" stroke="#16233b" stroke-width="3" fill="none" stroke-linecap="round" />
                        <path class="spark s1" d="M80 27 l1.3 3.4 3.4 1.3 -3.4 1.3 -1.3 3.4 -1.3 -3.4 -3.4 -1.3 3.4 -1.3 Z" fill="#22B8CF" />
                        <path class="spark s2" d="M19 35 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1 Z" fill="#7B61FF" />
                    </svg>
                </button>
                <div class="hero-txt">
                    <strong>Yeonhwa&nbsp;Lee</strong>
                    <span>Senior Full-Stack Developer · PL — AI 어시스턴트 <em>mochi</em>가 안내해요</span>
                </div>
            </div>

            <!-- 작업장: 일꾼들이 왔다 갔다 + 현재 작업 현황 -->
            <WorkerScene />

            <!-- 대화 로그 -->
            <div class="log" ref="logEl">
                <template v-for="(m, mi) in messages" :key="mi">
                    <!-- 사용자 명령 -->
                    <div v-if="m.from === 'user'" class="row user">
                        <span class="prompt">visitor@web:~$</span>
                        <span class="cmd">{{ m.text }}</span>
                    </div>

                    <!-- 모찌 응답 -->
                    <div v-else class="row mochi-row">
                        <span class="who">✦ mochi</span>
                        <div class="ans">
                            <template v-for="(b, bi) in m.blocks" :key="bi">
                                <div v-if="bi < m.shown" class="blk" :class="b.k">
                                    <template v-if="b.k === 'h'"><span class="t-h">{{ b.v }}</span></template>
                                    <template v-else-if="b.k === 'p'"><span class="t-p">{{ b.v }}</span></template>
                                    <template v-else-if="b.k === 'note'"><span class="t-note"># {{ b.v }}</span></template>
                                    <template v-else-if="b.k === 'kv'">
                                        <span class="t-k">{{ b.key }}</span>
                                        <span class="t-sep">→</span>
                                        <a v-if="b.href" class="t-v link" :href="b.href" target="_blank" rel="noopener">{{ b.v }}</a>
                                        <span v-else class="t-v">{{ b.v }}</span>
                                    </template>
                                    <template v-else-if="b.k === 'item'">
                                        <div class="it-top">
                                            <span class="it-title">{{ b.title }}</span>
                                            <span class="it-meta">{{ b.meta }}</span>
                                        </div>
                                        <span class="it-desc">{{ b.desc }}</span>
                                        <div v-if="b.tags" class="it-tags">
                                            <span v-for="t in b.tags" :key="t" class="tag">{{ t }}</span>
                                        </div>
                                        <a v-if="b.link" class="it-link" :href="b.link" target="_blank" rel="noopener">{{ b.label || '보기' }} ↗</a>
                                    </template>
                                </div>
                            </template>
                            <span v-if="!m.done" class="cursor">▍</span>
                        </div>
                    </div>
                </template>
            </div>

            <!-- 칩 + 입력 -->
            <div class="dock">
                <div v-if="pendingQ && INBOX_URL" class="leave">
                    <button class="leave-btn" :disabled="sending" @click="submitQuestion">
                        <span>{{ sending ? '전송 중…' : '📩 이 질문 남기기' }}</span>
                        <em>“{{ pendingQ }}”</em>
                    </button>
                    <button class="leave-x" aria-label="취소" @click="pendingQ = ''">×</button>
                </div>
                <div class="chips">
                    <button
                        v-for="c in CHIPS"
                        :key="c.id"
                        class="chip"
                        :disabled="busy"
                        @click="run(c.id, c.label)"
                    >{{ c.label }}</button>
                </div>
                <form class="inbar" @submit.prevent="submit">
                    <span class="caret">›</span>
                    <input
                        v-model="input"
                        class="field"
                        :disabled="busy"
                        type="text"
                        autocomplete="off"
                        placeholder="궁금한 걸 입력하세요 — 예: 프로젝트 보여줘"
                        aria-label="질문 입력"
                    />
                    <button class="send" :disabled="busy || !input.trim()" aria-label="보내기">↵</button>
                </form>
            </div>
        </div>

        <!-- 간간이 떠오르는 귀여운 이모지 이벤트 -->
        <div class="fxlayer" aria-hidden="true">
            <span
                v-for="f in fx"
                :key="f.id"
                class="fxe"
                :style="{ left: f.left + '%', fontSize: f.size + 'px', '--dur': f.dur + 's', '--drift': f.drift + 'px' }"
            >{{ f.emoji }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// 겨울/AI 다크 터미널 팔레트
$bg0:    #070e1b;
$bg1:    #0e1a30;
$surf:   rgba(14, 26, 48, 0.72);
$line:   rgba(120, 150, 210, 0.18);
$text:   #cdd9ef;
$dim:    #7d90b4;
$glacier:#5b86e5;
$blue:   #2f6bed;
$cyan:   #35c6dd;
$violet: #9b86ff;
$mono:   'JetBrains Mono', 'SF Mono', ui-monospace, Consolas, monospace;

.term {
    min-height: 100vh;
    min-height: 100dvh;
    background:
        radial-gradient(1100px 600px at 80% -10%, rgba(47, 107, 237, 0.20), transparent 60%),
        radial-gradient(900px 500px at 0% 110%, rgba(123, 97, 255, 0.16), transparent 60%),
        linear-gradient(160deg, $bg1, $bg0);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px 16px;
    font-family: $mono;
    color: $text;
    position: relative;
    overflow: hidden;
}

// === 배경 FX ===
.bgfx { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.aurora {
    position: absolute; border-radius: 50%; opacity: 0.5;
    filter: blur(60px) hue-rotate(0deg);
}
.a1 {
    width: 420px; height: 420px; left: -90px; top: -70px;
    background: rgba(47, 107, 237, 0.5);
    animation: float1 26s ease-in-out infinite, hue 48s ease-in-out infinite;
}
.a2 {
    width: 360px; height: 360px; right: -70px; bottom: -50px;
    background: rgba(123, 97, 255, 0.42);
    animation: float2 32s ease-in-out infinite, hue 60s ease-in-out infinite reverse;
}
.snow {
    position: absolute; top: -14px; border-radius: 50%;
    background: radial-gradient(circle, #d6ecff, rgba(120, 170, 255, 0.5));
    animation: fall var(--sdur) linear infinite;
}
@keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(44px, 32px); } }
@keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-44px, -30px); } }
@keyframes hue { 0%, 100% { filter: blur(60px) hue-rotate(0deg); } 50% { filter: blur(60px) hue-rotate(26deg); } }
@keyframes fall {
    0% { transform: translateY(0) translateX(0); }
    100% { transform: translateY(102vh) translateX(20px); }
}

// === 이모지 이벤트 레이어 (창 위) ===
.fxlayer { position: absolute; inset: 0; z-index: 3; pointer-events: none; overflow: hidden; }
.fxe {
    position: absolute; bottom: -12px; user-select: none; line-height: 1;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
    animation: rise var(--dur) ease-in forwards;
}
@keyframes rise {
    0%   { opacity: 0; transform: translateY(0) translateX(0) scale(0.6); }
    15%  { opacity: 1; transform: translateY(-12vh) translateX(calc(var(--drift) * 0.2)) scale(1); }
    80%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(-82vh) translateX(var(--drift)) scale(1.05); }
}

.win {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 860px;
    height: calc(100dvh - 56px);
    max-height: 820px;
    display: flex;
    flex-direction: column;
    background: $surf;
    backdrop-filter: blur(14px);
    border: 1px solid $line;
    border-radius: 16px;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    overflow: hidden;
}

// === 헤더 바 ===
.bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-bottom: 1px solid $line;
    background: rgba(7, 14, 27, 0.5);
    .dots { display: inline-flex; gap: 7px;
        i { width: 11px; height: 11px; border-radius: 50%; display: block; }
        .r { background: #ff5f57; } .y { background: #febc2e; } .g { background: #28c840; }
    }
    .path { font-size: 12px; color: $dim; letter-spacing: 0.02em; }
    .reset {
        margin-left: auto; border: none; background: transparent; color: $dim;
        font-size: 16px; cursor: pointer; line-height: 1; padding: 2px 6px; border-radius: 6px;
        &:hover { color: $cyan; background: rgba(53, 198, 221, 0.1); }
    }
}

// === 모찌 아바타 띠 ===
.hero {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    border-bottom: 1px solid $line;
    background: linear-gradient(180deg, rgba(47, 107, 237, 0.08), transparent);
}
.mochi {
    width: 60px; height: 60px; flex: none; border: none; background: transparent; padding: 0; cursor: pointer;
    filter: drop-shadow(0 6px 14px rgba(47, 107, 237, 0.4));
    animation: bob 3.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    .face { width: 100%; height: 100%; display: block; }
    &:active { transform: scale(0.94); }
}
.tip { filter: drop-shadow(0 0 3px #7b61ff); animation: tip 1.6s ease-in-out infinite; }
.spark { transform-box: fill-box; transform-origin: center; animation: tw 2.2s ease-in-out infinite; }
.spark.s2 { animation-delay: 1.1s; }
.hero-txt {
    display: flex; flex-direction: column; gap: 3px; line-height: 1.3;
    strong { font-size: 16px; color: #fff; font-weight: 700; letter-spacing: -0.01em; }
    span { font-size: 11.5px; color: $dim; }
    em { color: $violet; font-style: normal; }
}

// === 로그 ===
.log {
    flex: 1;
    overflow-y: auto;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 13px;
    line-height: 1.6;
    scroll-behavior: smooth;
    &::-webkit-scrollbar { width: 8px; }
    &::-webkit-scrollbar-thumb { background: rgba(120, 150, 210, 0.22); border-radius: 8px; }
}

.row.user {
    display: flex; gap: 9px; align-items: baseline; flex-wrap: wrap;
    .prompt { color: $cyan; font-size: 12px; flex: none; }
    .cmd { color: #e7eeff; font-weight: 600; }
}

.mochi-row { display: flex; flex-direction: column; gap: 6px; }
.who { color: $violet; font-size: 11px; letter-spacing: 0.08em; font-weight: 700; }
.ans {
    border-left: 2px solid rgba(123, 97, 255, 0.35);
    padding-left: 13px;
    display: flex; flex-direction: column; gap: 9px;
}
.blk { animation: fadein 0.26s ease; }
@keyframes fadein { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

.t-h { color: $cyan; font-weight: 700; font-size: 13.5px; }
.t-p { color: $text; }
.t-note { color: $dim; font-size: 11.5px; }

.blk.kv { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; }
.t-k { color: $violet; font-weight: 700; min-width: 74px; }
.t-sep { color: $dim; }
.t-v { color: $text; }
.t-v.link { color: $glacier; text-decoration: none; border-bottom: 1px dashed rgba(91, 134, 229, 0.5); }
.t-v.link:hover { color: $cyan; }

// item
.blk.item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid $line;
    border-left: 3px solid $blue;
    border-radius: 10px;
    padding: 11px 13px;
    gap: 6px; display: flex; flex-direction: column;
}
.it-top { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; align-items: baseline; }
.it-title { color: #fff; font-weight: 700; font-size: 13px; }
.it-meta { color: $cyan; font-size: 10.5px; letter-spacing: 0.04em; }
.it-desc { color: $dim; font-size: 12px; line-height: 1.6; }
.it-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 2px; }
.tag {
    font-size: 10px; padding: 2px 8px; border-radius: 999px;
    background: rgba(47, 107, 237, 0.14); color: #a9c4ff;
}
.it-link {
    align-self: flex-start; margin-top: 4px; font-size: 11px; font-weight: 700;
    color: #0a1424; background: $cyan; padding: 5px 12px; border-radius: 999px; text-decoration: none;
    &:hover { background: #5be0f2; }
}

.cursor { color: $cyan; animation: blink 1s step-end infinite; align-self: flex-start; }
@keyframes blink { 50% { opacity: 0; } }

// === 독(칩 + 입력) ===
.dock {
    border-top: 1px solid $line;
    background: rgba(7, 14, 27, 0.55);
    padding: 12px 14px calc(12px + env(safe-area-inset-bottom, 0px));
    display: flex; flex-direction: column; gap: 10px;
}
// 질문 남기기 바
.leave { display: flex; align-items: stretch; gap: 6px; }
.leave-btn {
    flex: 1; display: flex; flex-direction: column; gap: 2px; align-items: flex-start;
    font-family: $mono; cursor: pointer; text-align: left;
    background: linear-gradient(90deg, rgba(47, 107, 237, 0.26), rgba(53, 198, 221, 0.2));
    border: 1px solid rgba(53, 198, 221, 0.5); border-radius: 11px;
    padding: 8px 13px; color: #eaf4ff;
    transition: filter 0.16s ease, transform 0.16s ease;
    span { font-size: 12.5px; font-weight: 700; }
    em { font-size: 11px; font-style: normal; color: #a9c4ff; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    &:hover:not(:disabled) { filter: brightness(1.12); transform: translateY(-1px); }
    &:disabled { opacity: 0.6; cursor: default; }
}
.leave-x {
    flex: none; width: 34px; border: 1px solid $line; border-radius: 11px;
    background: rgba(7, 14, 27, 0.6); color: $dim; font-size: 16px; cursor: pointer;
    &:hover { color: #ff7a8a; border-color: rgba(255, 122, 138, 0.4); }
}

.chips { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
    font-family: $mono; font-size: 11.5px; font-weight: 600;
    color: #bcd0f5; background: rgba(47, 107, 237, 0.12);
    border: 1px solid rgba(91, 134, 229, 0.35); border-radius: 999px;
    padding: 6px 13px; cursor: pointer; transition: all 0.16s ease;
    &::before { content: '/'; color: $violet; margin-right: 3px; }
    &:hover:not(:disabled) { background: rgba(47, 107, 237, 0.26); color: #fff; transform: translateY(-1px); }
    &:disabled { opacity: 0.4; cursor: default; }
}
.inbar {
    display: flex; align-items: center; gap: 9px;
    background: rgba(7, 14, 27, 0.7);
    border: 1px solid $line; border-radius: 12px;
    padding: 10px 12px;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    &:focus-within { border-color: rgba(53, 198, 221, 0.55); box-shadow: 0 0 0 3px rgba(53, 198, 221, 0.12); }
    .caret { color: $cyan; font-weight: 700; font-size: 16px; }
    .field {
        flex: 1; background: transparent; border: none; outline: none;
        color: $text; font-family: $mono; font-size: 13px;
        &::placeholder { color: rgba(125, 144, 180, 0.7); }
    }
    .send {
        border: none; border-radius: 9px; cursor: pointer;
        background: $blue; color: #fff; font-size: 14px; width: 34px; height: 30px;
        transition: background 0.16s ease;
        &:hover:not(:disabled) { background: $glacier; }
        &:disabled { opacity: 0.4; cursor: default; }
    }
}

@keyframes bob { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
@keyframes tip { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes tw { 0%, 100% { opacity: 0.25; transform: scale(0.6); } 50% { opacity: 1; transform: scale(1); } }

// === 모바일 ===
@media (max-width: 640px) {
    .term { padding: 0; }
    .win { height: 100dvh; max-height: none; border-radius: 0; border: none; }
    .hero { padding: 13px 15px; }
    .mochi { width: 50px; height: 50px; }
    .hero-txt strong { font-size: 15px; }
    .log { padding: 15px; font-size: 12.5px; }
    .it-top { flex-direction: column; gap: 2px; }
}

@media (prefers-reduced-motion: reduce) {
    .mochi, .tip, .spark { animation: none; }
    .blk { animation: none; }
    .cursor { animation: none; }
    .aurora { animation: none; }
    .snow { display: none; }
    .fxe { display: none; }
}
</style>
