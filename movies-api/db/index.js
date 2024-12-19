import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

if (!process.env.MONGO_DB) {
  console.error('MongoDB URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  });

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('Database disconnected');
});

db.once('open', () => {
  console.log(`Database connected to ${db.name} on ${db.host}`);
});
