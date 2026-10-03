const $ = (id) => document.getElementById(id);

const book = $("book");
const openCard = $("openCard");
const cover = $("bookCover");
const prevPage = $("prevPage");
const nextPage = $("nextPage");
const pageStatus = $("pageStatus");
const customizer = $("customizer");
const customizeToggle = $("customizeToggle");
const closeCustomizer = $("closeCustomizer");
const applyChanges = $("applyChanges");
const resetChanges = $("resetChanges");
const messageDisplay = $("messageDisplay");
const pageTitle = $("pageTitle");
const senderDisplay = $("senderDisplay");
const teacherPhoto = $("teacherPhoto");
const captionDisplay = $("photoCaption");
const teacherName = $("teacherName");
const senderName = $("senderName");
const messageInput = $("messageInput");
const photoInput = $("photoInput");
const audioInput = $("audioInput");
const accentInput = $("accentInput");
const captionInput = $("captionInput");
const cardAudio = $("cardAudio");
const playAudioToggle = $("playAudioToggle");

let page = 0; // 0 cover, 1 opened book
let photoURL = "teacher-photo.jpg";
let audioURL = "";

const defaultData = {
  teacher: "Teacher",
  sender: "Your Student",
  message: "Happy Teachers’ Day! Thank you for your patience, guidance, and dedication. Your lessons inspire us to learn, grow, and become better every day. We truly appreciate everything you do! ❤️📚",
  accent: "#d8b36a",
  caption: "A teacher worth celebrating"
};

function render() {
  messageDisplay.textContent = messageInput.value.trim() || defaultData.message;
  pageTitle.textContent = `Dear ${teacherName.value.trim() || "Teacher"},`;
  senderDisplay.textContent = senderName.value.trim() || "Your Student";
  captionDisplay.textContent = captionInput.value.trim() || defaultData.caption;
  document.documentElement.style.setProperty("--gold", accentInput.value || defaultData.accent);
  pageStatus.textContent = page ? "MESSAGE" : "COVER";
  book.classList.toggle("open", page === 1);
}

function openBook() {
  page = 1;
  render();
  burstSparkles();
  if (playAudioToggle.checked && audioURL) {
    cardAudio.play().catch(() => {});
  }
}

function closeBook() {
  page = 0;
  render();
}

openCard.addEventListener("click", openBook);
cover.addEventListener("click", openBook);
nextPage.addEventListener("click", () => page ? closeBook() : openBook());
prevPage.addEventListener("click", () => page ? closeBook() : openBook());

customizeToggle.addEventListener("click", () => {
  customizer.classList.add("show");
  customizer.setAttribute("aria-hidden", "false");
});
closeCustomizer.addEventListener("click", () => {
  customizer.classList.remove("show");
  customizer.setAttribute("aria-hidden", "true");
});
customizer.addEventListener("click", (e) => {
  if (e.target === customizer) closeCustomizer.click();
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (photoURL && photoURL.startsWith("blob:")) URL.revokeObjectURL(photoURL);
  photoURL = URL.createObjectURL(file);
  teacherPhoto.src = photoURL;
});

audioInput.addEventListener("change", () => {
  const file = audioInput.files[0];
  if (!file) return;
  if (audioURL && audioURL.startsWith("blob:")) URL.revokeObjectURL(audioURL);
  audioURL = URL.createObjectURL(file);
  cardAudio.src = audioURL;
  cardAudio.load();
});

applyChanges.addEventListener("click", () => {
  render();
  customizer.classList.remove("show");
  customizer.setAttribute("aria-hidden", "true");
  if (page) burstSparkles();
});

resetChanges.addEventListener("click", () => {
  teacherName.value = defaultData.teacher;
  senderName.value = defaultData.sender;
  messageInput.value = defaultData.message;
  accentInput.value = defaultData.accent;
  captionInput.value = defaultData.caption;
  photoInput.value = "";
  audioInput.value = "";
  photoURL = "teacher-photo.jpg";
  teacherPhoto.src = photoURL;
  if (audioURL && audioURL.startsWith("blob:")) URL.revokeObjectURL(audioURL);
  audioURL = "";
  cardAudio.removeAttribute("src");
  cardAudio.load();
  render();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    customizer.classList.remove("show");
    customizer.setAttribute("aria-hidden", "true");
    closeBook();
  }
  if (e.key === "ArrowRight") openBook();
  if (e.key === "ArrowLeft") closeBook();
});

function createSparkles() {
  const container = $("sparkles");
  for (let i = 0; i < 32; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * -7}s`;
    s.style.animationDuration = `${5 + Math.random() * 6}s`;
    s.style.transform = `scale(${0.5 + Math.random()})`;
    container.appendChild(s);
  }
}
function burstSparkles() {
  const container = $("sparkles");
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = "50%";
    s.style.top = "50%";
    s.style.animation = "none";
    s.style.transition = "transform .9s ease, opacity .9s ease";
    container.appendChild(s);
    requestAnimationFrame(() => {
      const angle = (Math.PI * 2 * i) / 16;
      const distance = 80 + Math.random() * 150;
      s.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 950);
  }
}

createSparkles();
render();
