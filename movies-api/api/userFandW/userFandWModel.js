
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema({
    username: { type: String, required: true, unique: true },
    favourites: { type: [Number]},
    watchlist: { type: [Number]}
});

UserDetailsSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};

export default mongoose.model('UserDetails', UserDetailsSchema);
