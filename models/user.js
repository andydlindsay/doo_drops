const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

// User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is a required field'],
        maxlength: [55, 'name must be less than 55 characters'],
        minlength: [4,'name must be at least 4 characters long'],
        match: /^[a-zA-Z0-9\s]+$/
    },
    email: {
        type: String,
        required: [true, 'email is a required field'],
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    username: {
        type: String,
        required: [true, 'username is a required field'],
        unique: true,
        minlength: [8, 'username must be at least 8 characters long'],
        maxlength: [25, 'username must be less than 25 characters long'],
        match: /^[a-zA-Z0-9]+$/
    },
    password: {
        type: String,
        required: [true, 'password is a required field']
    },
    dogs: [{
        name: {
            type: String,
            required: [true, 'dog name is a required field'],
            maxlength: [25, 'dog name must be less than 26 characters'],
            match: /^[a-zA-Z0-9]+$/
        },
        dob: {
            type: Date,
            validate: {
                validator: (v) => {
                    return v < Date.now();
                },
                message: 'date of birth must be in the past'
            }
        },
        image: {
            type: String,
            match: /(https?:\/\/)(www\.)?[-a-zA-Z0-9:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9:%_\+.~#?&//=]*)/ig
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
        neutered: {
            type: Boolean
        },
        breed: {
            type: String,
            maxlength: [25, 'dog breed must be less than 26 characters'],
            match: /^[a-zA-Z\s]+$/
        }
    }]
});

// export User
const User = module.exports = mongoose.model("User", userSchema, "users");

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    const query = { username };
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};
