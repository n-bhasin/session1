let promise1 = 101
let promise2 = "follow the white"
let promise3 = new Promise((res, rej)=> {
    res("rabbit...neo")
})

Promise.all([promise1, promise2, promise3])
.then((result)=>console.log(result))
.catch((err)=> console.log(err))