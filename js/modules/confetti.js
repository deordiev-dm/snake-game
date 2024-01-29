const confettiContainer = document.querySelector(".confetti-container");
export function showConfetti() {
  const confetti = document.createElement("div");
  const emojis = ["🎉", "🚀", "🔥", "🦄", "🌈"];
  confetti.textContent = `${emojis[Math.floor(Math.random() * emojis.length)]}`;
  confetti.style.fontSize = `${Math.round(Math.random() * 32 + 32)}px`;
  confetti.style.zIndex = `${[50, 51][Math.round(Math.random())]}`;
  let time = (confetti.style.animationDuration = `${Math.round(Math.random() * 1500 + 1500)}ms`);
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * innerWidth + "px";
  confettiContainer.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, parseFloat(time));
}
