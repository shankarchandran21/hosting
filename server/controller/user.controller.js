import User from "../models/user.modal.js";

 const userLogin = async(req,res)=>{
    const { idToken, uid,displayName,photoURL,email, } = req.body;
    try {
        res.cookie("task",{idToken,uid},{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge:15 * 24 * 60 * 60 * 1000, // 15days
            sameSite:"strict",
        })
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
          
          existingUser.idToken = idToken;
          const updatedUser = await existingUser.save();
          return res.status(200).json({ user: updatedUser });
          
        } else {
          const newUser = new User({ idToken, uid, displayName, photoURL, email });
          const savedUser = await newUser.save();
          res.status(200).json({user:savedUser,message:"User saved successfully"});
        }
      } catch (error) {
        console.error('Error in login', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
 }

 const userLogout = async(req,res)=>{
  try {
  
    const createdBy = req.cookies.task?.uid;
    if (!createdBy) {
      return res.status(400).json({ message: 'User not authenticated (no uid in cookies)' });
    }
    
    const user = await User.findOne({ uid: createdBy });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.idToken =""    
    await user.save();
    res.cookie("task",{},{maxAge:1})
  res.status(200).json({ message: 'User logged out successfully and idToken removed' });

  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


 }

 export {userLogin,userLogout}