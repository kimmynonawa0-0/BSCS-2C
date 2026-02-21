// ===== SIMPLE LEFT/RIGHT SLIDESHOW =====
const photoList = [
    'pic3.jpg',   // <- Fix: use simple names like pic1.jpg, not pic1.img.jpg
    'pi1.jpg',
    'pic4.jpg'
];

let currentPhotoIndex = 0;
const photoContainer = document.getElementById('slideshowPhoto');
const prevBtn = document.getElementById('prevPhoto');
const nextBtn = document.getElementById('nextPhoto');

function updatePhoto(index) {
    if (index < 0) index = photoList.length - 1;
    if (index >= photoList.length) index = 0;
    currentPhotoIndex = index;
    photoContainer.style.backgroundImage = `url('${photoList[currentPhotoIndex]}')`;
}

prevBtn.addEventListener('click', () => updatePhoto(currentPhotoIndex - 1));
nextBtn.addEventListener('click', () => updatePhoto(currentPhotoIndex + 1));

// Load first photo
updatePhoto(0);

// ===== TRANSITION TO MAIN APP =====
const landing = document.getElementById('landing');
const app = document.getElementById('app');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    // Blur the photo
    document.querySelector('.photo-container').style.filter = 'blur(10px)';
    document.querySelector('.photo-container').style.transition = 'filter 0.5s';

    // Hide the left/right navigation arrows
    document.querySelector('.nav-arrows').style.display = 'none';

    // Show the app overlay
    app.classList.add('show');
});

// ===== YOUR EXISTING showSchedule FUNCTION (copied from earlier) =====
const exercises = {
    boy: {
        monday: ['Incline Press – 3x10', 'Chest Fly – 3x10', 'Chest Press – 3x10', 'Lat Pulldown(wide)– 3x10', 'Lat Pulldown(closed) – 3x10 ', 'Seated Row Machine – 3x10', 'Shrugs – 3x10'],
        tuesday: ['Shoulder Press – 3x10', 'Side Raises – 3x10', 'Rear Delts – 3x12', 'Rope Pushdown – 3x10','Skull Crusher – 3x10','Tricep Pushdown – 3x10', 'Incline Curl – 3x10', 'Hammer Curl – 3x10'],
        wednesday: ['Deadlift – 3x10', 'Squat Machine – 3x10', 'Leg Press – 3x10', 'Leg Extention – 3x10', 'Leg Curl – 3x10', 'Calf Raises – 3x10'],
        thursday: ['Incline Press – 3x10', 'Chest Fly – 3x10', 'Chest Press – 3x10', 'Lat Pulldown(wide)– 3x10', 'Lat Pulldown(closed) – 3x10 ', 'Seated Row Machine – 3x10', 'Shrugs – 3x10'],
        friday: ['Shoulder Press – 3x10', 'Side Raises – 3x10', 'Rear Delts – 3x12', 'Rope Pushdown – 3x10','Skull Crusher – 3x10','Tricep Pushdown – 3x10', 'Incline Curl – 3x10', 'Hammer Curl – 3x10']
    },
    girl: {
        monday: ['Hip Thrust – 3x10', 'Squat Machine – 3x10', 'Leg Press – 3x10', 'Leg Extention – 3x10', 'Leg Curl – 3x10', 'Calf Raises – 3x10'],
        tuesday: ['Incline Press – 3x10', 'Chest Fly – 3x10', 'Chest Press – 3x10', 'Lat Pulldown(wide)– 3x10', 'Lat Pulldown(closed) – 3x10 ', ' Seated Row Machine – 3x10', 'Shrugs – 3x10'],
        wednesday: ['Hip Thrust – 3x10', 'Squat Machine – 3x10', 'Leg Press – 3x10', 'Leg Extention – 3x10', 'Leg Curl – 3x10', 'Calf Raises – 3x10', ],
        thursday: ['Lat Pulldown(wide)– 3x10', 'Lat Pulldown(closed) – 3x10 ', ' Seated Row Machine – 3x10', 'Shrugs – 3x10', 'Rope Pushdown – 3x10','Skull Crusher – 3x10','Tricep Pushdown – 3x10', 'Incline Curl – 3x10', 'Hammer Curl – 3x10'],
        friday: ['Hip Thrust – 3x10', 'Squat Machine – 3x10', 'Leg Press – 3x10', 'Leg Extention – 3x10', 'Leg Curl – 3x10', 'Calf Raises – 3x10']
    }
};

function showSchedule(gender) {
    const container = document.getElementById('scheduleDisplay');
    let workouts = [];

    if (gender === 'boy') {
        workouts = [
            { day: 'Monday', summary: '🔥 CHEST & BACK' },
            { day: 'Tuesday', summary: '💪 ARMS' },
            { day: 'Wednesday', summary: '🦵 LEGS' },
            { day: 'Thursday', summary: '🔥 CHEST & BACK' },
            { day: 'Friday', summary: '💪  ARMS' }
        ];
    } else {
        workouts = [
            { day: 'Monday', summary: '🍑 LEGS' },
            { day: 'Tuesday', summary: '🔥 CHEST & BACK' },
            { day: 'Wednesday', summary: '🍑 LEGS' },
            { day: 'Thursday', summary: '💪 BACK & ARMS' },
            { day: 'Friday', summary: '🍑 LEGS' }
        ];
    }

    let html = `<div class="schedule-title"> ${gender === 'boy' ? 'BOYS' : 'GIRLS'} WEEK</div>`;
    html += `<div class="week-grid">`;

    workouts.forEach((item) => {
        const dayKey = item.day.toLowerCase();
        const exerciseList = exercises[gender][dayKey];
        html += `
            <div class="day-wrapper">
                <div class="day-card" data-day="${dayKey}" data-gender="${gender}">
                    <span class="day-name">${item.day}</span>
                    <span class="workout-desc">${item.summary}</span>
                </div>
                <div class="exercise-panel" id="panel-${gender}-${dayKey}">
                    <h4>💥 exercises</h4>
                    <ul>
                        ${exerciseList.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;

    document.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const day = this.dataset.day;
        const gender = this.dataset.gender;
        const panel = document.getElementById(`panel-${gender}-${day}`);

        // Close all other exercise panels
        document.querySelectorAll('.exercise-panel').forEach(p => {
            if (p !== panel) p.classList.remove('show');
        });

        // Toggle the clicked panel (open if closed, close if open)
        panel.classList.toggle('show');
    });
});
}
function goHome() {
    // Reset to the first photo
    updatePhoto(0);

    // Unblur the photo
    document.querySelector('.photo-container').style.filter = 'none';

    // Show navigation arrows again
    document.querySelector('.nav-arrows').style.display = '';

    // Hide the app overlay
    app.classList.remove('show');

    // Reset the schedule container to the original empty state
    document.getElementById('scheduleDisplay').innerHTML = `
        <div class="empty-state">
            👆 pick a gender to see the workouts
        </div>
    `;

}
