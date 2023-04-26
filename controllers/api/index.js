const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const updateRoutes = require('./updateRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/update', updateRoutes);

module.exports = router;