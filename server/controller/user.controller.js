import admin from 'firebase-admin';
 const userLogin = async(req,res)=>{
    const { idToken } = req.body;

    try {
        // Verify Firebase ID Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email,name,picture } = decodedToken;

    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
 }

 export {userLogin}