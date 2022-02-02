const express=require('express')
const pool=require('./database')
//creating a server
const PORT=8000
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
   res.json({name:"Rakesh"})
})

app.post("/products",async(req,res)=>{
    try {
     const {title,price,description,category,image,rating}=req.body;
     const product=await pool.query("INSERT INTO products(title,price,description,category,image,rating) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[title,price,description,category,image,rating]);
     res.json({data:product})
    } catch (error) {
        res.json({error:"Cound not conncet at this endpoint!! POST METHOD"});
    }
})

app.put("/products/:id",async(req,res)=>{
    try {
     const {id} = req.params
     const {title} =req.body

     const update_product= await pool.query("UPDATE products SET title=$1 where id=$2",[title,id]);
     res.json({data:"Content Updated suceesuflly"})
         
    } catch (error) {
        res.json({error:"Cound not conncet at this endpoint!! PUT METHOD"});
    }
})

app.delete("/products/:id",async (req,res)=>{
    try {
     const {id} = req.params
     const del=await pool.query("DELETE FROM products WHERE id=$1 ",[id]);
     res.json({data:"Content DELETED suceesuflly item"+id})

        
    } catch (error) {
        res.json({error:"Cound not conncet at this endpoint!! PUT METHOD"});
    }
})

app.get("/products",async(req,res)=>{
      try {
          const all_products= await pool.query("SELECT * FROM products");
          res.json({data:all_products})
      } catch (error) {
          res.json({error:"Cound not conncet at this endpoint!!"});
      }
})

app.get("/products/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const all_products= await pool.query("SELECT * FROM products WHERE id=$1",[id]);
        res.json({data:all_products})
    } catch (error) {
        res.json({error:"Cound not conncet at this endpoint!!"});
    }
})

app.listen(PORT,(err)=>{
   if(err) console.log(err)
   console.log(`Severe is running at ${PORT}`)
})



