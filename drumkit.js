// Ses dosyalarını tanımlayın
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

// Drum pad'leri oluşturun
document.addEventListener("DOMContentLoaded", function () {
  const drumMachine = document.getElementById("drum-machine");

  for (let alphabet of "ASDFGHJKL") {
    const newElement = document.createElement("div");
    newElement.classList.add("drum-pad");

    // Drum pad içeriği
    const padContent = document.createElement("div");
    padContent.classList.add("pad-content");

    const padText = document.createElement("div");
    padText.classList.add("pad-text");
    padText.textContent = alphabet;

    const soundName = document.createElement("p");
    soundName.classList.add("sound-name");
    soundName.textContent = soundFiles[alphabet].split("/").pop().split(".")[0]; // Dosya adını al

    // İçeriği drum pad'e ekleyin
    padContent.appendChild(padText);
    padContent.appendChild(soundName);
    newElement.appendChild(padContent);

    // Her bir drum pad için tıklama olayını ekleyin
    newElement.addEventListener("click", function () {
      const audio = new Audio(soundFiles[alphabet]);
      audio.play();

      // Sesin şiddetine göre dalgalar oluşturun
      createWaveEffect();

      // Anahtar için glow efekti
      newElement.classList.add("playing");
      setTimeout(() => newElement.classList.remove("playing"), 500); // Glow efekti 500ms sonra kaybolur
    });

    drumMachine.appendChild(newElement);
  }

  // Ana görsel halka oluştur
  const mainVisualizer = document.querySelector(".main-visualizer");
});

function createWaveEffect() {
  // Renk seçeneklerini tanımlayın
  const colors = ["#FF00FF", "#FF1493", "#FFFF00", "#FF4500"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // İç içe dalgalar oluşturun
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement("div");
    wave.classList.add("wave");
    wave.style.borderColor = color;
    wave.style.width = `${50 + i * 40}px`; // Dalga genişliği
    wave.style.height = `${50 + i * 40}px`; // Dalga yüksekliği
    wave.style.top = "50%";
    wave.style.left = "50%";
    wave.style.transform = "translate(-50%, -50%)";
    wave.style.opacity = 1;
    wave.style.borderWidth = `${i + 2}px`; // Dalga sınırı genişliği

    document.querySelector(".main-visualizer").appendChild(wave);

    // Dalga etkisini başlat
    wave.style.animation = "wave-animation 1s forwards";

    // Dalga etkisini tamamlandıktan sonra kaldır
    setTimeout(() => {
      wave.remove();
    }, 1000); // Dalga 1 saniye sonra kaldırılır
  }
}
