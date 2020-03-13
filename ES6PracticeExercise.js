//Exercise 1
var difference = (num) => {
    if(num < 13){
        return 13-num;
    }
    else{
        return 2 * (Math.abs(13-num));
    }
}

console.log(difference(21));
console.log('*************');

//Exercise 2

var gretter = (myArray, counter) => {
    let greetText = 'Hello';
    for(let index in myArray){
        console.log(`${greetText} ${myArray[index]}`);
    }
}

gretter(['Randy Savage', 'Ric Flair', 'Hulk Hogan']);
console.log('*************');

//Exercise 3
const colors = ['red', 'green', 'blue'];
var capitalizedColors = (colors) => {
    var a = colors.map(word => word[0].toUpperCase() + word.substring(1));
    return a;
}

console.log(capitalizedColors(colors));
console.log('*************');

//Exercise 4
const values = [1, 60, 34, 30, 20, 5];
var filterNum = (values) => {
    var a = values.filter(num => num<20);
    return a;
}
console.log(filterNum(values));