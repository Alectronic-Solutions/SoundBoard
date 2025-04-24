// Object to hold audio elements for each sound
var sounds = {};

// Preload all sounds to reduce playback delay
function preloadSounds() {
    const soundBoard = document.getElementById('soundBoard');
    const buttons = soundBoard.querySelectorAll('.sound-button');
    buttons.forEach(button => {
        const soundName = button.getAttribute('data-sound');
        if (!sounds[soundName]) {
            const audio = new Audio(`sounds/${soundName}.mp3`);
            audio.preload = 'auto'; // Preload the audio file
            audio.onerror = () => console.error(`Error preloading sound: ${soundName}.mp3`);
            sounds[soundName] = audio;
        }
    });
}

let currentAudio = null; // Track the currently playing audio

// Play sound with toggle functionality and update playback bar
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', function () {
        const soundName = this.getAttribute('data-sound');
        const playbackBar = document.getElementById('playbackBar');
        const playbackProgress = document.getElementById('playbackProgress');
        const currentTrackName = document.getElementById('currentTrackName');
        const currentTime = document.getElementById('currentTime');
        const totalTime = document.getElementById('totalTime');

        // Ensure the sound is preloaded
        if (!sounds[soundName]) {
            console.error(`Sound not preloaded: ${soundName}`);
            return;
        }

        const audio = sounds[soundName];

        // If the same audio is playing, stop it
        if (currentAudio === audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0; // Reset to the start
            playbackBar.style.display = 'none'; // Hide playback bar
            currentAudio = null;
            return;
        }

        // Stop any currently playing audio
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // Play the selected audio
        currentAudio = audio;
        audio.currentTime = 0;
        audio.play().catch(err => console.error(`Error playing sound: ${soundName}`, err));

        // Update playback bar
        playbackBar.style.display = 'flex';
        currentTrackName.textContent = soundName;
        totalTime.textContent = formatTime(audio.duration);

        // Update progress and time as the audio plays
        audio.ontimeupdate = () => {
            playbackProgress.value = (audio.currentTime / audio.duration) * 100 || 0;
            currentTime.textContent = formatTime(audio.currentTime);
        };

        // Hide playback bar when the audio ends
        audio.onended = () => {
            playbackBar.style.display = 'none';
            currentAudio = null;
        };
    });
});

// Allow seeking using the playback bar slider
document.getElementById('playbackProgress').addEventListener('input', function () {
    if (currentAudio && currentAudio.duration) {
        currentAudio.currentTime = (this.value / 100) * currentAudio.duration;
    }
});

// Utility function to format time in mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Add functionality to allow seeking using the slider
document.querySelectorAll('.audio-slider').forEach(slider => {
    slider.addEventListener('input', function () {
        const button = this.previousElementSibling; // Get the associated button
        const soundName = button.getAttribute('data-sound');

        // Ensure the sound is preloaded
        if (!sounds[soundName]) {
            console.error(`Sound not preloaded: ${soundName}`);
            return;
        }

        const audio = sounds[soundName];
        if (audio.duration) {
            audio.currentTime = (this.value / 100) * audio.duration; // Seek to the selected position
        }
    });
});

// Drag and Drop functionality
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('dragstart', e => {
        button.classList.add('dragging');
        e.dataTransfer.setData('text/plain', button.dataset.sound);
    });

    button.addEventListener('dragend', () => {
        button.classList.remove('dragging');
    });

    button.addEventListener('dragover', e => {
        e.preventDefault();
        button.classList.add('drag-over');
    });

    button.addEventListener('dragleave', () => {
        button.classList.remove('drag-over');
    });

    button.addEventListener('drop', e => {
        e.preventDefault();
        button.classList.remove('drag-over');
        
        const draggedSound = e.dataTransfer.getData('text/plain');
        const draggedButton = document.querySelector(`[data-sound="${draggedSound}"]`);
        
        if (draggedButton !== button) {
            const soundBoard = document.getElementById('soundBoard');
            const allButtons = [...soundBoard.children];
            const draggedIndex = allButtons.indexOf(draggedButton);
            const droppedIndex = allButtons.indexOf(button);

            if (draggedIndex < droppedIndex) {
                button.parentNode.insertBefore(draggedButton, button.nextSibling);
            } else {
                button.parentNode.insertBefore(draggedButton, button);
            }
        }
    });
});

