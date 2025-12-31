


const express = require('express');

const app = express();

app.get('/',(req,res) => {
    console.log('this is home page');
})


let PORT = 8382;

app.listen(PORT,()=> {
    console.log(`server is start port ${PORT}`);
})