import passport from "passport";
import local from "passport-local"
import userModel from "../data/models/users.model.js";
import { createHash, isValidPassWord } from "../utils.js";
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //permite acceder al objeto request como otro mdw
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            const user = await userModel.findOne({ email: username });
            if (user) { //user exist?
                return done(null, false) //no se hizo el registro porque ya existe
            }
            const userTosave = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            const result = await userModel.create(userTosave);
            return done(null, result)
        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    }));
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {

        try {

            const user = await userModel.findOne({ email: username });
            if (!user) { //user exist?
                return done(null, false) //no se hizo el registro porque ya existe
            }
            if (!isValidPassWord(user, password)) {
                return done(null, false)
            }
            return done(null, user) //req.user = user

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`)
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.a392901b9ed1d825",
        clientSecret: "8427a3f6ec37386de3b394adbbb20902be9786c9",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: "",
                    email,
                    password: ""
                }
                const result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}

export default initializePassport;

