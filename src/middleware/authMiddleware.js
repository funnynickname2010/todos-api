import jwt from "jsonwebtoken";

//Debug
console.log("authMiddleware.js loaded");

// The interseptor that "guards" all the todos' endpoints
function authMiddleware(req, res, next) {

    // Getting the token from the request
    const token = req.headers["authorization"];

    //If no token from the user, return request error
    if (!token) {
        return res.status(401).json({ "message": "No token provided" });
    }

    //If we have the token, compare it with the decrypted one
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // If the token is wrong
        if (err) {
            return res.status(401).json({ "message": "Incorrect token" });
        }

        //If the token is fine
        req.userId = decoded; // Modifying the request, userId field
        next(); //Moving on, "you can continue on with your journey"
    })
}

export default authMiddleware;