// CAT 2025 Roadmap Data Structure
let roadmapData = {};

// Embedded official roadmap text (client-side fallback, no server/storage required)
const OFFICIAL_ROADMAP_TEXT = `
Week 1: Foundations - Focus on Basics
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Introduction to Reading Comprehension (Chapter: Reading Comprehension Strategies); practice 2-3 basic passages.
o\tNight (2 hrs): Quantitative Aptitude - Arithmetic Basics: Percentages and Ratios (Chapter: Percentages, Ratios); solve 20 LOD 1 questions.
•\tTuesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Building: Root Words (Chapter: Vocabulary Enhancement); learn 20 words with examples.
o\tNight (2 hrs): Quantitative Aptitude - Profit, Loss, and Simple Interest (Chapter: Profit/Loss, Interest); practice 20-30 questions.
•\tWednesday:
o\tMorning (2 hrs): Data Interpretation - Basics of Data Interpretation: Tables and Charts (Chapter: Tables); understand formats, solve 5 examples.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Grammar Focus: Sentence Correction (Chapter: Sentence Correction); practice 15 exercises.
•\tThursday:
o\tMorning (2 hrs): Quantitative Aptitude - Algebra Basics: Linear Equations (Chapter: Linear Equations); review theory, solve 10 problems.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning Basics: Arrangements (Chapter: Arrangements); solve 5 sets.
•\tFriday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Practice Para-Jumbles Basics (Chapter: Para-Jumbles); solve 10 sets.
o\tNight (2 hrs): Quantitative Aptitude - Number Systems Basics: Factors and Multiples (Chapter: Number Systems); solve 20 LOD 1 questions.
•\tSaturday:
o\tMorning (2 hrs): Mixed Review - Revise weak Verbal Ability and Reading Comprehension, Quantitative Aptitude topics; flashcards for 20 words.
o\tNight (2 hrs): Logical Reasoning - Basic Puzzles (Chapter: Puzzle Tests); practice 10 questions.
•\tSunday:
o\tFull Mock Test (3 hours, from book) + analysis; focus on time management.
Week 2: Foundations - Build Momentum
•\tMonday:
o\tMorning (2 hrs): Data Interpretation - Bar Graphs and Pie Charts (Chapter: Bar Graphs); study theory, solve 5 examples.
o\tNight (2 hrs): Quantitative Aptitude - Geometry Basics: Triangles (Chapter: Triangles); solve 15 LOD 1-2 questions.
•\tTuesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Practice Inference Questions in Reading Comprehension (Chapter: Inference-Based RC); solve 3 passages.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning Sequencing Problems (Chapter: Logical Sequences); solve 5-7 sets.
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Time, Speed, and Distance (Chapter: Time/Speed/Distance); review formulas, solve 20 problems.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Critical Reasoning: Assumptions (Chapter: Critical Reasoning); practice 15 questions.
•\tThursday:
o\tMorning (2 hrs): Data Interpretation - Mixed Data Interpretation Sets (Chapter: Mixed DI); practice 4 timed sets.
o\tNight (2 hrs): Quantitative Aptitude - Algebra: Quadratic Equations (Chapter: Quadratic Equations); solve 15 LOD 1 questions.
•\tFriday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary: Synonyms and Antonyms (Chapter: Vocabulary Enhancement); learn 20 words.
o\tNight (2 hrs): Logical Reasoning - Logical Puzzles: Blood Relations (Chapter: Blood Relations); solve 10 sets.
•\tSaturday:
o\tMorning (2 hrs): Quantitative Aptitude Review - Revise Arithmetic weaknesses (e.g., Percentages); solve 20 mixed questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Para Summaries Practice (Chapter: Para-Summaries); solve 10 sets.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; evaluate section scores.
Week 3: Foundations - Integrate Basics
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Reading Comprehension: Tone and Style Questions (Chapter: Tone/Style in RC); solve 3-4 passages.
o\tNight (2 hrs): Data Interpretation - Data Interpretation: Line Graphs (Chapter: Line Graphs); practice 5 timed examples.
•\tTuesday:
o\tMorning (2 hrs): Quantitative Aptitude - Modern Math Basics: Permutations (Chapter: Permutations); review concepts, solve 10 problems.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Odd Sentence Out Practice (Chapter: Odd Sentence Out); solve 15 exercises.
•\tWednesday:
o\tMorning (2 hrs): Logical Reasoning - Logical Reasoning: Syllogisms (Chapter: Syllogisms); study rules, solve 10 questions.
o\tNight (2 hrs): Quantitative Aptitude - Geometry: Circles (Chapter: Circles); solve 15 LOD 2 questions.
•\tThursday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Advanced Grammar Review (Chapter: Grammar Rules); correct 15 sentences.
o\tNight (2 hrs): Data Interpretation - Caselets in Data Interpretation (Chapter: Caselets); solve 5 mixed sets.
•\tFriday:
o\tMorning (2 hrs): Quantitative Aptitude - Number Systems: Advanced Factors (Chapter: Number Systems); solve 20 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Application in Sentences (Chapter: Vocabulary Usage); practice 20 words.
•\tSaturday:
o\tMorning (2 hrs): Mixed Basics Review - All sections; solve 10 quick questions each.
o\tNight (2 hrs): Logical Reasoning - Puzzle Sets (Chapter: Puzzle Tests); solve 7-10.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; identify weak areas.
Week 4: Advanced - Ramp Up Difficulty
•\tMonday:
o\tMorning (2 hrs): Quantitative Aptitude - Arithmetic: Mixtures and Alligations (Chapter: Mixtures/Alligations); solve 15 LOD 2-3 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Complex Reading Comprehension Passages (Chapter: Advanced RC); solve 4 timed.
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Advanced Data Interpretation Charts (Chapter: Pie Charts/Bar Graphs); practice 5 sets.
o\tNight (2 hrs): Quantitative Aptitude - Algebra: Inequalities (Chapter: Inequalities); solve 20-25 questions.
•\tWednesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Advanced Para-Jumbles (Chapter: Para-Jumbles); solve 15 sets.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning: Grouping Problems (Chapter: Team Formation); solve 5 timed sets.
•\tThursday:
o\tMorning (2 hrs): Quantitative Aptitude - Geometry: Mensuration (Chapter: Mensuration); solve 15 LOD 3 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Critical Reasoning: Strengthen and Weaken Arguments (Chapter: Critical Reasoning); practice 15.
•\tFriday:
o\tMorning (2 hrs): Data Interpretation - Mixed Data Interpretation and Logical Reasoning (Chapter: Logical DI); solve 5 full sets.
o\tNight (2 hrs): Quantitative Aptitude - Time and Work (Chapter: Time/Work); solve 20 advanced problems.
•\tSaturday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension Review - Vocabulary quiz (50 words) + RC errors (Chapter: Vocabulary).
o\tNight (2 hrs): Quantitative Aptitude - Modern Math: Combinations (Chapter: Combinations); solve 15 questions.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; improve timing.
Week 5: Advanced - Mixed Practice
•\tMonday:
o\tMorning (2 hrs): Data Interpretation - Data Interpretation: Data Sufficiency (Chapter: Data Sufficiency); review theory, solve 10 examples.
o\tNight (2 hrs): Quantitative Aptitude - Number Systems: Remainders (Chapter: Number Systems); solve 20 LOD 3 questions.
•\tTuesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Multi-Paragraph Reading Comprehension (Chapter: Advanced RC); solve 4 passages.
o\tNight (2 hrs): Logical Reasoning - Advanced Logical Reasoning Puzzles (Chapter: Puzzle Tests); solve 7 sets.
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Algebra: Functions (Chapter: Functions); solve 15 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Sentence Completion (Chapter: Sentence Completion); solve 20 questions.
•\tThursday:
o\tMorning (2 hrs): Data Interpretation - Caselet-Based Data Interpretation (Chapter: Caselets); solve 5 timed sets.
o\tNight (2 hrs): Quantitative Aptitude - Geometry: Coordinate Geometry (Chapter: Coordinate Geometry); solve 15 LOD 2-3 questions.
•\tFriday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary: Idioms (Chapter: Vocabulary Enhancement); learn 20 with examples.
o\tNight (2 hrs): Logical Reasoning - Logical Deduction Problems (Chapter: Logical Deduction); solve 10 questions.
•\tSaturday:
o\tMorning (2 hrs): Quantitative Aptitude Review - Solve 20 mixed sets from weak areas.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Para-Completion Practice (Chapter: Para-Completion); solve 15 sets.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; focus on accuracy.
Week 6: Advanced - Sectional Integration
•\tMonday:
o\tMorning (2 hrs): Quantitative Aptitude - Modern Math: Probability (Chapter: Probability); solve 15 advanced questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Inference-Heavy Reading Comprehension (Chapter: Inference-Based RC); solve 4 passages.
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Data Interpretation: Growth Rates (Chapter: Quantitative DI on Percentages); practice 5 sets.
o\tNight (2 hrs): Quantitative Aptitude - Arithmetic: Averages (Chapter: Averages); solve 20 LOD 3 questions.
•\tWednesday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Mixed Critical Reasoning (Chapter: Critical Reasoning); solve 20 questions.
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning: Networks and Paths (Chapter: Network Diagrams); solve 5 sets.
•\tThursday:
o\tMorning (2 hrs): Quantitative Aptitude - Algebra: Series and Progressions (Chapter: Series); solve 15 questions.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Full Grammar Review (Chapter: Grammar Rules) + error correction.
•\tFriday:
o\tMorning (2 hrs): Data Interpretation - Full Sectional Test (Chapter: Mock Tests); solve 5 mixed sets.
o\tNight (2 hrs): Quantitative Aptitude - Geometry Review (Chapter: Geometry); solve 20 mixed questions.
•\tSaturday:
o\tMorning (2 hrs): Mixed Advanced Practice - 10 questions each from all sections.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary Consolidation (Chapter: Vocabulary) quiz 50 words.
•\tSunday:
o\tFull Mock Test (3 hours) + analysis; simulate exam pressure.
Week 7: Revision - Consolidate and Test
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Full Revision of Key Chapters (e.g., RC Strategies).
o\tNight (2 hrs): Quantitative Aptitude - Timed Sets from Weak Topics (20 questions).
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Revise Data Interpretation Types (e.g., Tables, Graphs); practice 5 sets.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Reading Comprehension Mocks (solve 4 passages).
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Full Revision: Formulas and LOD 3 Questions (20 total).
o\tNight (2 hrs): Logical Reasoning - Logical Reasoning Mocks (solve 7 sets).
•\tThursday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Vocabulary and Grammar Quiz (50 items).
o\tNight (2 hrs): Quantitative Aptitude - Mixed Sectional Practice (20 questions).
•\tFriday:
o\tMorning (2 hrs): Data Interpretation - Full Revision of Key Concepts (e.g., Caselets).
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Error Analysis from Past Practices.
•\tSaturday:
o\tMorning (2 hrs): All Sections - Quick Formula and Vocabulary Review.
o\tNight (2 hrs): Mixed Practice Sets (10 per section).
•\tSunday:
o\t2 Full Mock Tests (morning + night) + analysis.
Week 8: Intensive Mocks and Final Polish
•\tMonday:
o\tMorning (2 hrs): Verbal Ability and Reading Comprehension - Sectional Mock.
o\tNight (2 hrs): Quantitative Aptitude - Error Review (20 questions).
•\tTuesday:
o\tMorning (2 hrs): Data Interpretation - Sectional Mock.
o\tNight (2 hrs): Verbal Ability and Reading Comprehension - Final Reading Comprehension Practice (4 passages).
•\tWednesday:
o\tMorning (2 hrs): Quantitative Aptitude - Sectional Mock.
o\tNight (2 hrs): Logical Reasoning - Error Review.
•\tThursday:
o\tMorning (2 hrs): Mixed Sectional (Verbal Ability and Reading Comprehension + Quantitative Aptitude).
o\tNight (2 hrs): Full Revision Notes (key formulas, tips).
•\tFriday:
o\tMorning (2 hrs): Mixed Sectional (Data Interpretation + Logical Reasoning + Verbal Ability and Reading Comprehension).
o\tNight (2 hrs): Quantitative Aptitude - Final Tweaks (15 questions).
•\tSaturday:
o\tMorning (2 hrs): Light Review - All Weak Areas.
o\tNight (2 hrs): Exam Strategy Notes.
•\tSunday:
o\t2 Full Mock Tests + analysis; focus on mindset.`;

