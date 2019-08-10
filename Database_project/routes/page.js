const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - SungSwit', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - SungSwit',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  Post.findAll({
    include: [{
      //작성자 가져오기
      model: User,
      attributes: ['id', 'nick'],
    },{
      //좋아요 누른 사람들 가져오기
      model : User,
      attributes : ['id', 'nick'],
      as : 'Liker',
    }],
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      console.log(posts);
      res.render('main', {
        title: 'SungSwit',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;