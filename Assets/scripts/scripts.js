document.addEventListener("DOMContentLoaded", function() {
    // Handle resize event
    handleResize();

    // Set up navigation toggle
    setupNavigationToggle();

    // Back to top button functionality
    setupBackToTopButton();

    // Set up audience member click events
    setupAudienceClickEvents();
});

function setupNavigationToggle() {
    let navOpen = false;
    let isAnimating = false;

    window.addEventListener('resize', handleResize);
    document.querySelector('.hamburger').addEventListener('click', toggleNav);

    function toggleNav() {
        if (isAnimating) return; // Prevent function execution if animation is in progress
    
        var nav = document.querySelector('nav ul');
        var hamburger = document.querySelector('.hamburger');
        var topLine = hamburger.children[0];
        var middleLine = hamburger.children[1];
        var bottomLine = hamburger.children[2];
    
        isAnimating = true; // Mark as animating
    
        if (!navOpen) {
            // Showing the navigation
            nav.classList.add('nav-slide-in'); // Add the slide-in class
    
            // Hamburger to 'X' transition code
            topLine.style.top = '10px';
            bottomLine.style.top = '10px';
            setTimeout(function() {
                middleLine.style.opacity = '0';
                topLine.style.transform = 'rotate(45deg)';
                bottomLine.style.transform = 'rotate(-45deg)';
            }, 50);
    
            // Set navOpen to true after the transition
            setTimeout(() => {
                navOpen = true;
                isAnimating = false; // Reset animation flag
            }, 300);
    
        } else {
            // Hiding the navigation
            nav.classList.remove('nav-slide-in'); // Remove the slide-in class
    
            // 'X' to Hamburger transition code
            topLine.style.transform = '';
            bottomLine.style.transform = '';
            setTimeout(function() {
                middleLine.style.opacity = '1';
                topLine.style.top = '0';
                bottomLine.style.top = '20px';
            }, 300);
    
            // Wait for the slide-out animation to finish before hiding the nav
            setTimeout(() => {
                navOpen = false;
                isAnimating = false; // Reset animation flag
            }, 300); // This duration should match the slide-out animation duration
        }
    }
}

function handleResize() {
    var nav = document.querySelector('nav ul');
    if (window.innerWidth > 650) { // Adjust the 650px to your mobile breakpoint
        nav.style.display = ''; // Reset display property
        nav.classList.remove('nav-inactive', 'nav-active'); // Remove visibility classes
        navOpen = false; // Reset navOpen state
    }
}

function setupBackToTopButton() {
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("backToTopButton").style.display = "block";
        } else {
            document.getElementById("backToTopButton").style.display = "none";
        }
    }

    document.getElementById("backToTopButton").addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

function setupAudienceClickEvents() {
    const animationStates = new Map();

    document.querySelectorAll('.audience-member').forEach(item => {
        // Initialize each audience member's animation state as not animating
        animationStates.set(item, false);
    
        item.addEventListener('click', function() {
            // Get the current animation state for the clicked audience member
            let isAnimating = animationStates.get(item);
    
            // If an animation is in progress, do nothing
            if (isAnimating) return;
    
            // Get the target image by its ID
            let target = document.getElementById(this.dataset.target);
    
            // Set the animation state to true to prevent further clicks
            animationStates.set(item, true);
    
            // Check if the image is already visible
            if (target.classList.contains('audience-image-fade-in')) {
                target.classList.remove('audience-image-fade-in');
                target.classList.add('audience-image-fade-out');
                
                // After the fade-out animation, hide the target and set the animation state to false
                setTimeout(() => { 
                    target.style.display = "none"; 
                    animationStates.set(item, false); // Reset animation state
                }, 1000); // This duration has to match the fade-out animation duration
    
            } else {
                // Show the target and start the fade-in animation
                target.style.display = "block";
                target.classList.remove('audience-image-fade-out');
                target.classList.add('audience-image-fade-in');
                
                // After the fade-in animation, set the animation state to false
                setTimeout(() => { 
                    animationStates.set(item, false); // Reset animation state
                }, 1000); // This duration should match the fade-in animation duration
            }
        });
    });
}

function highlightDisclaimer(){
    // Get all elements with the 'disclaimer' class
    var disclaimerElements = document.getElementsByClassName('disclaimer');

    // Loop through each element and apply a highlight style
    for (var i = 0; i < disclaimerElements.length; i++) {
        disclaimerElements[i].style.backgroundColor = 'yellow';
        disclaimerElements[i].style.border = '2px solid red';
        disclaimerElements[i].style.padding = '5px';
        disclaimerElements[i].style.margin = '5px';
        // Add any other styles you want to apply for highlighting

        // Set a timeout to remove the highlight after 2 seconds
        setTimeout(function(element) {
            element.style.backgroundColor = '';
            element.style.border = '';
            element.style.padding = '';
            element.style.margin = '';
            // Add any other styles you want to remove for highlighting
        }, 1000, disclaimerElements[i]);
    }
}