function parseRoadmapText(text) {
    if (typeof text !== 'string') return {};
    const lines = String(text)
        .split(/\r?\n/)
        .map(l => (typeof l === 'string' ? l.trim() : ''))
        .filter(Boolean);

    const weeks = {};
    const dayRegex = /^(?:[•*\-]\s*)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\s*:/i;
    const sessionRegex = /^o\s*(morning|night)?\s*(?:\([^)]*\))?\s*:\s*(.+)$/i;

    let currentWeekKey = null;
    let currentDayKey = null;

    function ensureDay(weekObj, dayKey) {
        if (!weekObj[dayKey]) weekObj[dayKey] = { morning: { title: '', description: '' }, night: { title: '', description: '' } };
    }

    for (const ln of lines) {
        // Week header
        if (/^week\s+/i.test(ln)) {
            currentWeekKey = ln;
            if (!weeks[currentWeekKey]) weeks[currentWeekKey] = { title: (ln.split(':', 1)[1] || '').trim() };
            currentDayKey = null;
            continue;
        }

        // Day line
        const dayMatch = ln.match(dayRegex);
        if (dayMatch) {
            currentDayKey = dayMatch[1].toLowerCase();
            ensureDay(weeks[currentWeekKey], currentDayKey);
            continue;
        }

        // Session line
        const sessMatch = ln.match(sessionRegex);
        if (sessMatch && currentWeekKey && currentDayKey) {
            const sess = (sessMatch[1] || '').toLowerCase();
            const rest = sessMatch[2].trim();
            let title = rest;
            let description = '';
            const idx = rest.indexOf(' - ');
            if (idx >= 0) {
                title = rest.slice(0, idx).trim();
                description = rest.slice(idx + 3).trim();
            }
            ensureDay(weeks[currentWeekKey], currentDayKey);
            if (sess === 'morning' || sess === 'night') {
                weeks[currentWeekKey][currentDayKey][sess] = { title, description };
            } else {
                weeks[currentWeekKey][currentDayKey].morning = { title, description };
                weeks[currentWeekKey][currentDayKey].night = { title, description };
            }
        }
    }
    return weeks;
}

