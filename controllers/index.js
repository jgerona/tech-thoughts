const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//THEN I am taken to the homepage and presented with 
//  existing blog posts that include the post title and the date created
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
