import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Auth service listening at port :: ${PORT} !!`)
})