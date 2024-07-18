let form = document.querySelector('form');
let bet = document.getElementById('Bet');
let userCoins = document.getElementById('usercoins');

let l11 = document.getElementById('l1-1');
let l12 = document.getElementById('l1-2');
let l13 = document.getElementById('l1-3');

let l21 = document.getElementById('l2-1');
let l22 = document.getElementById('l2-2');
let l23 = document.getElementById('l2-3');

let l31 = document.getElementById('l3-1');
let l32 = document.getElementById('l3-2');
let l33 = document.getElementById('l3-3');

let bonusMessage = document.getElementById('bonus-message');
let currSpin;
let startMoney = 1000;  // Default value, will be overwritten by registration
let symbols = ['🍒', '🍋', '🍊', '🍉', '⭐️', '🔔', '🍇', '🍍'];
let token = null;  // Variable to store the token

// Replace 'w' with '⭐️', 'b' with '🔔', and digits with emojis
function replaceSymbols(s) {
    if (typeof s !== 'string') {
        s = String(s);  // Convert to string if not already
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

async function register() {
    let registerData = {
        'username': 'vaniйцуa',
        'password': 'newpassword'
    };
    let res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });
    if (res.status === 200) {
        let data = await res.json();
        return data.token;  // Return the token
    } else {
        let errorText = await res.text();
        console.error('Registration failed:', errorText);
        alert('Registration failed. Please check the console for details.');
        throw new Error('Registration failed');
    }
}

async function getUserDetails(token) {
    let res = await fetch('http://127.0.0.1:8000/api/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    if (res.status === 200) {
        let data = await res.json();
        return data;  // Return user details
    } else {
        let errorText = await res.text();
        console.error('Fetching user details failed:', errorText);
        alert('Fetching user details failed. Please check the console for details.');
        throw new Error('Fetching user details failed');
    }
}

async function spin(token, initial_money, stavka) {
    let res = await fetch('http://127.0.0.1:8000/api/spin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ initial_money, stavka }),
    });
    if (res.status === 200) {
        let data = await res.json();
        return data;
    } else {
        let errorText = await res.text();
        console.error('Spin failed:', errorText);
        alert('Spin failed. Please check the console for details.');
        throw new Error('Spin failed');
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let betValue = +bet.value;
    if (isNaN(betValue) || betValue <= 0) {
        alert('Invalid bet amount');
        return;
    }
    console.log(bet.value);

    try {
        if (!token) {
            // Register and get the token if not already done
            token = await register();

            // Get user details after registration
            let userDetails = await getUserDetails(token);
            startMoney = userDetails.money;  // Set the user's money
            userCoins.textContent = startMoney;  // Update the displayed money
        }

        let data = await spin(token, startMoney, betValue);  // Use the token to spin
        currSpin = data;
        startMoney = data.money;
        userCoins.textContent = startMoney;  // Update the displayed money after spin
        console.log(currSpin);
        setSpin(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

// Initial setup to register and fetch user details
(async () => {
    try {
        if (!token) {
            token = await register();
            let userDetails = await getUserDetails(token);
            startMoney = userDetails.money;
            userCoins.textContent = startMoney;
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
