
 const userLogin = async(req,res)=>{
    const { idToken } = req.body;

    try {
        // Verify Firebase ID Token
console.log(idToken)

    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
 }

 export {userLogin}