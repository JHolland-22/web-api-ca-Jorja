import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  adult: { type: Boolean },
  gender: { type: Number },
  id: { type: Number, required: true, unique: true },
  known_for: { type: String },
  name: { type: String },
  original_name: { type: String },
  popularity: { type: Number },
  profile_path: { type: String },
  known_for: [{
    adult: { type: Boolean },
    backdrop_path: { type: String },
    id: { type: Number },
    title: { type: String },
    original_language: { type: String },
    original_name: { type: String },
    overiew: { type: String },
    poster_path: { type: String },
    genre_ids: [{ type: Number }],
    popularity: { type: Number },
    release_date: { type: String },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number }
  }]
});

ActorSchema.statics.findByActorDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actor', ActorSchema);