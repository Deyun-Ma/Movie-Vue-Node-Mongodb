import express from 'express';
import Movie from '../models/Movie.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @route   GET /api/movies
// @desc    Get all movies (with optional filters)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { search, genre } = req.query;
    const userId = req.user._id;
    
    // Build query
    let query = { createdBy: userId };
    
    // Add search filter if provided
    if (search) {
      query.$text = { $search: search };
    }
    
    // Add genre filter if provided
    if (genre) {
      query.genre = genre;
    }
    
    // Find movies
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    
    res.json(movies);
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/:id
// @desc    Get a movie by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Check if movie belongs to user
    if (movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this movie' });
    }
    
    res.json(movie);
  } catch (error) {
    console.error('Get movie error:', error);
    
    // Check if error is due to invalid ID
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/movies
// @desc    Create a new movie
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, overview, poster, releaseDate, genre, rating } = req.body;
    
    // Create movie
    const movie = await Movie.create({
      title,
      overview,
      poster,
      releaseDate,
      genre,
      rating: rating || 0,
      createdBy: req.user._id
    });
    
    res.status(201).json(movie);
  } catch (error) {
    console.error('Create movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/movies/:id
// @desc    Update a movie
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { title, overview, poster, releaseDate, genre, rating } = req.body;
    
    // Find movie
    let movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Check if movie belongs to user
    if (movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this movie' });
    }
    
    // Update movie
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        overview,
        poster,
        releaseDate,
        genre,
        rating: rating || 0
      },
      { new: true }
    );
    
    res.json(movie);
  } catch (error) {
    console.error('Update movie error:', error);
    
    // Check if error is due to invalid ID
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/movies/:id
// @desc    Delete a movie
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // Find movie
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Check if movie belongs to user
    if (movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this movie' });
    }
    
    // Delete movie
    await movie.deleteOne();
    
    res.json({ message: 'Movie removed' });
  } catch (error) {
    console.error('Delete movie error:', error);
    
    // Check if error is due to invalid ID
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;