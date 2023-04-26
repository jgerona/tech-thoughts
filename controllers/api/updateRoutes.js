// to access use: /api/update
const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async(req,res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User]
                },
                
            ]
        });

        const blog = blogData.get({ plain: true});
        res.render('update', {
            blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
}) 

router.put('/:id', async (req,res) => {
    try {
        const updateBlog = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!blogData) {
            res.status(404).json({message: "Blog not found"});
            return;
        }

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;