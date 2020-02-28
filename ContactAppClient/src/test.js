

var arr = [1,2,3];

var arr2 = arr.filter((num) => num!=2);
var string = "123 456 --() ";
console.log(!string.match(/^[0-9- ]+$/));
var newStr = string.split(/[ ()-]/).join("");
console.log(newStr);


var amir = " 0-  123";
console.log(amir.split(/[ -]/).join(""));

console.log(Math.random())