// HeartScript Love Letter JS (Fixed)
// Utility: Debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Utility: Throttle
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Class: ValentineConfession
class ValentineConfession {
  constructor() {
    this.toggle = document.getElementById("messageToggle");
    this.messageCard = document.getElementById("messageCard");
    this.heartToggle = document.querySelector(".heart-toggle");
    this.container = document.querySelector(".interactive-container");
    this.instruction = document.querySelector(".instruction");
    this.muteToggle = document.getElementById("muteToggle");
    this.recipientName = document.getElementById("recipientName");
    this.senderName = document.getElementById("senderName");
    this.messagePara1 = document.getElementById("messagePara1");
    this.messagePara2 = document.getElementById("messagePara2");
    this.particlesContainer = document.querySelector(".background-particles");

    this.isMuted = false;
    this.currentTheme = "valentine";
    this.audioContext = null;
    this.particleCount = 30;

    this.init();
  }

  init() {
    this.toggle.addEventListener("change", this.handleToggle.bind(this));
    this.muteToggle.addEventListener("change", this.handleMute.bind(this));
    this.setupAccessibility();
    this.loadFromLocalStorage();
    this.setupThemeSwitcher();
    this.createBackgroundParticles();
    window.addEventListener(
      "resize",
      throttle(this.handleResize.bind(this), 200)
    );
  }

