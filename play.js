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


// Based on the url the user hits , I want you to return custom responses.
// When url = /home , return response ==> Welcome home
// When url = /about, return response ==> Welcome to About Us page
// When url =/node, return response ==> Welcome to my Node Js project

const http = require('http');

const server = http.createServer((req,res)=>{
    const url = req.url;
    if (url === '/home'){
        res.setHeader('Content-Type','text/html')
        res.write('<html>')
        res.write('<head><title> welcome home</title><head>')
        res.write('<body><h1>Hello fron Node.js Server!,welcome home</h1></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/about'){
        res.setHeader('Content-Type','text/html')
        res.write('<html>')
        res.write('<head><title> welcome to about us page</title><head>')
        res.write('<body><h1>Hello fron Node.js Server!,welcome to about us page</h1></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/node'){
        res.setHeader('Content-Type','text/html')
        res.write('<html>')
        res.write('<head><title> welcome to my node js project </title><head>')
        res.write('<body><h1>Hello fron Node.js Server!,welcome to my node js project</h1></body>')
        res.write('</html>')
        return res.end()
    }
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title> my first page</title><head>')
    res.write('<body><h1>Hello fron Node.js Server!</h1></body>')
    res.write('</html>')
    res.end()
});

server.listen(4000)