import express, { Request, Response } from 'express';
import routes from './routes'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors())

console.log(`Server is running on port ${port}`);

app.use(express.json());

app.use(routes)
app.get('/', (req: Request, res: Response) => {
    res.json({ "msg": "hello BASE" })
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app