  handleToggle(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.openCard();
    } else {
      this.closeCard();
    }
  }

  openCard() {
    this.instruction.classList.add("animate-fadeOut");
    this.instruction.style.opacity = "0";
    this.heartToggle.classList.add("moved");
    setTimeout(() => {
      this.messageCard.classList.add(
        "open",
        "animate-fadeIn",
        "animate-slideIn"
      );
      this.container.classList.add("active");
    }, 400);
    this.createConfetti(80);
    if (!this.isMuted) {
      this.playHeartSound();
    }
    this.messageCard.setAttribute("aria-hidden", "false");
  }

  closeCard() {
    this.messageCard.classList.remove(
      "open",
      "animate-fadeIn",
      "animate-slideIn"
    );
    this.messageCard.classList.add("animate-fadeOut", "animate-slideOut");
    this.container.classList.remove("active");
    this.heartToggle.classList.remove("moved");
    setTimeout(() => {
      this.instruction.style.opacity = "1";
      this.instruction.classList.remove("animate-fadeOut");
    }, 600);
    this.messageCard.setAttribute("aria-hidden", "true");
  }

  createConfetti(count = 80) {
    const colors = ["#ff6b8b", "#ffa7ba", "#ff4757", "#ff3742", "#ffeef2"];
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.top = `${Math.random() * 20 - 10}%`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.width = `${Math.random() * 8 + 4}px`;
      confetti.style.height = `${Math.random() * 8 + 4}px`;
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      document.body.appendChild(confetti);
      const duration = 2500 + Math.random() * 4000;
      const animation = confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(120vh) rotate(${Math.random() * 720}deg)`,
            opacity: 0,
          },
        ],
        { duration, easing: "ease-out" }
      );
      animation.onfinish = () => confetti.remove();
    }
  }

  playHeartSound() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
      this.playTone(523.25, 0.6);
      setTimeout(() => this.playTone(659.25, 0.4), 200);
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  }

  playTone(frequency, duration) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.25;
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  handleMute(event) {
    this.isMuted = event.target.checked;
    StorageManager.set("isMuted", this.isMuted);
  }

  setupAccessibility() {
    this.toggle.setAttribute("aria-expanded", "false");
    this.messageCard.setAttribute("aria-hidden", "true");
    this.toggle.addEventListener("change", () => {
      const expanded = this.toggle.checked;
      this.toggle.setAttribute("aria-expanded", expanded);
      this.messageCard.setAttribute("aria-hidden", !expanded);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.toggle.checked) {
        this.toggle.checked = false;
        this.handleToggle({ target: this.toggle });
      }
      if (
        event.key === "Enter" &&
        document.activeElement === this.heartToggle
      ) {
        this.toggle.checked = !this.toggle.checked;
        this.handleToggle({ target: this.toggle });
      }
    });
    this.messageCard.addEventListener("transitionend", () => {
      if (this.toggle.checked) this.messageCard.focus();
    });
    AccessibilityAuditor.checkARIA(this.toggle);
  }

  loadFromLocalStorage() {
    this.isMuted = StorageManager.get("isMuted") || false;
    this.muteToggle.checked = this.isMuted;
    this.currentTheme = StorageManager.get("theme") || "valentine";
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    this.recipientName.textContent =
      StorageManager.get("recipientName") || "Crush";
    this.senderName.textContent =
      StorageManager.get("senderName") || "Your Secret Admirer";
    this.messagePara1.textContent =
      StorageManager.get("messagePara1") || this.messagePara1.textContent;
    this.messagePara2.textContent =
      StorageManager.get("messagePara2") || this.messagePara2.textContent;
  }

  setupThemeSwitcher() {
    window.changeTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      this.currentTheme = theme;
      StorageManager.set("theme", theme);
      // Force repaint for theme fix
      document.body.style.display = "none";
      document.body.offsetHeight;
      document.body.style.display = "";
      logEvent(`Theme changed to ${theme}`);
    };
  }

  personalizeMessage() {
    const newRecipient = prompt(
      "Enter the recipient's name:",
      this.recipientName.textContent
    )?.trim();
    if (newRecipient) {
      this.recipientName.textContent = newRecipient;
      StorageManager.set("recipientName", newRecipient);
    }
    const newPara1 = prompt(
      "Edit first paragraph:",
      this.messagePara1.textContent
    )?.trim();
    if (newPara1) {
      this.messagePara1.textContent = newPara1;
      StorageManager.set("messagePara1", newPara1);
    }
    const newPara2 = prompt(
      "Edit second paragraph:",
      this.messagePara2.textContent
    )?.trim();
    if (newPara2) {
      this.messagePara2.textContent = newPara2;
      StorageManager.set("messagePara2", newPara2);
    }
    const newSender = prompt(
      "Enter your name/signature:",
      this.senderName.textContent
    )?.trim();
    if (newSender) {
      this.senderName.textContent = newSender;
      StorageManager.set("senderName", newSender);
    }
  }

  resetSettings() {
    if (confirm("Reset all settings and personalization?")) {
      localStorage.clear();
      location.reload();
    }
  }

  createBackgroundParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${20 + Math.random() * 20}s`;
      this.particlesContainer.appendChild(particle);
    }
  }

  handleResize() {
    console.log("Resized - optimizing");
    if (Math.abs(window.innerWidth - this.lastWidth) > 200) {
      this.particlesContainer.innerHTML = "";
      this.createBackgroundParticles();
    }
    this.lastWidth = window.innerWidth;
  }
}

// Globals
window.personalizeMessage = withErrorHandling(() =>
  document.valentineInstance.personalizeMessage()
);
window.resetSettings = withErrorHandling(() =>
  document.valentineInstance.resetSettings()
);

// Init
document.addEventListener("DOMContentLoaded", () => {
  const instance = new ValentineConfession();
  document.valentineInstance = instance;
  logEvent("App initialized");
});

// SW for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("SW registered:", reg);
      })
      .catch((err) => {
        console.error("SW failed:", err);
      });
  });
}

// Utilities
function withErrorHandling(fn) {
  return (...args) => {
    try {
      fn(...args);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please refresh.");
    }
  };
}

function logEvent(eventName) {
  console.log(`[Analytics] ${eventName}`);
}

class StorageManager {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  }
}

class AccessibilityAuditor {
  static checkARIA(element) {
    if (!element.getAttribute("aria-label")) {
      console.warn(`Missing ARIA on ${element.tagName}`);
    }
  }
}
