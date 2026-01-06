import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [8, 'Password must be at least 8 characters'],
        validate: {
            validator: function (value) {
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: 'Password must contain at least one uppercase letter, one number, and one symbol'
        }
    },
    name: {
        type: String,
        required: [true, 'Name is Required'],
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now

    }
});

userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = mongoose.model('User', userSchema);
export default User;