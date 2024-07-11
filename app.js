async function spin(){
    let res = await fetch('http://127.0.0.1:8000/api/spin/')
    let data = res.json()
    return data
}
spin().then(data=>console.log(data))