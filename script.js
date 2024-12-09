// Object to hold audio elements for each sound
var sounds = {};

// Select all sound buttons and add click event listeners
document.querySelectorAll('.sound-button').forEach(button => {
  button.addEventListener('click', function() {
    var soundName = this.getAttribute('data-sound');

    // If the audio for this sound doesn't exist, create it
    if (!sounds[soundName]) {
      sounds[soundName] = new Audio('sounds/' + soundName + '.mp3');
      sounds[soundName].onerror = function() {
        console.error('Error loading sound: ' + soundName + '.mp3');
      };
    }

    // If the sound is paused or has ended, play it from the start
    if (sounds[soundName].paused || sounds[soundName].ended) {
      sounds[soundName].play();
    } else {
      // If the sound is playing, pause it and reset to the beginning
      sounds[soundName].pause();
      sounds[soundName].currentTime = 0;
    }
  });
});
