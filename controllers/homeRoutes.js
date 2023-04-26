const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }))
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/blog/:id', async(req,res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                User, 
                {
                    model: Comment,
                    include: [User]
                }                
            ]
        });

        const blog = blogData.get({ plain: true});
        res.render('blog', {
            blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
}) 

router.post('/blog/:id', withAuth, async (req,res) => {
    try {
        console.log(req.body.content)
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        })
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
}) 

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Blog,
                    attributes: ['id','title','content','date_created']
                }
            ],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;