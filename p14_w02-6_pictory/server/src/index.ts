import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Pictory API Server');
});

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!")
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch(error => console.log(error))
