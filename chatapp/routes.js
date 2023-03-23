const fs=require("fs")
const path = require("path")
const requestHandler = (req,res)=> {
    const url = req.url
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

}

// module.exports = requestHandler; //1st method to route

// module.exports = {
//     handler : requestHandler,
//     someText : 'some hard coded text'
// } //2nd method to route

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some haed coded text' //3rd method to route

exports.handler = requestHandler;
exports.someText = 'Some haed coded text' //shortcut way for 3rd method