// Array of engaging, historically and socially relevant quotes
const democracyQuotes = [
    { text: "Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience.", author: "Dr. B.R. Ambedkar" },
    { text: "The heavy power of the vote is the most powerful instrument ever devised by man for breaking down injustice.", author: "Lyndon B. Johnson" },
    { text: "In a democracy, the individual mind remains the supreme and ultimate engine of human progress.", author: "Alternative Insight" },
    { text: "The progress of a nation is best measured by the democratic spaces created for its most vulnerable citizens.", author: "Civic Philosophy" }
];

// Change quote every 7 seconds
let quoteIndex = 0;
setInterval(() => {
    quoteIndex = (quoteIndex + 1) % democracyQuotes.length;
    const displayEl = document.getElementById('quoteDisplay');
    const authorEl = document.getElementById('quoteAuthor');
    
    if (displayEl && authorEl) {
        displayEl.style.opacity = 0;
        authorEl.style.opacity = 0;
        
        setTimeout(() => {
            displayEl.innerText = `"${democracyQuotes[quoteIndex].text}"`;
            authorEl.innerText = `— ${democracyQuotes[quoteIndex].author}`;
            displayEl.style.opacity = 1;
            authorEl.style.opacity = 1;
        }, 300);
    }
}, 7000);

// Interactive Poll logic
let voteCast = false;
document.querySelectorAll('.poll-option').forEach(element => {
    element.addEventListener('click', function() {
        if (voteCast) return; // Prevent multiple voting
        
        voteCast = true;
        
        // Highlight chosen item
        this.classList.add('selected');
        
        // Show all results
        document.querySelectorAll('.poll-option').forEach(opt => {
            const percentSpan = opt.querySelector('.percentage');
            if (percentSpan) percentSpan.style.display = 'inline';
            opt.style.cursor = 'default';
        });
        
        // Update prompt text
        const statusEl = document.getElementById('pollStatus');
        if (statusEl) statusEl.innerText = "Thank you for participating! Results updated in real-time.";
    });
});

// Call-to-action button event
const shareBtn = document.getElementById('shareVoiceBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        alert('Welcome to the sandbox interface! In the live website, this button triggers a non-partisan portal to post your local community agendas, petition templates, or policy suggestions.');
    });
}