// Function to fetch roadmap data from the server
async function fetchRoadmapData() {
    // Make the app independent of any backend: always use embedded roadmap
    roadmapData = parseRoadmapText(OFFICIAL_ROADMAP_TEXT);
    return roadmapData;
}


// DOM Elements
const weekTitle = document.getElementById('current-week');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const dayBtns = document.querySelectorAll('.day-btn');
const sessionBtns = document.querySelectorAll('.session-btn');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const timerValue = document.getElementById('timer-value');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const addTimeBtn = document.getElementById('add-time');
const markCompleteBtn = document.getElementById('mark-complete');
const saveProgressBtn = document.getElementById('save-progress');
const resetAllBtn = document.getElementById('reset-all');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');
const totalTimeDisplay = document.getElementById('total-time');
const completedTasksDisplay = document.getElementById('completed-tasks');
const completedDaysDisplay = document.getElementById('completed-days');
const timerTabs = document.querySelectorAll('.timer-tab');
const timerCircle = document.querySelector('.timer-circle');
const timerTabsContainer = document.querySelector('.timer-tabs');
const preCompleteTextEl = document.querySelector('.pre-complete-text');
const currentTaskLabel = document.getElementById('current-task-label');
// App State
let currentWeek = Object.keys(roadmapData)[0];
let currentDay = 'monday';
let currentSession = 'morning';
let timerInterval;
let timerRunning = false;
let timerSeconds = 7200; // 2 hours in seconds
let mandatoryBreakTaken = false;
let originalTimerSeconds = 7200;
let totalStudyTimeSeconds = 0;
let timerType = 'all'; // 'all', 'shortBreak', 'longBreak'
let isOvertime = false;
let overtimeSeconds = 0;
// Timer durations in seconds
const timerDurations = {
    all: 7200, // 2 hours
    shortBreak: 300 // 5 minutes
};

