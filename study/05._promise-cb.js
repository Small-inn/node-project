// (function () {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, 300)

//         setTimeout(() => {
//             reject(new Error())
//         }, 500)
//     })

//     console.log(promise)

//     setTimeout(() => {
//         console.log(promise)
//     }, 800)
// })()


(function() {
    let promise1 = interview(1)
        .then(() => {
            return interview(2)
        }).then(() => {
            return interview(3)
        }).then(() => {
            console.log('smail')
        }).catch(err => {
            console.log('fail at', err.round)
        })
})()



function interview(round) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve()
            } else {
                let error = new Error('fail')
                error.round = round
                reject(error)
            }
        })
    })
}
