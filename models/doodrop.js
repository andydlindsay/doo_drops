const mongoose = require('mongoose');

// doodrop schema
const doodropSchema = mongoose.Schema({

    // loc - the longitude and latitude of the doodrop
    // doo - truthy for poo, falsey for pee
    // gender - the gender of the dog
    // breed - the breed of the dog
    // age - the age of the dog in days
    // neutered - has the done been neutered
    // ts - timestamp
    loc: {
        lng: {
            type: Number,
            min: -180,
            max: 180,
            required: [true, 'lng is a required field']
        },
        lat: {
            type: Number,
            min: -90,
            max: 90,
            required: [true, 'lat is a required field']
        }
    },
    doo: {
        type: Boolean,
        required: [true, 'doo is a required field']
    },
    gender: {
        type: String,
        enum: ['female', 'male']
    },
    breed: {
        type: String,
        maxlength: [25, 'dog breed must be less than 26 characters'],
        match: /^[a-zA-Z\s]+$/
    },
    age: {
        type: Number,
        min: 0,
        set: (v) => {
            return Math.round(v);
        }
    },
    neutered: {
        type: Boolean
    },
    ts: {
        type: Date,
        default: Date.now
    }

});

// export doodrop
const Doodrop = module.exports = mongoose.model("Doodrop", doodropSchema, "doodrops");