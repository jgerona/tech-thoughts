const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      blog_id: user[Math.floor(Math.random() * user.length)].id,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
