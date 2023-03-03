// const fs = require('fs')
// const path = require("path")

// const requestHandler = (req,res) => {
//     const url = req.url;
//     const method= req.method;
//     const body=[];
     
//     if (url === '/'){
//         const filepath = path.join(__dirname,"message.txt")
//         fs.readFile(filepath,{encoding:'utf-8'}, (err,data) =>{
//             if (err){
//                 console.log(err);
//             }
//             console.log(`data from file` + data);
//             res.write('<html>') 
//             res.write('<head><title>Enter message</title></head>')
//             res.write(`<body>${data}</body>`)
//             res.write(
//                 `<body><form action ="/message" method="POST"><input type ="text" name="message" /><button  type="submit">Send</button></form></body>`
//                 )
//             res.write('</html>')
//             return res.end()
//         });

//     } else if (url === '/message' && method === "POST"){
//         req.on("data",(chunk)=>{
//             body.push(chunk)
//         }); 

//         return req.on("end", () => {
//             const parsedbody= Buffer.concat(body).toString()
//             console.log('parsedbody>>>>', parsedbody)
//             const message = parsedbody.split("=")[1];
//             fs.writeFile('message.txt',message,(err)=>{
//                 if (err){
//                     console.log(err)
//                 }
//                 console.log(`indise fs.writefile`)
//                 res.statusCode = 302;
//                 res.setHeader('Location','/')
//                 return res.end()
//             });
//         });
//     }
//     res.setHeader('Content-Type','text/html')
//     res.write('<html>')
//     res.write('<head><title> my first page</title></head>')
//     res.write('<body><h1>Hello fron Node.js Server!</h1></body>')
//     res.write('</html>')
//     res.end()
// }
// module.exports = requestHandler;

//udemycode
const http = require('http');
const fs = require("fs")
const path = require("path")

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method
    if (url === '/'){
        // res.setHeader('Content-Type','text/html')
        const filepath = path.join(__dirname,"message.txt")
        fs.readFile(filepath,{encoding:'utf-8'}, (err,data) =>{
            if (err){
                console.log(err);
            }
            console.log(`data from file` + data);
            res.write('<html>')
            res.write('<head><title> Enter message </title></head>')
            res.write(`<body><h1>${data}</h1></body>`)
            res.write(`<body><form action ="/message" method="POST"><input type ="text" name="message" /><button  type="submit">Send</button></form></body>`)
            res.write('</html>')
            return res.end()
        })
    }
    if (url === '/message' && method === "POST"){
        // res.setHeader('Content-Type','text/html')
        const body = []
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk)
        });
        return req.on("end", () =>{
            const parsedBody=Buffer.concat(body).toString();
            // console.log(parsedBody)
            const message = parsedBody.split("=")[1];
            fs.writeFileSync("message.txt", message)
            res.statusCode = 302;
            res.setHeader('Location','/')
            return res.end()
        })

    }

    // res.setHeader('Content-Type','text/html')
    // res.write('<html>')
    // res.write('<head><title> my first page</title><head>')
    // res.write('<body><h1>Hello fron Node.js Server!</h1></body>')
    // res.write('</html>')
    // res.end()
});

server.listen(3000)
