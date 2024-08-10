// Define sound files
const soundFiles = {
  A: "sounds/clap.wav",
  S: "sounds/hihat.wav",
  D: "sounds/kick.wav",
  F: "sounds/openhat.wav",
  G: "sounds/boom.wav",
  H: "sounds/ride.wav",
  J: "sounds/snare.wav",
  K: "sounds/tom.wav",
  L: "sounds/tink.wav",
};

// Create drum pads
document.addEventListener("DOMContentLoaded", function () {
  const drumMachine = document.getElementById("drum-machine");

  for (let alphabet of "ASDFGHJKL") {
    const newElement = document.createElement("div");
    newElement.classList.add("drum-pad");
    newElement.setAttribute("data-key", alphabet);

    // Drum pad content
    const padContent = document.createElement("div");
    padContent.classList.add("pad-content");

    const padText = document.createElement("div");
    padText.classList.add("pad-text");
    padText.textContent = alphabet;

    const soundName = document.createElement("p");
    soundName.classList.add("sound-name");
    soundName.textContent = soundFiles[alphabet].split("/").pop().split(".")[0]; // Get file name

    // Add content to drum pad
    padContent.appendChild(padText);
    padContent.appendChild(soundName);
    newElement.appendChild(padContent);

    // Add click event for each drum pad
    newElement.addEventListener("click", function () {
      playSound(alphabet);
      createWaveEffect();
    });

    drumMachine.appendChild(newElement);
  }

  // Handle keydown event
  window.addEventListener("keydown", function (e) {
    const key = e.key.toUpperCase();
    if (soundFiles[key]) {
      playSound(key);
      createWaveEffect();
      const drumPad = document.querySelector(`.drum-pad[data-key="${key}"]`);
      if (drumPad) {
        drumPad.classList.add("playing");
        setTimeout(() => drumPad.classList.remove("playing"), 500); // Glow effect fades out after 500ms
      }
    }
  });
});

function playSound(key) {
  const audio = new Audio(soundFiles[key]);
  audio.play();
}

function createWaveEffect() {
  // Define color options
  const colors = ["#FF00FF", "#FF1493", "#FFFF00", "#FF4500"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Create nested waves
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement("div");
    wave.classList.add("wave");
    wave.style.borderColor = color;
    wave.style.width = `${50 + i * 40}px`; // Wave width
    wave.style.height = `${50 + i * 40}px`; // Wave height
    wave.style.top = "50%";
    wave.style.left = "50%";
    wave.style.transform = "translate(-50%, -50%)";
    wave.style.opacity = 1;
    wave.style.borderWidth = `${i + 2}px`; // Wave border width

    document.querySelector(".main-visualizer").appendChild(wave);

    // Start wave animation
    wave.style.animation = "wave-animation 1s forwards";

    // Remove wave after animation completes
    setTimeout(() => {
      wave.remove();
    }, 1000); // Wave removed after 1 second
  }
}
