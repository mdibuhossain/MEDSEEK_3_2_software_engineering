const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        trim: true,
        require: true,
    },
    email: {
        type: String,
        maxLength: 128,
        lowercase: true,
        dropDups: true,
        unique: true,
        index: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "INVALID EMAIL"],
        required: [true, "EMAIL IS REQUIRED"],
    },
    password: {
        type: String,
        required: [true, "PASSWORD IS REQUIRED"],
    },
    contact: {
        type: String,
        required: [true, "CONTACT IS REQUIRED"],
    },
    role: {
        type: String,
        lowercase: true,
        enum: ["admin", "editor", "user"],
        default: "user",
    },
    iat: {
        type: Date,
        default: new Date(),
    },
});

userSchema.path("email").validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, "EMAIL ALREADY EXISTS!");

const TmpUser = mongoose.model("TmpUser", userSchema);

module.exports = TmpUser;