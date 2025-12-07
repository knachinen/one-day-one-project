import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source.js';
import authRouter from './routes/auth.js'; // Import the auth router

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the auth router
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Pictory API Server');
});

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!")
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error: any) => console.log(error))
