document.addEventListener("DOMContentLoaded", function() {
    console.clear();

    // Select the circle element
    const circleElement = document.querySelector('.circle');
    
    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };
    
    let currentScale = 0;
    let currentAngle = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    const speed = 0.17;
    
    const tick = () => {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
        const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
    
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;
    
        const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);
        const scaleValue = (mouseVelocity / 150) * 0.5;
        currentScale += (scaleValue - currentScale) * speed;
        const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
    
        const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
        if (mouseVelocity > 20) {
            currentAngle = angle;
        }
        const rotateTransform = `rotate(${currentAngle}deg)`;
    
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
    
        window.requestAnimationFrame(tick);
    }
    
    tick();
   
  const text = "SUBHAN NOTION";
  const container = document.getElementById("animatedText");

  text.split("").forEach(char => {
      const span = document.createElement("span");
      span.className = "letter";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      container.appendChild(span);
  });

  const letters = document.querySelectorAll(".letter");
  const totalLetters = letters.length;
  const delayIncrement = 100;

  function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }

  function animateLetters(forward = true) {
      letters.forEach((letter, index) => {
          const normalizedIndex = Math.max(index, totalLetters - 1 - index) / (totalLetters - 1);
          const easedDelay = easeInOutQuart(normalizedIndex);
          const delay = easedDelay * (totalLetters - 1) * delayIncrement;
          
          setTimeout(() => {
              letter.style.setProperty("--wght", forward ? 700 : 100);
              letter.style.setProperty("--wdth", forward ? 300 : 150);
              letter.style.setProperty("--opacity", forward ? 1 : 0.25);
              letter.style.setProperty("--letter-spacing", forward ? '0.05em' : '0em');
          }, delay);
      });
  }

  animateLetters();

  setTimeout(() => {
      const splashScreen = document.getElementById("splashScreen");
      splashScreen.classList.add("hidden");
      setTimeout(() => {
          splashScreen.style.display = "none";
          const mainContent = document.getElementById("mainContent");
          mainContent.classList.remove("hidden");
          mainContent.classList.add("visible");
      }, 500);
  }, 3000);
                
});
