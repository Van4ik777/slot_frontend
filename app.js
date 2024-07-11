// app.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch user coins on page load
    fetchUserCoins();

    // Add event listener for spin form submit
    const spinForm = document.getElementById('spinForm');
    spinForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const bet = document.getElementById('bet').value;
        spinSlotMachine(bet);
    });

    // Add event listener for register form submit
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        registerUser(username, password);
    });
});

async function fetchUserCoins() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/user/coins/', {
            headers: {
                'Authorization': `Token your_actual_token_here`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('userCoins').textContent = data.coins;
    } catch (error) {
        console.error('Error fetching user coins:', error);
    }
}

async function spinSlotMachine(bet) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/spin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token your_actual_token_here`
            },
            body: JSON.stringify({ stavka: bet })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('userCoins').textContent = data.money;
        alert(data.message);  // Display spin result message
    } catch (error) {
        console.error('Error spinning slot machine:', error);
    }
}

async function registerUser(username, password) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User registered successfully:', data);
        alert('User registered successfully!');
        // Optionally, you can automatically log in the user after registration
        // Example: call a login function here
    } catch (error) {
        console.error('Error registering user:', error);
    }
}
