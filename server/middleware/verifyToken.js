const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  //extract a token 
  const token = req.cookies.token;
  
  //for unauthorized user request
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;