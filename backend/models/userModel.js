import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', UserSchema);

export default User;