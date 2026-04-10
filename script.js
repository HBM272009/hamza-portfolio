// This listens for the webpage to fully load before running the script.
document.addEventListener('DOMContentLoaded', () => {
    
    /* 
      ========================================
      1. DARK / LIGHT MODE TOGGLE
      ========================================
      This grabs our button and icon from the HTML file, 
      and checks if the user clicks it.
    */
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // Add a "click" event listener to the button
    themeBtn.addEventListener('click', () => {
        
        // "classList.toggle" behaves like a light switch. 
        // If the <body> does NOT have the class "dark", it adds it. 
        // If it DOES have it, it removes it.
        document.body.classList.toggle('dark');
        
        // Now we change the icon depending on what mode we are in.
        // We check: does the body currently have the "dark" class?
        if (document.body.classList.contains('dark')) {
            // We are in Dark Mode! Change icon to a Sun
            themeIcon.className = "ph-fill ph-sun";
        } else {
            // We are in Light Mode! Change icon to a Moon
            themeIcon.className = "ph-fill ph-moon";
        }
    });


    /* 
      ========================================
      2. SCROLL REVEAL ANIMATION (Smooth Fading)
      ========================================
      Instead of using heavy animation libraries, we use the browser's 
      "IntersectionObserver". It simply watches an element and tells us 
      when it becomes visible on the screen.
    */
    
    // 1. Grab every single element that has the class "scroll-reveal"
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // 2. Set the rules: trigger when 15% of the section is visible
    const revealOptions = {
        threshold: 0.15 
    };

    // 3. Create the Observer
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is NOT on the screen yet, do nothing.
            if (!entry.isIntersecting) return;
            
            // BUT if it IS on the screen... 
            // Add the "visible" class (which triggers the CSS fade-in animation)
            entry.target.classList.add('visible');
            
            // Stop watching this element so it doesn't animate again and again
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    // 4. Finally, tell the Observer to start watching all the elements we found
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    
    /* 
      ========================================
      3. SMOOTH SCROLLING FOR LINKS
      ========================================
      When clicking navigation links (like "Contact"), this makes the page 
      slide down smoothly instead of instantly jumping.
    */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop the default instant jump
            const targetId = this.getAttribute('href'); // Get the ID (e.g., "#contact")
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Tell the browser to slide smoothly
                });
            }
        });
    });

});