// Schedule control: only allow editing today's sessions from the official start
// Overrides
const EDIT_ALL_DAYS = true; // Set true to allow editing any day/week
const SCHEDULE_START_DATE = new Date('2025-08-12T00:00:00.000+05:30'); // Treat schedule as started on Aug 12, 2025
let scheduleStartDate = null; // Date object at 00:00 local
let scheduleHasStarted = false;
let todayWeekIndex = 0;
let todayDayKey = 'monday';

function computeNextMondayStartDate() {
    // If an explicit schedule start is configured, use it
    if (SCHEDULE_START_DATE instanceof Date && !isNaN(SCHEDULE_START_DATE)) {
        const d = new Date(SCHEDULE_START_DATE.getTime());
        d.setHours(0, 0, 0, 0);
        return d;
    }
    // Fallback to next Monday
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const day = d.getDay(); // 0=Sun, 1=Mon
    const delta = (8 - day) % 7; // 0 if Monday, otherwise days to next Monday
    d.setDate(d.getDate() + delta);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getWeekIndexByName(weekName) {
    const weeks = Object.keys(roadmapData);
    return weeks.indexOf(weekName);
}

function isEditionAllowedForSelection() {
    if (EDIT_ALL_DAYS) return true;
    if (!scheduleHasStarted) return false;
    return getWeekIndexByName(currentWeek) === todayWeekIndex && currentDay === todayDayKey;
}

function setButtonDisabled(button, disabled) {
    if (!button) return;
    button.disabled = disabled;
    button.classList.toggle('is-disabled', disabled);
}

function updateInteractionLockUI() {
    const allowed = isEditionAllowedForSelection();
    setButtonDisabled(pauseTimerBtn, !allowed);
    setButtonDisabled(resetTimerBtn, !allowed);
    setButtonDisabled(addTimeBtn, !allowed);
    setButtonDisabled(markCompleteBtn, !allowed);
    const saveBtn = document.getElementById('save-progress');
    setButtonDisabled(saveBtn, !allowed);

    if (timerTabsContainer) {
        timerTabsContainer.classList.toggle('is-locked', !allowed);
    }

    if (preCompleteTextEl) {
        if (!scheduleHasStarted) {
            const startDate = scheduleStartDate;
            const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            preCompleteTextEl.textContent = `Schedule starts on ${startDate.toLocaleDateString(undefined, options)}. You can browse but cannot edit yet.`;
        } else if (!allowed) {
            preCompleteTextEl.textContent = 'Viewing a past/future day. Only today\'s sessions are editable.';
        } else {
            preCompleteTextEl.textContent = 'Save or mark this session once you are done';
        }
    }
}

// User Progress Data
let userProgress = {
    completedTasks: [],
    totalStudyTime: 0,
    lastState: null,
    timeBySession: { morning: 0, night: 0, shortBreak: 0 },
    timeByDay: { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 }
};

// Function to fetch user progress from the server
async function loadUserProgress() {
    try {
        const response = await fetch('/api/progress');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const progressData = await response.json();
        // Ensure progressData is a valid object before assigning
        if (progressData && typeof progressData === 'object' && Array.isArray(progressData.completedTasks)) {
            userProgress = progressData;
        } else {
            // If data is invalid, initialize with a default structure
            userProgress = { completedTasks: [], totalStudyTime: 0, lastState: null, timeBySession: { morning: 0, night: 0, shortBreak: 0 }, timeByDay: { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 } };
        }

        totalStudyTimeSeconds = userProgress.totalStudyTime || 0;
        updateProgressDisplay();
    } catch (error) {
        console.error("Could not load user progress:", error);
        // Fallback to localStorage or default
        const savedProgress = localStorage.getItem('catTimerProgress');
        if (savedProgress) {
            userProgress = JSON.parse(savedProgress);
        } else {
            userProgress = { completedTasks: [], totalStudyTime: 0, lastState: null, timeBySession: { morning: 0, night: 0, shortBreak: 0 }, timeByDay: { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 } };
        }
        totalStudyTimeSeconds = userProgress.totalStudyTime || 0;
        updateProgressDisplay(); // Also update display on fallback
    }
}

// Helpers to capture and restore current UI/timer state
function captureCurrentState() {
    return {
        currentWeek,
        currentDay,
        currentSession,
        timerType,
        timerSeconds,
        isOvertime,
        overtimeSeconds,
        timestamp: Date.now()
    };
}

function applySavedState(state) {
    if (!state) return;
    if (state.currentWeek && roadmapData[state.currentWeek]) {
        currentWeek = state.currentWeek;
    }
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (days.includes(state.currentDay)) {
        currentDay = state.currentDay;
    }
    if (['morning', 'night'].includes(state.currentSession)) {
        currentSession = state.currentSession;
    }
    if (['all', 'shortBreak'].includes(state.timerType)) {
        timerType = state.timerType;
    } else {
        timerType = 'all';
    }
    if (typeof state.timerSeconds === 'number' && state.timerSeconds > 0) {
        timerSeconds = state.timerSeconds;
    } else {
        timerSeconds = timerDurations[timerType];
    }
    originalTimerSeconds = timerSeconds;

    // restore overtime
    if (typeof state.isOvertime === 'boolean') {
        isOvertime = state.isOvertime;
    }
    if (typeof state.overtimeSeconds === 'number' && state.overtimeSeconds >= 0) {
        overtimeSeconds = state.overtimeSeconds;
    }

    // Reflect active buttons
    dayBtns.forEach(b => b.classList.toggle('active', b.dataset.day === currentDay));
    sessionBtns.forEach(b => b.classList.toggle('active', b.dataset.session === currentSession));
    const typeIndex = ['all', 'shortBreak'].indexOf(timerType);
    if (typeIndex >= 0) {
        timerTabs.forEach((t, idx) => t.classList.toggle('active', idx === typeIndex));
    }

    updateWeekDisplay();
    updateTimerDisplay();
}

// Chart.js Integration
function initializeCharts() {
    try {
        // Sample data for Study Time Distribution (replace with actual data)
        const studyTimeData = {
            labels: ['Morning Session', 'Night Session', 'Short Break'],
            datasets: [{
                data: [
                    (userProgress.timeBySession?.morning || 0) / 3600,
                    (userProgress.timeBySession?.night || 0) / 3600,
                    (userProgress.timeBySession?.shortBreak || 0) / 3600
                ],
                backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
            }],
        };

        // Sample data for Daily Progress (replace with actual data)
        const dailyProgressData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Study Hours',
                data: [
                    (userProgress.timeByDay?.monday || 0) / 3600,
                    (userProgress.timeByDay?.tuesday || 0) / 3600,
                    (userProgress.timeByDay?.wednesday || 0) / 3600,
                    (userProgress.timeByDay?.thursday || 0) / 3600,
                    (userProgress.timeByDay?.friday || 0) / 3600,
                    (userProgress.timeByDay?.saturday || 0) / 3600,
                    (userProgress.timeByDay?.sunday || 0) / 3600
                ],
                backgroundColor: '#9C27B0',
                borderColor: '#9C27B0',
                borderWidth: 1,
            }],
        };

        // Render Study Time Distribution Chart
        const studyTimeChartCtx = document.getElementById('studyTimeChart');
        if (studyTimeChartCtx) {
            new Chart(studyTimeChartCtx.getContext('2d'), {
                type: 'pie',
                data: studyTimeData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Study Time Distribution',
                        },
                    },
                },
            });
        }

        // Render Daily Progress Chart
        const dailyProgressChartCtx = document.getElementById('dailyProgressChart');
        if (dailyProgressChartCtx) {
            new Chart(dailyProgressChartCtx.getContext('2d'), {
                type: 'bar',
                data: dailyProgressData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Daily Progress',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Hours',
                            },
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.log('Charts not available:', error);
    }
}

