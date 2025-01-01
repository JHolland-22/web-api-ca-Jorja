import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Password validation regex for Exercise 2
const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// User Schema
const UserSchema = new Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  password: { 
    type: String, 
    required: true,
    match: [passwordValidation, 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.']
  },

});

// Password comparison method
UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
};

// Static method to find user by username
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

// Password hashing before saving the user
UserSchema.pre('save', async function(next) {
  const saltRounds = 10;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// UserDetails Schema
const UserDetailsSchema = new Schema({
  username: { type: String, required: true, unique: true },
  favourites: { type: [Number] },
  watchlist: { type: [Number] }
});

// Static method to find user details by username
UserDetailsSchema.statics.findByUsername = function (username) {
  return this.findOne({ username: username });
};

// Export both models
const User = mongoose.model('User', UserSchema);
const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

export { User, UserDetails };
