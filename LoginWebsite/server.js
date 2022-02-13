const http = require("http");
const url = require("url");
const fs = require("fs");
const mysql = require("mysql");

http.createServer((request,response) =>{
    const parsedUrl = url.parse(request.url,true);
    console.log(request.url);
    if(parsedUrl.pathname == "/" || parsedUrl.pathname == "/home"){
        fs.readFile("./views/home.html",(err,data)=>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        });
    }
    else if(parsedUrl.pathname == "/about"){
        fs.readFile("./views/about.html",(err,data)=>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        });
    }
    else if(parsedUrl.pathname == "/contact"){
        fs.readFile("./views/contact.html",(err,data)=>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        });
    }
    else if(parsedUrl.pathname == "/register"){
        fs.readFile("./views/register.html",(err,data)=>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        });
    }
    else if(parsedUrl.pathname == "/login"){
        fs.readFile("./views/login.html",(err,data)=>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        });
    }
    else if(parsedUrl.pathname.match("\.jpeg")){
        fs.readFile("./images/1.jpeg",(err,data) =>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        })
    }
    else if(parsedUrl.pathname.match("\.css")){
        fs.readFile("./css/style.css",(err,data) =>{
            if(err)
                response.end(err);
            else
            {
                response.write(data);
                response.end();
            }
        })
    }
    else if(parsedUrl.pathname == "/register_task"){
        let name = parsedUrl.query.name;
        let fname = parsedUrl.query.fname;
        let age = parsedUrl.query.age;
        let email = parsedUrl.query.email;
        let pass = parsedUrl.query.pass;
        let gender = parsedUrl.query.gender;
        let country = parsedUrl.query.country;

        const con = mysql.createConnection({
            host : "localhost",
            user : "root",
            password : "root",
            database : "nodedb"
        });
        var sql = "insert into user(name,fname,age,email,password,gender,country) values(?,?,?,?,?,?,?)";
        con.query(sql,[name,fname,age,email,pass,gender,country],(err,result)=>{
            if(err)
                console.log(err);
            else
                response.end("<h1>Data Submitted succesfully</h1>");
        })
    }

    else if(parsedUrl.pathname == "/login_task"){
        let email = parsedUrl.query.email;
        let pass = parsedUrl.query.pass;

        const con = mysql.createConnection({
            host : "localhost",
            user : "root",
            password : "root",
            database : "nodedb"
        });
        var flag=false;
        var sql = "select email,password from user";
        con.query(sql,(err,result)=>{
            if(err)
                console.log(err);
            else{
                console.log(result);
                for(data of result){
                    if(data.email==email && data.password==pass){
                        response.end("<h1>You are a valid user</h1>");
                        break;
                        flag = true;
                    }    
                }
                if(flag==false){
                    response.end("<h1>You are not a valid user</h1>");
                }
                
            }
        })
    }
}).listen(3000,()=>{
    console.log("Server is running on port number 3000");
});