// Save user progress to the server
async function saveUserProgress() {
    try {
        const response = await fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProgress),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Could not save user progress:", error);
        // Fallback to localStorage
        localStorage.setItem('catTimerProgress', JSON.stringify(userProgress));
    }
}

// Throttled saver to reduce writes during ticking
let saveProgressThrottleTimer = null;
function saveUserProgressThrottled() {
    if (saveProgressThrottleTimer) return;
    saveProgressThrottleTimer = setTimeout(() => {
        saveProgressThrottleTimer = null;
        saveUserProgress();
    }, 5000); // write at most once every 5s while ticking
}

// Update the task details based on current selections
function updateTaskDetails() {
    if (!roadmapData || !roadmapData[currentWeek] || !roadmapData[currentWeek][currentDay] || !roadmapData[currentWeek][currentDay][currentSession]) {
        // Data not loaded yet, do nothing
        return;
    }
    const weekData = roadmapData[currentWeek];
    const dayData = weekData[currentDay];
    const sessionData = dayData[currentSession];
    
    taskTitle.textContent = sessionData.title;
    taskDescription.textContent = sessionData.description;
    
    updateTimerDisplay();
    updateCompleteButtonState();
    updateDayButtonStatus();
    updateInteractionLockUI();
}

// Check if current task is completed
function isTaskCompleted() {
    const taskId = `${currentWeek}-${currentDay}-${currentSession}`;
    return userProgress.completedTasks.includes(taskId);
}

