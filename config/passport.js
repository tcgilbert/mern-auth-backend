require('dotenv').config();

// A passport strategy for authenticating with a JSON Web Token

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//JWT_SECRET inside of .env
options.secretOrKey = process.env.JWT_SECRET;


module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // we will use the user model here
  }))
}
