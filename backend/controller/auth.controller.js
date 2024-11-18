import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateTokenCookie from '../utility/generateTokenCookie.js'


export const Usersignup = async (req, res) => {
    try {
        const { username, email, password, confirmedPassword, gender } = req.body;

        if(password !== confirmedPassword) {
            return res.status(400).json({error: "Password Dont match"})
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({error: "Email already exist"})
        }

        //to hash password here 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // const normalizedGender = gender.toLowerCase(); 
        const newUser = new User({
            username,
            email, 
            password:hashedPassword, 
            gender, 
            // gender: normalizedGender,
            profilePic: gender === "male" ? boyProfilepic : girlProfilepic
        })

      if (newUser) {

        //Generate token dere
        generateTokenCookie(newUser._id, res)

        //save user to databse
        await newUser.save(); 

        res.status(201).json({
            _id: newUser._id, 
            username: newUser.username, 
            email: newUser.email, 
            profilePic: newUser.profilePic
        })
      } 
      else {
        res.status(400).json({error:"Invalid User Data"})
      }


    } catch (error) {
        console.log("Error is in Signup Controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }   
}

export const Userlogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPassCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPassCorrect) { 
            return res.status(400).json({error:"Invalid Credentials"})
        }

        generateTokenCookie(user._id, res); 

        res.status(200).json({
            _id: user._id, 
            username: user.username, 
            email: user.email, 
            profilePic: user.profilePic,
        })


    } catch (error) {
        console.log("Error is in Login Controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const Userlogout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
        console.log("Error is in logout Controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}