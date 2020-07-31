import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users/currentUser",(req,res)=>{
    res.send("Current User!")
})


app.post("/api/users/signup",(req,res)=>{
    res.send("Sign up user!")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Auth service listening at port :: ${PORT} !!`)
})