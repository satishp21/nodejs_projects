// console.log("Hello World")

//Write an arrow function which returns the product of two numbers
// const product = (a,b)=> {
//   return a*b
// }
// console.log(product(5,2))





//create a student object
// const student = {
//   name : "satish panchal",
//   qualification : "BE",
//   cgpa : 8,
//   greet() {
//     console.log("hi my name is " + this.name)
//   }
// }
// student.greet()

// Take an array = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon]. Transform it into ['apple', 'oranges' , 'empty string', 'mango', 'empty string', 'lemon] using array maps



// const array = ['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon']
// console.log(array.map((val) => {
//   if (val==" "){
//     return "empty string"
//   }
//   else{
//     return val
//   }
// }))//output [ 'apple', 'oranges', 'empty string', 'mango', 'empty string', 'lemon' ]

//spread operator
// const  array = ['apple','oranges','mango','lemon']
// const array2=[...array]
// array2.push("satish")
// console.log(array2)
// console.log(array)

// //rest operator

// const toArray = (...args)=>{
//   return args
// }
// console.log(toArray(1,2,3,4))
//below will print req data on terminal when we acces localhost:4000 on browser
// const http = require('http');
// const server = http.createServer((req,res)=>{
//     console.log(req)
// });

// server.listen(4000)

const http = require('http');

const server = http.createServer((req,res)=>{
    console.log("satish")
});

server.listen(4000)