async function spin(){
    let res = await fetch('http://127.0.0.1:8000/api/spin/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({initial_money: 1000, stavka: 100}),
    }
    )
    let data = res.json()
    return data
}
spin().then(data=>console.log(data))