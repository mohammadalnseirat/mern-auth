import express from 'express';
const port = process.env.PORT || 3000
const app = express();




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)  // server is running on port 3000
})