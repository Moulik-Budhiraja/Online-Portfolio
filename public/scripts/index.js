const elements = document.querySelectorAll(".slide-in-animation");
const animationDelayStep = 0.6; // Increase delay in seconds

elements.forEach((element, index) => {
  const animationDelay = index * animationDelayStep;

  // Get the ::before pseudo-element of the element
  const pseudoElement = window.getComputedStyle(element, "::before");

  // Get all immediate children of the element
  const children = element.children;

  // Set the animation delay for the element
  pseudoElement.style.animationDelay = `${animationDelay}s`;
  children.forEach((child) => {
    child.style.animationDelay = `${animationDelay}s`;
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".pop-over").forEach((element) => {
    if (!element.contains(e.target)) {
      element.blur();
      console.log("blurred");
    }
  });
  console.log("clicked");
});