// Check if a day is completed (both morning and night sessions)
function isDayCompleted(week, day) {
    const morningTaskId = `${week}-${day}-morning`;
    const nightTaskId = `${week}-${day}-night`;
    return userProgress.completedTasks.includes(morningTaskId) && 
           userProgress.completedTasks.includes(nightTaskId);
}

// Update complete button state
function updateCompleteButtonState() {
    if (isTaskCompleted()) {
        markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
        markCompleteBtn.classList.add('completed');
        markCompleteBtn.disabled = true;
    } else {
        markCompleteBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Complete';
        markCompleteBtn.classList.remove('completed');
        markCompleteBtn.disabled = false;
    }
}

// Update day button completion status
function updateDayButtonStatus() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    dayBtns.forEach(btn => {
        const day = btn.dataset.day;
        const isCompleted = isDayCompleted(currentWeek, day);
        
        if (isCompleted) {
            btn.classList.add('completed');
        } else {
            btn.classList.remove('completed');
        }
    });
}

// Update week display
function updateWeekDisplay() {
    weekTitle.textContent = currentWeek;
    updateTaskDetails();
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const displayMinutes = (isOvertime && timerType === 'all') ? Math.floor(overtimeSeconds / 60) : minutes;
    const displaySeconds = (isOvertime && timerType === 'all') ? (overtimeSeconds % 60) : seconds;

    timerValue.textContent = `${displayMinutes}:${displaySeconds.toString().padStart(2, '0')}`;
    const unitLabel = document.getElementById('timer-unit-label');
    if (unitLabel) {
        unitLabel.textContent = 'minutes';
    }
    
    // Update circular progress
    const progressPercent = (isOvertime && timerType === 'all')
        ? 100
        : Math.max(0, Math.min(100, (1 - (timerSeconds / timerDurations[timerType])) * 100));
    timerCircle.style.background = `conic-gradient(#4285f4 0% ${progressPercent}%, #f0f2f5 ${progressPercent}% 100%)`;
    
    // Update task label
    if (roadmapData[currentWeek] && roadmapData[currentWeek][currentDay] && roadmapData[currentWeek][currentDay][currentSession]) {
        const weekData = roadmapData[currentWeek];
        const dayData = weekData[currentDay];
        const sessionData = dayData[currentSession];
        currentTaskLabel.textContent = `#${userProgress.completedTasks.length + 1} - ${sessionData.title}`;
    }
}

// Update progress display
function updateProgressDisplay() {
    // Calculate progress percentage
    const totalTasks = 112; // 8 weeks * 7 days * 2 sessions
    const completedTasks = userProgress.completedTasks.length;
    const progressPercentage = (completedTasks / totalTasks) * 100;
    
    // Update progress bar and text
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
    
    // Update stats
    const hours = Math.floor(totalStudyTimeSeconds / 3600);
    const minutes = Math.floor((totalStudyTimeSeconds % 3600) / 60);
    totalTimeDisplay.textContent = `${hours}h ${minutes}m`;
    completedTasksDisplay.textContent = `${completedTasks}/${totalTasks}`;
    completedDaysDisplay.textContent = `${Math.floor(completedTasks / 2)}/${totalTasks / 2}`;
}

