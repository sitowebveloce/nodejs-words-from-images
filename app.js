import Tesseract from 'tesseract.js';
import express from 'express';
const app = express();

// IMAGE URL
let url = 'https://i.pinimg.com/originals/e7/a5/66/e7a5667882149023b3f5d25e34711f29.jpg'
// LANGUAGE
let lng = 'eng';

let textFn = (text)=>{
    return `
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image To Words</title>
    </head>
    
    <body>
        <h1 style='text-align: center; padding: 10px; color: crimson;'>TesseraCT.js</h1>
        <h3 style='text-align: center;padding: 5px; text-decoration: underline; color: rebeccapurple;'> Words in almost any language out of images. </h3>
        <div style='text-align: center;padding: 5px;'>https://tesseract.projectnaptha.com/</div>
        <div style='max-width: 500px; 
              min-height:50%;
              margin: 20px auto;
              padding: 50px;
              background-color: #333;
              color: #fff;
              font-size:1.3rem;
              border-radius: 10px;'> ${text ? text : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus numquam perspiciatis eum!'}</div>
    </body>
    
    </html>
    `
}

// RECOGNIZE
const recognize = (res, url)=>{
    Tesseract.recognize(
        url,
        lng,
        {logger: m => console.log(m)}
    )
    .then(({data:{text}}) => {
        console.log(text);
        if(text){
            // res.send(text)
            res.send(textFn(text));
        }else{
            // res.send(text)
            res.send(textFn());
        }
    });
};

// Home route
app.get('/', (req, res)=>{
    // Example
    // http://localhost:3001/?link=https://www.poemhunter.com/i/poem_images/629/the-darken-d-veil.jpg

    console.log(req.query.link);
    let imageUrl = req.query.link;
    
    // Check url presence
    if(imageUrl){
    // Recognize words image
     recognize(res, imageUrl);
    }else{
        res.send(textFn());
    };
    
});

// App listener
app.listen(3001, ()=> {
    console.log(`Server running on port 3001`)
});
