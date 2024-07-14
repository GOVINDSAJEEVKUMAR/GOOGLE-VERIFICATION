const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = 8440;
require('./db/conn');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const userdb = require('./Model/userSchema');

const clientID = "162136648969-ldcmju65j5j8td129k8445ab6f525tmu.apps.googleusercontent.com";
const clientSecret = "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";

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:8440/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userdb.findOne({ google: profile.id });
            if (!user) {
                user = new userdb({
                    google: profile.id,
                    displayname: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173/error'
}));

app.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "success", user: req.user });
    } else {
        res.status(400).json({ message: "unsuccess" });
    }
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
            
        }
        res.redirect("http://localhost:5173/");
    });
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