// Update save layout function to include more button data
function saveLayout() {
    const layout = Array.from(document.querySelectorAll('.sound-button')).map(button => ({
        sound: button.dataset.sound,
        category: button.dataset.category,
        text: button.textContent,
        emoji: button.textContent.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\u0000-\u007F]/g) || []
    }));
    localStorage.setItem('soundboardLayout', JSON.stringify(layout));
}

// Update load layout function to preserve button integrity
function loadLayout() {
    const savedLayout = localStorage.getItem('soundboardLayout');
    if (savedLayout) {
        const layout = JSON.parse(savedLayout);
        const soundBoard = document.getElementById('soundBoard');
        
        // Create a map of current buttons
        const currentButtons = new Map();
        document.querySelectorAll('.sound-button').forEach(button => {
            currentButtons.set(button.dataset.sound, button);
        });
        
        // Clear the soundboard
        soundBoard.innerHTML = '';
        
        // Restore buttons in saved order
        layout.forEach(item => {
            const button = currentButtons.get(item.sound);
            if (button) {
                soundBoard.appendChild(button);
            }
        });
    }
}

// Simplify drag and drop handling
function attachDragAndDropListeners() {
    document.querySelectorAll('.sound-button').forEach(button => {
        button.addEventListener('dragstart', e => {
            button.classList.add('dragging');
            e.dataTransfer.setData('text/plain', button.dataset.sound);
        });

        button.addEventListener('dragend', () => {
            button.classList.remove('dragging');
            saveLayout();
        });

        button.addEventListener('dragover', e => {
            e.preventDefault();
        });

        button.addEventListener('drop', e => {
            e.preventDefault();
            const draggedSound = e.dataTransfer.getData('text/plain');
            const draggedButton = document.querySelector(`[data-sound="${draggedSound}"]`);
            
            if (draggedButton && draggedButton !== button) {
                const rect = button.getBoundingClientRect();
                const dropY = e.clientY - rect.top;
                const insertAfter = dropY > rect.height / 2;
                
                button.parentNode.insertBefore(
                    draggedButton,
                    insertAfter ? button.nextSibling : button
                );
            }
        });
    });
}

// Save layout on any drag operation
document.getElementById('soundBoard').addEventListener('dragend', () => {
    setTimeout(saveLayout, 100); // Small delay to ensure DOM is updated
});

// Load saved layout on page load
document.addEventListener('DOMContentLoaded', loadLayout);

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    document.querySelectorAll('.sound-button').forEach(button => {
        const soundName = button.textContent.toLowerCase();
        const buttonCategory = button.dataset.category;
        const matchesSearch = soundName.includes(searchTerm);
        const matchesCategory = category === 'all' || buttonCategory === category;
        
        button.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
    });
});

// Stop all sounds
document.getElementById('stopAll').addEventListener('click', function() {
    Object.values(sounds).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    document.querySelectorAll('.sound-button').forEach(button => {
        button.classList.remove('active');
    });
});

// Category filter functionality
document.getElementById('categoryFilter').addEventListener('change', function(e) {
    const category = e.target.value;
    document.querySelectorAll('.sound-button').forEach(button => {
        if (category === 'all' || button.dataset.category === category) {
            button.style.display = '';
        } else {
            button.style.display = 'none';
        }
    });
});

