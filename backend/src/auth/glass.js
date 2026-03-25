import User from "../models/User.js";
import Glass from "../models/Glass.js";


export const Home = async (req,res) => {
    let user = req.user;

    let glass = await Glass.findOne({ user: user._id });

    let today = new Date();
    today.setUTCHours(0,0,0,0);

    const oldDate = user.lastActiveDate;

    if ( user.lastActiveDate < today ) {

        let newDate = new Date();

        if ( today.getMonth() > oldDate.getMonth() ) {
            newDate =(today - oldDate) / (24 * 60 * 60 * 1000); // pretvaranje ms u days
        } else {
            newDate = today.getDate() - oldDate.getDate();
        }

        user = await User.findByIdAndUpdate(
            { _id: user._id },
            { $set: { lastActiveDate: today } },
            { returnDocument: `after` }
        );

        glass = await Glass.findByIdAndUpdate(
            { _id: glass._id },
            { $inc: { day: newDate }},
            { returnDocument: `after` }
        )
    }

    res.status(200).json({ 
        message: "Home screen",
        user,
        glass
    });
}


export const AddGlass = async (req,res) => {
    const user = req.user;
    const glass = await Glass.findOne({ user: user._id });
    const index = glass.day - 1;
    const updateGlass = await Glass.findByIdAndUpdate(
        { _id: glass._id},
        { $inc: { [`count.${index}`]: 1, [`waterByDay.${index}`]: req.body.a}},
        { returnDocument: `after` }
    );

    res.status(200).json({
        message: "glass added",
        updateGlass
    });

}

export const ChangeAmount = async (req,res) => {
    const user = req.user;
    const glass = await Glass.findOne({ user: user._id });
    const updateAmount = await Glass.findByIdAndUpdate(
        { _id: glass._id },
        { $set: { amount: req.body.item }},
        { returnDocument: 'after' }
    );

    res.status(200).json({
        message: "amount changed",
        updateAmount
    });
}

export const Info = async (req,res) => {
    const user = req.user;
    const glass = await Glass.findOne({ user: user._id });
    let totalGlasses = 0;
    let totalWater = 0;
    for(let i = 0 ; i < glass.day; i++) {
        if(glass.count[i] != null){
            totalGlasses += glass.count[i];   
            totalWater += glass.waterByDay[i];
        }
        
    }
 
    res.status(200).json({
        message: "Information",
        totalGlasses,
        totalWater,
        user,
        glass
    })
} 


export const SetGoal = async (req,res) => {
    const user = req.user;
    let glass = await Glass.findOne({ user: user._id });
    const index = glass.day - 1;
    glass = await Glass.findByIdAndUpdate(
        { _id: glass._id },
        { $set: { [`goal.${index}`]: req.body.item }},
        { returnDocument: 'after' }
    );

    res.status(200).json({
        message: "new goal set",
        glass
    });
    
}