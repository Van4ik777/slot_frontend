let form = document.querySelector('form');
let select = document.querySelector('#bet');
let currSpin;
let startMoney

async function getMoney()=>{
    let res = await fetch('http://127.0.0.1:8000/api/coins/',{
        methon: 'Get',
        headers: {
            'Content type': 'application/json'
        },
    });
    let data = await res.json();
    return data.coins;


}


async function spin(initial_money, stavka) {
    let res = await fetch('http://127.0.0.1:8000/api/spin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ initial_money, stavka })
    });
    let data = await res.json();
    return data;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let bet = +select.value;
    let startMoney = await getStartMoney();
    spin(startMoney, bet).then(data => {
        currSpin = data;
        startMoney = data.money;
        console.log(currSpin);
    });
});
