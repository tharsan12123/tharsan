document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
});

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve user from localStorage
    const storedUser = localStorage.getItem(email);
    
    if (storedUser) {
        const user = JSON.parse(storedUser);
        
        // Check if password matches
        if (user.password === password) {
            // Store the current user in localStorage
            localStorage.setItem('currentUser', email);
            
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            alert('Invalid password.');
        }
    } else {
        alert('User not found. Please register.');
    }
}

// Handle Registration
function handleRegistration(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if user already exists
    if (localStorage.getItem(email)) {
        alert('User already exists. Please log in.');
    } else {
        // Store user in localStorage
        const newUser = { email: email, password: password };
        localStorage.setItem(email, JSON.stringify(newUser));
        
        // Store the current user and redirect to home page
        localStorage.setItem('currentUser', email);
        window.location.href = 'index.html';
    }
}

// Check if user is logged in
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
    }
}
