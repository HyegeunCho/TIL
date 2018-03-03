var mysql = require('mysql');

var pool;

// 데이터베이스 커넥션 풀을 생성하는 함수
// 이 함수는 한번만 호출하면 된다. 
exports.connect = function() {
	pool = mysql.createPool({
		connectionLimit: 100, 
		host: 'localhost', 
		user: 'root', 
		password: 'bestfood', 
		database: 'bestfood'
	});
}

// 생성한 커넥션 풀을 반환하는 함수 
exports.get = function() {
	return pool;
}