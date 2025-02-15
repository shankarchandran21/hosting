
import User from "../models/user.modal.js"

const protectRoute = async(req,res,next) => {
    const taskCookie = req.cookies.task;
   
    if (!taskCookie?.idToken || !taskCookie?.uid) {
        return res.status(401).json({ message: 'Unauthorized: Missing idToken or uid' });
    }
    
    const { idToken, uid } = taskCookie;
    console.log(uid)

    try {
        const user = await User.findOne({uid})
        console.log(user)
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid idToken or uid' });
        }
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default protectRoute