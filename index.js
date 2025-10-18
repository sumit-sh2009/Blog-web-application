import express from "express";
import bodyParser from "body-parser";
const app = express();   
const port = 3000;
var blogs = [];
var theme = "light";
var idCounter = 0;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.render("index.ejs", {Pblogs: blogs,id: idCounter });
})

app.post("/post", (req,res)=>{
    const raw_data = req.body.blog.trim();

    if(raw_data != ""){
        blogs[idCounter++] = raw_data;
    } 
    else{
        res.send("<p>blog cannot be empty</p>");
    }
        
        res.redirect("/");
    
})

app.get("/storage", (req,res)=>{
    res.render("storage.ejs", {previous_blogs: blogs})
})

app.get("/edit/:id", (req,res)=>{
    res.render("edit.ejs", {ids: req.params.id, blog: blogs[req.params.id]});
    
})

app.post("/storage/:u_id", (req,res)=>{
    const updatedContent = req.body["update"].trim();

    if (updatedContent !== "") {
        blogs[req.params.u_id] = updatedContent;
        res.redirect("/storage");
    } else {
        res.send("<p>Blog cannot be empty</p>");
    }
});
app.post("/delete/:d_id",(req,res)=>{
    blogs.splice(req.params.d_id, 1);
    res.redirect("/storage");
})


app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})