// Timer functions
function startTimer() {
    if (!isEditionAllowedForSelection()) {
        alert("You can only control the timer for today's sessions.");
        return;
    }
    if (!timerRunning) {
        // Clear any existing interval first
        clearInterval(timerInterval);
        
        // Reset mandatoryBreakTaken when a new 2-hour session starts
        if (timerType === 'all' && timerSeconds === timerDurations.all && !isOvertime) {
            mandatoryBreakTaken = false;
        }
        
        timerRunning = true;
        pauseTimerBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        timerInterval = setInterval(() => {
            if (timerType === 'all') {
                if (!isOvertime) {
                    if (timerSeconds > 0) {
                        timerSeconds--;
                        totalStudyTimeSeconds++;
                        userProgress.totalStudyTime = totalStudyTimeSeconds;
                        const sessionKey = currentSession === 'morning' ? 'morning' : 'night';
                        userProgress.timeBySession[sessionKey] = (userProgress.timeBySession[sessionKey] || 0) + 1;
                        userProgress.timeByDay[currentDay] = (userProgress.timeByDay[currentDay] || 0) + 1;
                        saveUserProgressThrottled();

                        // Mandatory 15-min break after 1 hour of study
                        if (totalStudyTimeSeconds % 3600 === 0 && totalStudyTimeSeconds > 0 && !mandatoryBreakTaken) {
                            clearInterval(timerInterval);
                            timerRunning = false;
                            pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
                            if (confirm('Mandatory 15-minute break! Time to recharge. Click OK to start the break timer.')) {
                                timerType = 'shortBreak';
                                timerSeconds = 900; // 15 minutes
                                updateTimerDisplay();
                                switchTimerType('shortBreak');
                                mandatoryBreakTaken = true;
                                startTimer();
                            }
                            return;
                        }
                    } else {
                        // Hit zero → mark complete once, then enter overtime up-counter
                        const taskId = `${currentWeek}-${currentDay}-${currentSession}`;
                        if (!userProgress.completedTasks.includes(taskId)) {
                            userProgress.completedTasks.push(taskId);
                            saveUserProgress();
                            updateCompleteButtonState();
                            updateDayButtonStatus();
                        }
                        isOvertime = true;
                        overtimeSeconds = 0;
                    }
                } else {
                    // Overtime counting up
                    overtimeSeconds++;
                    totalStudyTimeSeconds++;
                    userProgress.totalStudyTime = totalStudyTimeSeconds;
                    const sessionKey2 = currentSession === 'morning' ? 'morning' : 'night';
                    userProgress.timeBySession[sessionKey2] = (userProgress.timeBySession[sessionKey2] || 0) + 1;
                    userProgress.timeByDay[currentDay] = (userProgress.timeByDay[currentDay] || 0) + 1;
                    saveUserProgressThrottled();
                }
            } else {
                // Break timers work as regular countdowns
                if (timerSeconds > 0) {
                    timerSeconds--;
                } else {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }

            updateTimerDisplay();
            updateProgressDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        startTimer();
    }
}

function resetTimer() {
    if (!isEditionAllowedForSelection()) return;
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = timerDurations[timerType];
    originalTimerSeconds = timerSeconds;
    isOvertime = false;
    overtimeSeconds = 0;
    pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
    updateTimerDisplay();
}

function addFiveMinutes() {
    if (!isEditionAllowedForSelection()) return;
    timerSeconds += 300; // Add 5 minutes
    updateTimerDisplay();
}

function markTaskComplete() {
    if (!isEditionAllowedForSelection()) {
        alert("You can only mark today's sessions as complete.");
        return;
    }
    const taskId = `${currentWeek}-${currentDay}-${currentSession}`;
    
    if (!userProgress.completedTasks.includes(taskId)) {
        userProgress.completedTasks.push(taskId);
        saveUserProgress();
        updateProgressDisplay();
        updateCompleteButtonState();
        updateDayButtonStatus();
        
        // Show success message
        const weekData = roadmapData[currentWeek];
        const dayData = weekData[currentDay];
        const sessionData = dayData[currentSession];
        alert(`Great job! "${sessionData.title}" has been marked as complete.`);
    }
}

function switchTimerType(type) {
    clearInterval(timerInterval);
    timerRunning = false;
    timerType = type;
    timerSeconds = timerDurations[type];
    originalTimerSeconds = timerSeconds;
    isOvertime = false;
    overtimeSeconds = 0;
    pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
    updateTimerDisplay();
}

// Event Listeners
prevWeekBtn.addEventListener('click', () => {
    const weeks = Object.keys(roadmapData);
    const currentIndex = weeks.indexOf(currentWeek);
    if (currentIndex > 0) {
        currentWeek = weeks[currentIndex - 1];
        updateWeekDisplay();
        updateCompleteButtonState();
        updateDayButtonStatus();
    }
});

nextWeekBtn.addEventListener('click', () => {
    const weeks = Object.keys(roadmapData);
    const currentIndex = weeks.indexOf(currentWeek);
    if (currentIndex < weeks.length - 1) {
        currentWeek = weeks[currentIndex + 1];
        updateWeekDisplay();
        updateCompleteButtonState();
        updateDayButtonStatus();
    }
});

dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        dayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDay = btn.dataset.day;
        // Reset timer and UI when switching days
        timerType = 'all';
        timerSeconds = timerDurations[timerType];
        originalTimerSeconds = timerSeconds;
        isOvertime = false;
        overtimeSeconds = 0;
        updateTaskDetails();
        updateTimerDisplay();
    });
});

sessionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sessionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSession = btn.dataset.session;
        // Reset timer and UI when switching sessions
        timerType = 'all';
        timerSeconds = timerDurations[timerType];
        originalTimerSeconds = timerSeconds;
        isOvertime = false;
        overtimeSeconds = 0;
        updateTaskDetails();
        updateTimerDisplay();
    });
});

// Timer control event listeners
pauseTimerBtn.addEventListener('click', pauseTimer);
resetTimerBtn.addEventListener('click', resetTimer);
addTimeBtn.addEventListener('click', addFiveMinutes);
markCompleteBtn.addEventListener('click', markTaskComplete);

