const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const port = 3000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
let posts = [
   { id: 1, username: "Amarjit", content: "Hello, I am Amarjit!" },
    { id: 2, username: "Alice", content: "Hi everyone, I am Alice!" },
    { id: 3, username: "Bob", content: "Bob here, nice to meet you!" },
    { id: 4, username: "Charlie", content: "Charlie joining the discussion." },
];
let nextId =5;
app.get("/posts", (req, res) => {
   res.render("index" , {posts});
});

app.get("/posts/:id" , (req , res) => {
    const i = parseInt(req.params.id);
    const post = posts.find(p=> p.id ===i);
    if(!post){
        res.render("error");
    }else{
    res.render( "indivi", {post});
    }
});
app.get("/newpost", (req, res)=>{
    res.render("form");
    });
app.post("/posts", (req,res) => {
    console.log(req.body);
    const {username , content} = req.body;
    console.log(username);
    const newPost = {
        id:nextId++,
        username:username,
        content:content
    };
    posts.push(newPost);
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req,res) =>{
    const id = parseInt(req.params.id);
    const post = posts.find(p=> p.id ==id);

    if(!post){
        res.render("error");
    }else{
        res.render("editForms", {post})
    }
})
app.put("/posts/:id" , (req, res)=>{
    const id = parseInt(req.params.id);
    const {username , content } = req.body;
    const post = posts.find(p=> p.id === id );
    post.username = username;
    post.content = content;
    res.redirect("/posts");
})


app.delete("/posts/:id" , (req, res) =>{
    const id = parseInt(req.params.id);
    posts = posts.filter(p=>p.id !==id);
    res.redirect("/posts");

})
app.listen(port, ()=>{
    console.log("server working" , port);
});