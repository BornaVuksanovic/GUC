import mongoose from "mongoose";

const GlassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    count: {
        type: [Number],
        default: [0]
    },
    day: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
        default: 250
    },
    waterByDay: {
        type: [Number],
        default: [0]
    },
    goal: {
        type: [Number],
        default: [2000]
    },
    goalAchived: {
        type: [Number],
        default: [0]
    }
});

const Glass = mongoose.model("Glass", GlassSchema);

export default Glass;