const card = document.getElementById("card");
const tiltToggle = document.getElementById("tiltToggle");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

let tiltOn = true;

function setGlow(event) {
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  card.style.setProperty("--mx", `${x}%`);
  card.style.setProperty("--my", `${y}%`);
}

function tiltCard(event) {
  if (!tiltOn) return;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  const rotateY = (x - 0.5) * 16;
  const rotateX = (0.5 - y) * 12;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetCard() {
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

card.addEventListener("mousemove", (event) => {
  setGlow(event);
  tiltCard(event);
});

card.addEventListener("mouseleave", resetCard);

tiltToggle.addEventListener("click", () => {
  tiltOn = !tiltOn;
  tiltToggle.setAttribute("aria-pressed", String(tiltOn));
  tiltToggle.textContent = tiltOn ? "기울임 효과 켜짐" : "기울임 효과 꺼짐";
  resetCard();
});

copyBtn.addEventListener("click", async () => {
  const text = [
    "정재진",
    "바이브코딩 공부중",
    "아이디어를 바로 코드로 만드는 바이브 코더가 되고 싶어요.",
    "or71zzz@gmail.com",
    "010-2769-8609",
    "https://www.youtube.com/@or71zzz",
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    showToast("명함 정보를 복사했어요");
  } catch {
    showToast("복사에 실패했어요");
  }
});
