// automatically pick platform
const say = require('say')
 
function sorryDave(){
    say.speak("I'm sorry, Dave")
    console.log('yes');
}

setTimeout(sorryDave, 2000)