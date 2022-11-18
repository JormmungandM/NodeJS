  
console.log(process.pid);

process.on("message", (message)=>{
    console.log(message);

    const result = myPrime(message);

    process.send(result);

    setTimeout(process.exit, 5000)
})


  function myPrime(value){
    const factors = [];

    if(value <1) return false;
    if(value == 1) return false;

    for (let i = 2; i < value; i++)
    {
        if(value % i === 0)
        {
            factors.push(i);
        }
    }
    return { value, factors, isPrime:( factors.length > 0 ? false : true ) } //результат работы 
  }