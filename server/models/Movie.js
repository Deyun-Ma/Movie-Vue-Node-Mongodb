import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    overview: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      default: ''
    },
    releaseDate: {
      type: Date,
      required: true
    },
    genre: {
      type: [String],
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// Create text index for search
MovieSchema.index({ title: 'text', overview: 'text' });

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;