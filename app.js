document.addEventListener('DOMContentLoaded', async () => {
    // Check if the elements exist before adding event listeners
    let form = document.getElementById('game-form');
    let bet = document.getElementById('Bet');
    let userCoins = document.getElementById('usercoins');
    let bonusMessage = document.getElementById('bonus-message');
    let l11 = document.getElementById('l1-1');
    let l12 = document.getElementById('l1-2');
    let l13 = document.getElementById('l1-3');

    let l21 = document.getElementById('l2-1');
    let l22 = document.getElementById('l2-2');
    let l23 = document.getElementById('l2-3');

    let l31 = document.getElementById('l3-1');
    let l32 = document.getElementById('l3-2');
    let l33 = document.getElementById('l3-3');

    let startMoney = 1000;
    let token = getToken(); // Get token from cookies

    function replaceSymbols(s) {
        if (typeof s !== 'string') {
            s = String(s);
        }
        return s.replace(/w/g, '⭐️')
                .replace(/b/g, '🔔')
                .replace(/1/g, '🍒')
                .replace(/2/g, '🍋')
                .replace(/3/g, '🍊')
                .replace(/4/g, '🍉')
                .replace(/5/g, '⭐️')
                .replace(/6/g, '🔔')
                .replace(/7/g, '🍇');
    }

    function setSpin(d) {
        if (d.message) {
            bonusMessage.textContent = `You won ${d.message} BONUS GAMES`;
        } else {
            bonusMessage.textContent = '';
        }
        l11.innerHTML = replaceSymbols(d.l1[0]);
        l12.innerHTML = replaceSymbols(d.l1[1]);
        l13.innerHTML = replaceSymbols(d.l1[2]);

        l21.innerHTML = replaceSymbols(d.l2[0]);
        l22.innerHTML = replaceSymbols(d.l2[1]);
        l23.innerHTML = replaceSymbols(d.l2[2]);

        l31.innerHTML = replaceSymbols(d.l3[0]);
        l32.innerHTML = replaceSymbols(d.l3[1]);
        l33.innerHTML = replaceSymbols(d.l3[2]);
    }

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        let betValue = +bet.value;
        if (isNaN(betValue) || betValue <= 0) {
            alert('Invalid bet amount');
            return;
        }

        try {
            let userDetails = await getUserDetails(token);
            startMoney = userDetails.money;
            userCoins.textContent = startMoney;

            let data = await spin(token, startMoney, betValue);
            currSpin = data;
            startMoney = data.money;
            userCoins.textContent = startMoney;
            setSpin(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Initialize user details on page load
    try {
        let userDetails = await getUserDetails(token);
        startMoney = userDetails.money;
        userCoins.textContent = startMoney;
    } catch (error) {
        console.error('Error:', error);
    }
});

let registerForm = document.getElementById('register-form');

registerForm?.addEventListener('submit', async (e) => {
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
            document.cookie = `token=${data.token}; path=/`;  
            window.location.href = 'index.html';  
        } else {
            let errorText = await res.text();
            alert(`Registration failed: ${errorText}`);
        }
    } catch (error) {
        console.error('Registration failed:', error);
        alert('An error occurred. Please check the console for details.');
    }
});
