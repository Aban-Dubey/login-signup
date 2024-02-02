import "dotenv/config";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connect from './database/conn.js';
import router from './routes/router.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stack

const port = 8080;

//HTTP requests
app.get('/',(req,res)=>{
    res.status(201).json("Home http request!");
});

//API routes
app.use('/api', router);

//Start server only when database connection in successful
connect().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log("Cannot connect to the server: "+error);
    }
}).catch(error =>{
    console.log("Invalid database connection!");
});
