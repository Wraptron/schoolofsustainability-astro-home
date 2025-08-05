document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
  if (!scrollToTopBtn) return;
  
  let isScrolling = false;
  
  const toggleScrollBtn = () => {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          scrollToTopBtn.classList.add("show");
        } else {
          scrollToTopBtn.classList.remove("show");
        }
        isScrolling = false;
      });
    }
  };
  
  const scrollToTop = (e) => {
    e.preventDefault();
    
    // Fallback for browsers that don't support smooth scrolling
    if (!('scrollBehavior' in document.documentElement.style)) {
      // Manual smooth scroll implementation
      const startPosition = window.scrollY;
      const startTime = performance.now();
      const duration = 500;
      
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition * (1 - easeOut));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  // Throttled scroll listener
  let scrollTimeout;
  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(toggleScrollBtn, 10);
  };
  
  // Event listeners
  window.addEventListener("scroll", handleScroll, { passive: true });
  scrollToTopBtn.addEventListener("click", scrollToTop);
  
  // Initial check in case page is already scrolled
  toggleScrollBtn();
  
  // Cleanup function (useful for SPAs)
  return () => {
    window.removeEventListener("scroll", handleScroll);
    scrollToTopBtn.removeEventListener("click", scrollToTop);
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  };
});