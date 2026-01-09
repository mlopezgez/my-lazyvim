// Progress Tracking Module for Vim Ninja Guide
// Uses localStorage to persist user progress across sessions

(function() {
    'use strict';

    const STORAGE_KEY = 'vim-ninja-guide-progress';
    const LESSONS = ['01', '02', '03', '04', '05', '06'];

    // Initialize progress data structure
    function getDefaultProgress() {
        return {
            lessons: {
                '01': { completed: false, timeSpent: 0 },
                '02': { completed: false, timeSpent: 0 },
                '03': { completed: false, timeSpent: 0 },
                '04': { completed: false, timeSpent: 0 },
                '05': { completed: false, timeSpent: 0 },
                '06': { completed: false, timeSpent: 0 }
            },
            lastVisited: null,
            totalTimeSpent: 0
        };
    }

    // Load progress from localStorage
    function loadProgress() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading progress:', e);
        }
        return getDefaultProgress();
    }

    // Save progress to localStorage
    function saveProgress(progress) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Error saving progress:', e);
        }
    }

    // Get current progress
    window.getProgress = function() {
        return loadProgress();
    };

    // Mark lesson as complete
    window.markLessonComplete = function(lessonId, completed = true) {
        const progress = loadProgress();
        if (progress.lessons[lessonId]) {
            progress.lessons[lessonId].completed = completed;
            saveProgress(progress);
            updateProgressDisplay();
        }
    };

    // Add time spent on lesson
    window.addLessonTime = function(lessonId, minutes) {
        const progress = loadProgress();
        if (progress.lessons[lessonId]) {
            progress.lessons[lessonId].timeSpent += minutes;
            progress.totalTimeSpent += minutes;
            saveProgress(progress);
            updateProgressDisplay();
        }
    };

    // Set last visited lesson
    window.setLastVisited = function(lessonId) {
        const progress = loadProgress();
        progress.lastVisited = lessonId;
        saveProgress(progress);
    };

    // Reset all progress
    window.resetProgress = function() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    };

    // Get completion statistics
    function getStats() {
        const progress = loadProgress();
        let completed = 0;
        let totalTime = 0;

        LESSONS.forEach(lessonId => {
            if (progress.lessons[lessonId] && progress.lessons[lessonId].completed) {
                completed++;
            }
            totalTime += progress.lessons[lessonId]?.timeSpent || 0;
        });

        return {
            completed,
            total: LESSONS.length,
            percentage: Math.round((completed / LESSONS.length) * 100),
            totalTime: Math.round(totalTime)
        };
    }

    // Update progress display on the page
    function updateProgressDisplay() {
        const stats = getStats();

        // Update progress bar
        const progressBar = document.getElementById('overall-progress-bar');
        if (progressBar) {
            progressBar.style.width = stats.percentage + '%';
        }

        // Update completed lessons count
        const completedEl = document.getElementById('completed-lessons');
        if (completedEl) {
            completedEl.textContent = stats.completed;
        }

        // Update total time
        const timeEl = document.getElementById('total-time');
        if (timeEl) {
            timeEl.textContent = stats.totalTime;
        }

        // Update progress indicator in header
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `${stats.completed}/${stats.total} Completed`;
        }

        // Update lesson card checkboxes
        const progress = loadProgress();
        LESSONS.forEach(lessonId => {
            const checkbox = document.getElementById(`lesson-${lessonId}-complete`);
            if (checkbox && progress.lessons[lessonId]) {
                checkbox.checked = progress.lessons[lessonId].completed;
            }
        });

        // Update lesson card CTA text
        LESSONS.forEach(lessonId => {
            const card = document.querySelector(`[data-lesson="${lessonId}"]`);
            if (card && progress.lessons[lessonId]) {
                const cta = card.querySelector('.lesson-cta');
                if (cta) {
                    if (progress.lessons[lessonId].completed) {
                        cta.textContent = 'Review Lesson';
                    } else if (progress.lessons[lessonId].timeSpent > 0) {
                        cta.textContent = 'Continue';
                    } else {
                        cta.textContent = 'Start Lesson';
                    }
                }
            }
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        updateProgressDisplay();

        // Set up lesson checkbox event listeners
        LESSONS.forEach(lessonId => {
            const checkbox = document.getElementById(`lesson-${lessonId}-complete`);
            if (checkbox) {
                checkbox.addEventListener('change', function() {
                    markLessonComplete(lessonId, this.checked);
                });
            }
        });

        // Set up reset progress button
        const resetBtn = document.getElementById('reset-progress');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetProgress);
        }

        // Track time spent on lesson pages (if on a lesson page)
        const currentLesson = detectCurrentLesson();
        if (currentLesson) {
            setLastVisited(currentLesson);

            // Track time every minute
            let minutesOnPage = 0;
            setInterval(function() {
                minutesOnPage++;
                addLessonTime(currentLesson, 1);
            }, 60000); // Every 60 seconds

            // Add time when leaving the page
            window.addEventListener('beforeunload', function() {
                if (minutesOnPage > 0) {
                    addLessonTime(currentLesson, minutesOnPage);
                }
            });
        }
    });

    // Detect which lesson page we're on
    function detectCurrentLesson() {
        const path = window.location.pathname;
        const match = path.match(/(\d{2})-[a-z-]+\.html/);
        if (match) {
            return match[1];
        }
        return null;
    }

})();
