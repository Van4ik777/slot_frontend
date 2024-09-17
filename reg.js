let form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let registerData = {
        'username': username,
        'password': password
    };

    try {
        let res = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        
        if (res.status === 200) {
            let data = await res.json();
            alert('Registration successful! Redirecting to game page.');
            document.cookie = `token=${data.token}; path=/`;  // Сохраняем токен в cookie
            window.location.href = 'index.html';  // Переход на страницу игры
        } else {
            let errorText = await res.text();
            alert(`Registration failed: ${errorText}`);
        }
    } catch (error) {
        console.error('Registration failed:', error);
        alert('An error occurred. Please check the console for details.');
    }
});