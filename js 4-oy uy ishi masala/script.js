// 1-masala
function task1(a,b) {
    if(a.length !== 1 && b.length == 1) console.log(`${b}${a}${b}`);
    else if(b.length !== 1 && a.length == 1) console.log(`${a}${b}${a}`);
}
task1("1", "22");
task1("22", "1");


//2-masala
function task2 (array) {
    let result = array.filter(num => num > 0).reduce((a,b) => a+b, 0);
    return result;
}
console.log(task2([1,-4,7,12]));


//3-masala
let task3 = function(number) {
    let result = [];
    for (let i = number; i > 0 ; i--) {
        result.push(i);
    }
    console.log(result);
}
task3(10);


//4-masala
let task4 = (str) => {
    let result;
    if(str.length > 2) result = str.slice(1,str.length - 1);
    else if(str.length = 2 ) result = "";
    
    return console.log(result);
};
task4("hello");


// 5-masala
let task5 = (str,number) => {
    let result = "";
    for (let i = 1; i <= number; i++) {
        result += `${str}`
    }
   console.log(result);
}
task5("hello", 6);


//6-masala
function countBy(x, n) {
    let z = [];
    for(let i = x; i <= x*n; i+=x) {
      z.push(i)
    }
  
    return z;
}
console.log(countBy(2,8));


//7-masala
function between(a, b) {
    let arr = [];
    for(let i = a; i <= b; i++) {
      arr.push(i)
    }
    
    return arr
}
console.log(between(5,15));


//8-masala
function century(year) {
    let result = Math.ceil(year/100)
    return result;
}
console.log(century(2020));

//9-masala
function maxMultiple(divisor, bound){
    let numbers = [];
    for(let i = divisor; i <= bound; i += divisor) {
    numbers.push(i)
    }
    let result = numbers.reduce((a,b) => {
     return  a > b ? a : b
    })
    return result
}
console.log(maxMultiple(3,10));

 