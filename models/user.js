import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { isEmail, isAlphanumeric } from 'validator';

// User schema
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [ isAlphanumeric, 'invalid name']
    },
    email: {
        type: String,
        required: true,
        validate: [ isEmail, 'invalid email address']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [ isAlphanumeric, 'invalid username']
    },
    password: {
        type: String,
        required: true
    }
});

// export schema
export default mongoose.model('User', schema);