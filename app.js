let form = document.querySelector('form');
let bet = document.getElementById('Bet');

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

// Replace 'w' with '⭐️', 'b' with '🔔', and digits with emojis
function replaceSymbols(s) {
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

async function spin(initial_money, stavka) {
    let res = await fetch('http://127.0.0.1:8000/api/spin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ initial_money, stavka }),
    });
    let data = await res.json();
    return data;
}

async function register() {
    let res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',

        body: JSON.stringify({
            'username': 'vania',
            'password': 'newpassword'
        }),
    });
    let data = await res.json();
    return data.money;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let betValue = +bet.value;
    if (isNaN(betValue) || betValue <= 0) {
        alert('Invalid bet amount');
        return;
    }
    console.log(bet.value);

    if (startMoney === 1000) {
        // Register and get the initial money if not already done
        startMoney = await register();
    }

    spin(startMoney, betValue).then(data => {
        currSpin = data;
        startMoney = data.money;
        console.log(currSpin);
        setSpin(data);
    });
});