// Function to update row colors based on current position
function updateRowColors() {
    document.querySelectorAll('.sound-button').forEach((button, index) => {
        const rowIndex = Math.floor(index / 9);
        const colorIndex = (rowIndex % 24) + 1;
        button.setAttribute('data-row', rowIndex);
        button.setAttribute('data-color-index', colorIndex);
    });
}

// Add row color update after drag operations
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('dragend', () => {
        setTimeout(() => {
            updateRowColors();
            saveLayout();
        }, 100);
    });
});

// Check for sounds in folder and create buttons if needed
async function initializeSoundBoard() {
    try {
        const soundBoard = document.getElementById('soundBoard');
        const response = await fetch('sounds/list.php'); // You'll need to create this PHP file
        const soundFiles = await response.json();
        
        soundFiles.forEach(soundFile => {
            const soundName = soundFile.replace('.mp3', '');
            if (!document.querySelector(`[data-sound="${soundName}"]`)) {
                const button = document.createElement('button');
                button.className = 'sound-button';
                button.draggable = true;
                button.setAttribute('data-sound', soundName);
                button.setAttribute('data-category', 'uncategorized');
                button.textContent = soundName;
                soundBoard.appendChild(button);
            }
        });
        
        updateRowColors();
        attachDragAndDropListeners();
    } catch (error) {
        console.error('Error initializing sound board:', error);
    }
}

// Function to check if sound files exist
function checkSoundFile(soundName) {
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.onerror = () => {
        console.error(`Missing sound file: ${soundName}.mp3`);
    };
    return audio;
}

// Initialize sound board with new files
function initializeSoundBoard() {
    document.querySelectorAll('.sound-button').forEach(button => {
        const soundName = button.dataset.sound;
        if (!sounds[soundName]) {
            sounds[soundName] = checkSoundFile(soundName);
        }
    });
    updateRowColors();
}

// Function to update colors based on position
function updateButtonColors() {
    const colors = [
        'color-1', 'color-2', 'color-3', 'color-4', 
        'color-5', 'color-6', 'color-7', 'color-8'
    ];
    document.querySelectorAll('.sound-button').forEach((button, index) => {
        const colorIndex = Math.floor(index / 12) % colors.length;
        button.className = `sound-button ${colors[colorIndex]}`;
    });
}

// Add color update after drag operations
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('dragend', () => {
        setTimeout(() => {
            updateButtonColors();
            saveLayout();
        }, 100);
    });
});

// Update the initialization to handle new sounds
document.addEventListener('DOMContentLoaded', () => {
    preloadSounds(); // Preload all sounds
    loadLayout();
    updateButtonColors(); // Update colors on load
    attachDragAndDropListeners();
    
    // Verify all sound files are loaded
    const requiredSounds = [
        "Banned from micky mouse club for inappropriate",
        "Obama if we are racist",
        "Mission failed",
        "Ladies and Gentlemen we got em",
        "Wow kid",
        "Ive fallen and I can't get up",
        "I think moto like you",
        "I dropped my monster condom",
        "How it feels to chew 5 gum",
        "Hell naw",
        "Wasted",
        "Get help",
        "Future army soldier",
        "Free credit report",
        "Does he look like a bitch",
        "English do you speak it",
        "Do you ever look at someone and wonder what they are thinking",
        "Do I look like I know what a Jpeg is",
        "CSI Yeah",
        "Bing bing bong Thomas the train and Donald Trump",
        "Are you sure about that",
        "Accidents Happen",
        "Woodpecker",
        "Wolf",
        "Sheep",
        "Pig",
        "Monkey",
        "Horse Whinny",
        "Horse Running",
        "Dinosaur Groan",
        "Camel",
        "Piglet Squel",
        "British",
        "Airplane",
        "Helicopter",
        "What da dog do",
        "India",
        "Let her go",
        "Where is the lamb sauce"
    ];
    
    requiredSounds.forEach(sound => {
        if (!sounds[sound]) {
            sounds[sound] = checkSoundFile(sound);
        }
    });
});