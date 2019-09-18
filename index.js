const selectBtn = document.getElementById('selectBtn');

selectBtn.addEventListener('change', (e) => {
    
    localStorage.setItem('subject', e.target.value)
    return window.location.assign('/game.html')
})