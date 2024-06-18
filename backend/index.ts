import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { IData } from './types';

let rawData = fs.readFileSync('data.json');
let data: IData[] = JSON.parse(rawData.toString());

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post<IData>('/submit', (req, res) => {
  if (Object.keys(req.body).length === 0) return res.sendStatus(400);

  setTimeout(() => {
    let email: string = req.body.email;
    let result: IData[] = data.filter((item) => item.email === email);

    if (req.body.number) {
      result = result.filter((item) => item.number === req.body.number);
    }

    res.send(result);
  }, 5000);
});

app.listen(3000);
