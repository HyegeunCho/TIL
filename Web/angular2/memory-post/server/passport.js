const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy; // 이 부분 추가


passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  done(null, user); // 여기의 user가 req.user가 됨
});

passport.use(new FacebookStrategy({
  clientID: '110031119665741',
  clientSecret: 'ec815870fb02e0d545b6af09bb7b82a6',
  callbackURL: 'http://localhost:8080/login/facebook/callback',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  // User.findOne({ id: profile.id }, (err, user) => {
  //   if (user) {
  //     return done(err, user);
  //   } // 회원 정보가 있으면 로그인
  //   const newUser = new User({ // 없으면 회원 생성
  //     id: profile.id
  //   });
  //   newUser.save((user) => {
  //     return done(null, user); // 새로운 회원 생성 후 로그인
  //   });
  // });
}));

module.exports = passport;
