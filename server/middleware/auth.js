import jwt from 'jsonwebtoken';

const auth = async(req,res,next)=>{
    try {
        //access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        //retrieve the user details of the logged in user
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({error: "Authentication failed!"});
    }
};

export default auth;