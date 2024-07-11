let form = document.querySelector('form')
let input = document.querySelector('input')
let currSpin

async function spin(initial_money,stavka){
    let res = await fetch('http://127.0.0.1:8000/api/spin/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({initial_money, stavka}),
    }
    )
    let data = res.json()
    return data
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    spin(1000,+input.value).then(data=>{
    currSpin = data
    console.log(currSpin)
    })

})