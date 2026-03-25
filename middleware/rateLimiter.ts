import express from "express";

const requests = new Map();
const requestLimit = 5;
export const rateLimiter: express.RequestHandler = (req, res, next) => {
  const ipAddress = req.ip;
  const now = Date.now();
  const timeLimit = 1 * 60 * 1000;

  if (!requests.has(ipAddress)) {
    requests.set(ipAddress, { count: 1, timestamp: Date.now() });
    return next();
  } else {
    const currentUser = requests.get(ipAddress);

    if (currentUser && now - currentUser.timestamp > timeLimit) {
      console.log("deleted user");

      requests.delete(ipAddress);
      return next();
    } else {
      if (currentUser.count > requestLimit) {
        console.log("Too many requests");

        return res
          .status(429)
          .json({ message: "Too many requests within time limit!" });
      } else {
        console.log("counted user");
        currentUser.count++;
        next();
      }
    }
  }
};
