// ============================================
// ERROR HANDLER MIDDLEWARE
// Catches any errors thrown in routes and
// returns a clean JSON response instead of
// crashing the server.
//
// INTERVIEW CONCEPT: Error Handling Middleware
// Express error middleware has 4 params: (err, req, res, next)
// The extra "err" param is what makes Express recognize
// it as an error handler vs regular middleware.
// Must be registered LAST in your app!
// ============================================

import express from "express";
import { nodeEnv } from "../config.ts";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction, // Required even if unused - Express needs all 4 params
): void => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${statusCode} - ${message}`);
  console.error(err.stack);

  res.status(statusCode);
  res.json({
    error: message,
    // Only respond with stack trace in development (never expose in production!)
    ...(nodeEnv === "development" && { stack: err.stack }),
  });
};

// Helper to create errors with status codes
// Usage: throw createError(404, "Not Found")
export const createError = (status: number, message: string) => {
  //doubt: The function had a type AppError
  const error: AppError = new Error(message);
  error.status = status;
  return error;
};
