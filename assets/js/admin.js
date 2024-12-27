const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})


Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.lectureName}</td>
        <td>${order.lectureNumber}</td>
        <td>${order.hall}</td>
        <td>${order.time}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});

const isAdmin = localStorage.getItem('isAdmin');
if (!isAdmin) {
  // Redirect to login page if not an admin
  window.location.href = 'admin.html';
}

// Get elements
const addSpeakerButton = document.getElementById('add_speakers');
const popup = document.getElementById('login-popup');
const closeButton = popup.querySelector('.close');
const addSpeakerForm = document.getElementById('addSpeakerForm');

// Show popup when "Add Speaker" button is clicked
addSpeakerButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

// Hide popup when close button is clicked
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Hide popup when clicking outside the popup content
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});