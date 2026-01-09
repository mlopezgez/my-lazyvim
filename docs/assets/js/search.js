// Keybind Search Module for Vim Ninja Guide
// Provides fuzzy search across all keybinds

(function() {
    'use strict';

    let keybindsData = [];
    let selectedIndex = 0;

    // Simple fuzzy search implementation
    function fuzzyMatch(text, query) {
        text = text.toLowerCase();
        query = query.toLowerCase();

        let queryIndex = 0;
        let textIndex = 0;
        let score = 0;

        while (queryIndex < query.length && textIndex < text.length) {
            if (query[queryIndex] === text[textIndex]) {
                score += 1;
                queryIndex++;
            }
            textIndex++;
        }

        return queryIndex === query.length ? score : 0;
    }

    // Search keybinds
    function searchKeybinds(query) {
        if (!query || query.trim() === '') {
            return [];
        }

        const results = keybindsData
            .map(kb => {
                // Calculate scores for different fields
                const keyScore = fuzzyMatch(kb.key, query) * 3;
                const descScore = fuzzyMatch(kb.description, query) * 2;
                const catScore = fuzzyMatch(kb.category, query);
                const totalScore = keyScore + descScore + catScore;

                return { ...kb, score: totalScore };
            })
            .filter(kb => kb.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Return top 10 results

        return results;
    }

    // Render search results
    function renderResults(results) {
        const resultsContainer = document.getElementById('search-results');

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">
                    No keybinds found. Try a different search term.
                </p>
            `;
            return;
        }

        resultsContainer.innerHTML = results.map((kb, index) => `
            <div class="search-result-item ${index === selectedIndex ? 'selected' : ''}" data-index="${index}">
                <div class="result-keybind">
                    <kbd style="background: var(--bg-primary); padding: 0.25rem 0.5rem; border-radius: 4px; color: var(--accent-blue);">${escapeHtml(kb.key)}</kbd>
                    <span class="mode-badge">${kb.mode}</span>
                </div>
                <div class="result-description">${escapeHtml(kb.description)}</div>
                <div class="result-meta">
                    <span class="category-badge">${kb.category}</span>
                    ${kb.note ? `<span style="color: var(--text-muted); margin-left: 0.5rem;">• ${escapeHtml(kb.note)}</span>` : ''}
                </div>
            </div>
        `).join('');

        // Add click handlers
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                navigateToResult(results[index]);
            });
        });
    }

    // Navigate to lesson section for selected keybind
    function navigateToResult(keybind) {
        const lessonUrl = `${keybind.lesson}.html#${keybind.section}`;
        window.location.href = lessonUrl;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Open search modal
    function openSearchModal() {
        const modal = document.getElementById('search-modal');
        const input = document.getElementById('search-input');

        if (modal && input) {
            modal.classList.add('active');
            input.value = '';
            input.focus();
            selectedIndex = 0;

            // Show initial empty state
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = `
                <p style="color: var(--text-muted); text-align: center; padding: 2rem;">
                    Type to search 113 keybinds...
                </p>
            `;
        }
    }

    // Close search modal
    function closeSearchModal() {
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Initialize search functionality
    document.addEventListener('DOMContentLoaded', async function() {
        // Load keybinds data
        try {
            const response = await fetch('../assets/data/keybinds.json');
            const data = await response.json();
            keybindsData = data.keybinds;
        } catch (error) {
            console.error('Error loading keybinds data:', error);
        }

        // Set up search trigger buttons
        const searchTriggers = [
            document.getElementById('search-trigger'),
            document.getElementById('quick-search-trigger')
        ];

        searchTriggers.forEach(trigger => {
            if (trigger) {
                trigger.addEventListener('click', openSearchModal);
            }
        });

        // Set up search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value;
                const results = searchKeybinds(query);
                selectedIndex = 0;
                renderResults(results);
            });
        }

        // Set up modal close on background click
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeSearchModal();
                }
            });
        }

        // Global keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Open search with /
            if (e.key === '/' && !isInputFocused()) {
                e.preventDefault();
                openSearchModal();
                return;
            }

            // Close search with Escape
            if (e.key === 'Escape') {
                closeSearchModal();
                return;
            }

            // Navigate results with arrow keys (only when modal is open)
            if (modal && modal.classList.contains('active')) {
                const resultsContainer = document.getElementById('search-results');
                const results = resultsContainer.querySelectorAll('.search-result-item');

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
                    updateSelection();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    updateSelection();
                } else if (e.key === 'Enter' && results.length > 0) {
                    e.preventDefault();
                    const query = searchInput.value;
                    const searchResults = searchKeybinds(query);
                    if (searchResults[selectedIndex]) {
                        navigateToResult(searchResults[selectedIndex]);
                    }
                }
            }
        });

        function updateSelection() {
            const results = document.querySelectorAll('.search-result-item');
            results.forEach((item, index) => {
                if (index === selectedIndex) {
                    item.classList.add('selected');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('selected');
                }
            });
        }

        function isInputFocused() {
            const activeElement = document.activeElement;
            return activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.isContentEditable
            );
        }
    });

})();
