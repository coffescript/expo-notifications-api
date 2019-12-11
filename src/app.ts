import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

import routeNotFound from './middlewares/routeNotFound';
import errorHandler from './middlewares/errorHandler';

import routes from './routes';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`,
});

mongoose.connect(process.env.DATABASE_URL || '', {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/expo-notifications/api/v1', routes);

app.use(routeNotFound);

app.use(errorHandler);

app.listen(process.env.PORT);
