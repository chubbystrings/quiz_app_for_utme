const selectBtn = document.getElementById('selectBtn');
const quickPlayBtn = document.getElementById('quickPlayBtn');

selectBtn.addEventListener('change', (e) => {
    if(e.target.value === "Select Subject"){
        e.preventDefault();
        return false;
    }
    
    localStorage.setItem('subject', e.target.value)
    return window.location.assign('/game.html')
})

quickPlayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('subject')
    return window.location.assign('/game.html')
})
