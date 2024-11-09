const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        // require: true,
        unique: true
    },
    password: {
        type: String,
        // require: true
    },
    born: {
        type: String
    },
    skills: {
        vel: Number,
        tir: Number,
        pas: Number,
        dri: Number,
        def: Number,
        fis: Number,
    },
    matches: [
        {
          id: String,
          data: [
            { x: String, y: Number },
          ],
        },
      ],      
});

module.exports = model('User', UserSchema );