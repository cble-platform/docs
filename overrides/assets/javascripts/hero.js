// Max rotation
const MAX_ROTATION = 20;

function is_touch_enabled() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Integrate with mkdocs instant loading
document$.subscribe(function () {
  // Check light/dark mode
  let colorScheme = document.body.getAttribute("data-md-color-scheme");
  // Get hero container
  const heroContainer = document.getElementById("cble-hero-container");
  // Get hero image
  let heroImage = document.getElementById(`cble-hero-image-${colorScheme}`);

  // Update element selector based on light/dark mode
  document.querySelector("form[data-md-component=palette]").onchange = (e) => {
    // Check light/dark mode
    colorScheme = document.body.getAttribute("data-md-color-scheme");
    // Get hero image
    heroImage = document.getElementById(`cble-hero-image-${colorScheme}`);
  };

  heroContainer.onmousemove = (e) => {
    // Only run animation on large devices
    if (window.innerWidth < 1220 || is_touch_enabled()) return;

    let x = e.pageX;
    let y = e.pageY;

    window.requestAnimationFrame(() => {
      let imgBox = heroImage.getBoundingClientRect();
      let deltaX = x - (imgBox.x + imgBox.width / 2);
      let deltaY = y - (imgBox.y + imgBox.height / 2);
      let thetaY = (deltaX / (imgBox.x + imgBox.width / 2 + window.scrollX)) * MAX_ROTATION;
      let thetaX = (deltaY / (imgBox.y + imgBox.height / 2 + window.scrollY)) * -MAX_ROTATION;
      // console.log(x, y, imgBox.x + imgBox.width / 2, imgBox.y + imgBox.height / 2 + window.scrollY, deltaX, deltaY, thetaX, thetaY);
      heroImage.style.transform = `perspective(500px) rotateX(${thetaX}deg) rotateY(${thetaY}deg)`;
    });
  };

  // Return to center on mouse leave
  heroContainer.onmouseleave = (e) => {
    window.requestAnimationFrame(() => {
      heroImage.style.transform = `perspective(500px) rotateX(5deg) rotateY(-5deg)`;
    });
  };
});
