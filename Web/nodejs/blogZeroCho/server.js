const cors = require('cors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const route = require('./route.js');
const login = require('./login.js');
const passport = require('./passport.js');

const app = express();

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

//passport(); // 이 부분 추가


app.use(cors());
app.use((req, res, next) => {
	console.log("Hi, World!");
	next();
});
app.use('/', route);
app.use('/login', login);
app.use((req, res, next) => {
	res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send('서버 에러!');
})


app.listen(8080, () => {
	console.log('Express App on port 8080');
});

