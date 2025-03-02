document.addEventListener('DOMContentLoaded', function() {
    // Set the password for accessing the site
    const correctPassword = "golftrip2025"; // Change this to your desired password
    
    // Get DOM elements
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    
    // Add event listener for login button
    if (loginBtn) {
        loginBtn.addEventListener('click', checkPassword);
    }
    
    // Add event listener for Enter key in password field
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Function to check password
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === correctPassword) {
            // Password is correct, redirect to main dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Password is incorrect, show error message
            errorMessage.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';
            passwordInput.focus();
            
            // Clear error message after 3 seconds
            setTimeout(function() {
                errorMessage.textContent = '';
            }, 3000);
        }
    }
    
    // Check if we're on a protected page (not index.html)
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' && 
        !sessionStorage.getItem('authenticated')) {
        
        // If not authenticated, redirect to login page
        window.location.href = 'index.html';
    }
    
    // Set authenticated flag when on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        sessionStorage.setItem('authenticated', 'true');
    }
    
    // Handle navigation active state
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
