import User from "../models/User.js";
import Glass from "../models/Glass.js";
import axios from "axios";


export const Home = async (req, res) => {
    let user = req.user;
    let glass = await Glass.findOne({ user: user._id });

    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const oldDate = new Date(user.lastActiveDate);
    oldDate.setUTCHours(0, 0, 0, 0);

    let isNewDay = oldDate < today;
    let streakIncrement = 0;
    let streakReset = false;

    // novi dan
    if (isNewDay) {
        const difInMs = today - oldDate;
        const diffInDays = Math.round(difInMs / (1000 * 60 * 60 * 24));
        const lastActiveIndex = glass.day - 1; 


        if (diffInDays === 1) {
            // Bio je aktivan jučer, provjeravamo je li popio zadani cilj
            if (glass.waterByDay[lastActiveIndex] >= glass.goal[lastActiveIndex]) {
                streakIncrement = 1; 
            } else {
                streakReset = true; 
            }
        } else {
            streakReset = true;
        }

        // Popunjavanje rupa
        const newDay = glass.day + diffInDays;
        const lastGoal = glass.goal[lastActiveIndex] || 2000;

        while (glass.goal.length < newDay) {
            glass.goal.push(lastGoal);
            glass.count.push(0);
            glass.waterByDay.push(0);
            glass.goalAchived.push(0);
        }

        glass.day = newDay;
    }

    // trenutni dan
    const currentIndex = glass.day - 1;


    if (glass.waterByDay[currentIndex] >= glass.goal[currentIndex]) {
        glass.goalAchived[currentIndex] = 1;
    } else {
        glass.goalAchived[currentIndex] = 0;
    }


    const newBadges = [];
    
    if (glass.count[currentIndex] > 0 && !user.unlockedBadges.includes("FIRST_GLASS")) {
        newBadges.push("FIRST_GLASS");
    }
    
    const projectedStreak = (streakReset ? 0 : user.currentStreak) + streakIncrement;
    if (projectedStreak >= 3 && !user.unlockedBadges.includes("STREAK_3_DAYS")) {
        newBadges.push("STREAK_3_DAYS");
    }

    if (glass.goalAchived[currentIndex] === 1 && !user.unlockedBadges.includes("FIRST_GOAL")) {
        newBadges.push("FIRST_GOAL");
    }


    await glass.save();

    let userUpdate = { $set: {} };
    
    if (isNewDay) userUpdate.$set.lastActiveDate = today;
    if (streakReset) userUpdate.$set.currentStreak = 0;

    if (streakIncrement > 0) {
        userUpdate.$inc = { currentStreak: streakIncrement };
    }

    if (newBadges.length > 0) {
        userUpdate.$push = { unlockedBadges: { $each: newBadges } };
    }

    if (Object.keys(userUpdate.$set).length > 0 || userUpdate.$inc || userUpdate.$push) {
        user = await User.findByIdAndUpdate(user._id, userUpdate, { returnDocument: 'after' });
    }

    res.status(200).json({ 
        message: "Home screen data successfully loaded",
        user,
        glass
    });
};


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

export const CalculateTarget = async (req, res) => {
    try {
        const { lat, lon } = req.body;

        if (!lat || !lon) {
            return res.status(400).json({ error: "Missing latitude or longitude" });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        
        const response = await axios.get(weatherUrl);
        const { temp } = response.data.main;
        const locationName = response.data.name;


        let recommendedWater = 2000; 

        if (temp > 35) {
            recommendedWater += 1000; 
        } else if (temp > 30) {
            recommendedWater += 750;  
        } else if (temp > 25) {
            recommendedWater += 400;  
        } else if (temp > 20) {
            recommendedWater +=200;
        } else if (temp < 10) {
            recommendedWater -= 200;  
        }

        return res.json({
            success: true,
            location: locationName,
            temperature: temp,
            waterTarget: recommendedWater
        });

    } catch (error) {
        console.error("Weather calculation failed:", error.message);
        return res.status(500).json({ error: "Failed to calculate water target" });
    }
}