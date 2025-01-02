import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import './db'; 
import defaultErrHandler from './errHandler'; 
import authenticate from './authenticate';
import genresRouter from './api/genres';
import upcomingRouter from './api/upcomingMovies';
import router from './api/actors';
import userDetailsRouter from "./api/userFandW"
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/userDetails', userDetailsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/upcoming',upcomingRouter);
app.use('/api/actors', router);


app.use(defaultErrHandler); 

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});

