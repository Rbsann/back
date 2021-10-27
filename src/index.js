import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/v1', routes.pokemon);


app.listen(process.env.PORT, () =>
  console.log(`Test listening on port ${process.env.PORT}!`),
);
