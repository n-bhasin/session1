const arrayOfNames = ['jaxx', 'tiny', 'clay'];
const mixedArray = ['anarchy', 99, true];

let makeUpperCase = (names)=>{
    return new Promise((res, rej) => {
        res(names.map(x => x.toUpperCase()))
    })
}
let sortWord = (data)=>{
    return new Promise((res, rej) => {
        res(data.sort());
    })
    
}

makeUpperCase(arrayOfNames)
.then(sortWord)
.then((result) => console.log(result))
.catch((err)=> console.log(err))