import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

// Password validation regex for Exercise 2
const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

    favorites: [{ type: String }]
  
});
UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};
UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
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

// Create a pre-save hook to handle password hashing (optional but recommended for security)
UserSchema.pre('save', function (next) {
  // Add any password encryption logic here (e.g., bcrypt)
  next();
});

export default mongoose.model('User', UserSchema);