// Timer tabs event listeners
timerTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        timerTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Switch timer type based on tab index
        const timerTypes = ['all', 'shortBreak'];
        if (timerTypes[index]) {
            switchTimerType(timerTypes[index]);
        }
    });
});

// Save progress snapshot on demand
function saveCurrentProgressSnapshot() {
    if (!isEditionAllowedForSelection()) return;
    userProgress.lastState = captureCurrentState();
    userProgress.totalStudyTime = totalStudyTimeSeconds;
    saveUserProgress();
    alert('Progress saved. You can resume from here next time.');
}

if (saveProgressBtn) {
    saveProgressBtn.addEventListener('click', saveCurrentProgressSnapshot);
}

async function resetAllData() {
    if (!confirm('This will clear your completed tasks, total time, and reset the timer. Continue?')) return;
    // Clear local state
    userProgress = { completedTasks: [], totalStudyTime: 0, lastState: null };
    totalStudyTimeSeconds = 0;
    timerRunning = false;
    isOvertime = false;
    overtimeSeconds = 0;
    timerSeconds = timerDurations[timerType];
    pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
    updateTimerDisplay();
    updateProgressDisplay();
    updateCompleteButtonState();
    updateDayButtonStatus();

    // Persist cleared data
    try {
        await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userProgress)
        });
    } catch (e) {
        // Also clear localStorage fallback
        localStorage.removeItem('catTimerProgress');
    }
}

if (resetAllBtn) {
    resetAllBtn.addEventListener('click', resetAllData);
}


// Initializes the application by fetching data and setting up the UI
async function initializeApplication() {
    await fetchRoadmapData();
    await loadUserProgress();

    // Compute official start (coming Monday) and whether schedule has started
    scheduleStartDate = computeNextMondayStartDate();
    const nowInit = new Date();
    scheduleHasStarted = true; // Treat schedule as started

    // Choose defaults based on today, and only restore last state if it matches today's session selection
    currentWeek = Object.keys(roadmapData)[0] || 'Week 1';
    initializeCurrentDate();
    const restored = userProgress.lastState &&
        userProgress.lastState.currentWeek === currentWeek &&
        userProgress.lastState.currentDay === currentDay;
    if (restored) {
        applySavedState(userProgress.lastState);
    } else {
        // Reset timer to full duration for a clean start
        timerType = 'all';
        timerSeconds = timerDurations[timerType];
        originalTimerSeconds = timerSeconds;
        isOvertime = false;
        overtimeSeconds = 0;
        updateWeekDisplay();
        updateTimerDisplay();
    }
    updateProgressDisplay();
    initializeCharts();

    pauseTimerBtn.innerHTML = '<i class="fas fa-play"></i>';
    updateCompleteButtonState();
    updateDayButtonStatus();

    // Set today references for permission logic
    const weeks = Object.keys(roadmapData);
    todayWeekIndex = weeks.indexOf(currentWeek);
    todayDayKey = currentDay;
    updateInteractionLockUI();
}

// Start the application
initializeApplication();



// Test function to mark Monday as complete (for testing)
function testMarkMondayComplete() {
    const mondayMorning = `${currentWeek}-monday-morning`;
    const mondayNight = `${currentWeek}-monday-night`;
    
    if (!userProgress.completedTasks.includes(mondayMorning)) {
        userProgress.completedTasks.push(mondayMorning);
    }
    if (!userProgress.completedTasks.includes(mondayNight)) {
        userProgress.completedTasks.push(mondayNight);
    }
    
    saveUserProgress();
    updateProgressDisplay();
    updateCompleteButtonState();
    updateDayButtonStatus();
    console.log('Monday marked as complete for testing');
}

// Debug function to check current state
function debugCurrentState() {
    console.log('Current Week:', currentWeek);
    console.log('Current Day:', currentDay);
    console.log('Current Session:', currentSession);
    console.log('Completed Tasks:', userProgress.completedTasks);
    console.log('Is Monday completed:', isDayCompleted(currentWeek, 'monday'));
    console.log('Is current task completed:', isTaskCompleted());
}

// Make functions available globally for debugging
window.testMarkMondayComplete = testMarkMondayComplete;
window.debugCurrentState = debugCurrentState;
window.updateDayButtonStatus = updateDayButtonStatus;
function initializeCurrentDate() {
    const startDate = new Date(SCHEDULE_START_DATE); // Use configured schedule start
    const now = new Date();

    // Set time to 00:00:00 for accurate day calculation
    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const currentWeekIndex = Math.floor(diffDays / 7);
    const currentDayIndex = diffDays % 7;

    const weeks = Object.keys(roadmapData);
    if (currentWeekIndex < weeks.length) {
        currentWeek = weeks[currentWeekIndex];
    }

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (currentDayIndex < days.length) {
        currentDay = days[currentDayIndex];
    }

    // Activate the current day button
    dayBtns.forEach(btn => {
        if (btn.dataset.day === currentDay) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
