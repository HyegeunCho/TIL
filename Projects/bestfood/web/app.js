// 사용할 모듈을 로딩 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db');

// 라우트 코드를 로딩 
var member = require('./routes/member');

// 익스프레스 객체를 app 변수로 선언 
// 익스프레스 객체로 다음과 같은 작업을 할 수 있다.
// 1. HTTP requests 라우팅
// 2. 미들웨어 설정
// 3. HTML 뷰 렌더링
// 4. 템플릿 엔진 설정 
var app = express();

// 익스프레스에서 사용할 템플릿 엔진을 설정 
// __dirname : 현재 디렉터리를 의미 
// path.join() : 경로를 연결하는 함수 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

db.connect(function(err) {
	if (err) {
		console.log('Unable to connect to MySQL.');
		process.exit(1);
	}
});

// app.use() 함수는 지정된 인자를 실행하는 함수
// 여기서는 각각의 모듈을 실행하고 있다.
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우트를 설정하는 코드 
// 여기서 라우트는 url 경로의 뒷부분을 의미한다. 
// 아래와 같이 외부파일을 통ㅎ애 라ㅜㅇ트를 처리하는 것이 코드가 많아졌을 때 정리하기 좋다. 
// 일반적으로 라우트를 처리할 때는, app.get()이나 app.post() 함수를 사용해도 되지만, 별도 파일에서 라우트 함수를 작성할 때는 express.Router() 함수를 통해 호출해야 한다. 
// 그리고 별도 파일에서 작성한 함수를 사용할 수 있도록 module.exports = router;를 추가해야 한다. 

// member.js, food.js, keep.js 파일을 routes 디렉터리에 생성해야 함. 
app.use('/member', require('./routes/member'));
//app.use('/food', require('./routes/food'));
//app.use('/keep', require('./routes/keep'));

// catch 404 and forward to error handler
// index.js, users.js 라우트 파일에서 처리하지 못한 입력은 에러로 간주되며 이 아래쪽에서 처리한다. 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 이 함수는 코드를 실행하는 중 발생한 에러를 처리하기 위한 함수이다. 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
