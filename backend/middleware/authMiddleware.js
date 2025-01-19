import jwt from "jsonwebtoken";


const authenticateUser = (req, res, next) => {
     try {
        // Get token from Authorization header or a custom field (e.g., `req.body.token`)
    const token = req.headers
    if (!token) {
        return res.status(401).send("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded;

    console.log("Authenticated user:", req.user); // Log user data

    next();
 } catch (error) {
    console.log("Error in token verification:", error);
    return res.status(401).json({ message: "Invalid Token" });
 }
}




const authorizeAdmin = (req, res, next) => {
    console.log("Request User:", req.user);
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Not authorized as an admin.");
    }
  };

  export {authenticateUser, authorizeAdmin}
  