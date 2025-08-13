// CAT 2025 Roadmap Data Structure
let roadmapData = {};

// Function to fetch roadmap data from the server
async function fetchRoadmapData() {
    try {
        const response = await fetch('/api/roadmap', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        roadmapData = await response.json();
        return roadmapData;
    } catch (error) {
        console.error("Could not fetch roadmap data:", error);
        return {};
    }
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
let scheduleStartDate = null; // Date object at 00:00 local
let scheduleHasStarted = false;
let todayWeekIndex = 0;
let todayDayKey = 'monday';

function computeNextMondayStartDate() {
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
        updateTaskDetails();
    });
});

sessionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sessionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSession = btn.dataset.session;
        updateTaskDetails();
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
    scheduleHasStarted = nowInit >= scheduleStartDate;

    // If there is a saved last state, restore it. Otherwise, choose defaults.
    if (userProgress.lastState) {
        applySavedState(userProgress.lastState);
    } else {
        currentWeek = Object.keys(roadmapData)[0] || 'Week 1';
        initializeCurrentDate();
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
    const startDate = new Date('2025-08-04T00:00:00.000+05:30'); // August 4, 2025, 00:00:00 IST
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
