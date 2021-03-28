console.log(async function() {})

console.log(function() { 
    return new Promise(resolve => {
        resolve()
    }) 
})