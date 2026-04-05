const moveRandom = document.querySelector("#move-random");

function moveRandomEl(elm) {
  elm.style.position = "absolute";
  
  // Calculate random positions within 5% to 85% of viewport to avoid edges
  const randomX = Math.floor(Math.random() * 80 + 5);
  const randomY = Math.floor(Math.random() * 80 + 5);
  
  elm.style.top = randomY + "%";
  elm.style.left = randomX + "%";
  
  // Add a slight transition for smoothness
  elm.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
}

if (moveRandom) {
  moveRandom.addEventListener("mouseenter", function (e) {
    moveRandomEl(e.target);
  });

  moveRandom.addEventListener("click", function (e) {
    e.preventDefault();
    moveRandomEl(e.target);
  });
}

// Global audio playback & synchronization handler
const audio = document.querySelector("#bg-music");

if (audio) {
  // Restore playback position
  const savedTime = sessionStorage.getItem("musicTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // Save playback position periodically
  audio.addEventListener("timeupdate", () => {
    sessionStorage.setItem("musicTime", audio.currentTime);
  });

  // Handle cross-page autoplay
  const playAudio = () => {
    audio.play().catch(err => console.log("Autoplay blocked:", err));
  };

  // If already interacted in this session, try to play immediately
  if (sessionStorage.getItem("interacted") === "true") {
    playAudio();
  }

  // Interaction listener to start music and "unlock" it for following pages
  document.addEventListener("click", () => {
    sessionStorage.setItem("interacted", "true");
    playAudio();
  }, { once: true });
}
