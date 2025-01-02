import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import UserDetails from '../api/userFandW/userFandWModel';
import usersDetails from './userFandW';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    
    try {
        // Make sure mongoose connects to the database
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to MongoDB');
        
        // Check if User and Movie models are loaded
        console.log('User Model:', User);
        console.log('Movie Model:', Movie);
        
        // Drop collections
        await User.collection.drop().catch(err => console.log('User collection not found'));
        await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
        await UserDetails.collection.drop().catch(err => console.log('UserDetails collection not found'));

        
        // Create users and movies and details
        await User.create(users);
        await Movie.create(movies);
        await UserDetails.create(usersDetails);

        
        console.log('Database initialised');
        console.log(`${users.length} users loaded`);
        console.log(`${movies.length} movies loaded`);
        console.log('Users Details:', usersDetails);  // Log usersDetails before adding

    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

main();
