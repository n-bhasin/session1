var compareNumToTen = (num) =>{
    if (num > 10) {console.log(num + " greater than 10, success!")}
    else{console.log(num + " less than 10, error!")}
}

const promisA = new Promise((resolve, reject)=> {
    compareNumToTen(1);
})
promisA.then((result)=>console.log(result))
.catch((error)=> console.log(error))

