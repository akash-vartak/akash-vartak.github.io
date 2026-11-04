(function () {
  function initProfileTilt() {
    var wrapper = document.querySelector(".profile");
    if (!wrapper) return;

    var target = wrapper.querySelector("picture");
    if (!target) return;

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    var maxTilt = 15; // degrees, kept subtle on purpose
    var maxShadowOffset = 10; // px, how far the shadow drifts at full tilt
    var shadowBlur = 24; // px, kept soft
    var shadowAlpha = 0.18; // kept low-opacity

    function handleMove(event) {
      var rect = wrapper.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      var rotateY = (x - 0.5) * maxTilt * 2;
      var rotateX = (0.5 - y) * maxTilt * 2;
      // Shadow falls on the side opposite the edge that lifts toward the cursor,
      // so the shadow's drift stays in sync with the tilt direction.
      var shadowX = -(rotateY / maxTilt) * maxShadowOffset;
      var shadowY = (rotateX / maxTilt) * maxShadowOffset;
      target.style.transform = "rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
      target.style.boxShadow =
        shadowX.toFixed(1) + "px " + shadowY.toFixed(1) + "px " + shadowBlur + "px rgba(0, 0, 0, " + shadowAlpha + ")";
    }

    function reset() {
      target.style.transform = "rotateX(0deg) rotateY(0deg)";
      target.style.boxShadow = "0px 0px " + shadowBlur + "px rgba(0, 0, 0, 0)";
    }

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", reset);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProfileTilt);
  } else {
    initProfileTilt();
  }
})();
