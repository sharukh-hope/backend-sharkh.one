// ============================================
// CHAT ROUTES
// Defines the API endpoinjs for the chat feature.
//
// INTERVIEW CONCEPT: Express Router
// Router is a mini Express app that handles a
// group of related routes.
// We attach it to the main app with a prefix:
// app.use("/api/chat", chatRoutes)
// So these routes become:
// POST /api/chat     ← send a message
// GET  /api/health   ← check if server is up
//
// INTERVIEW CONCEPT: HTTP Methods
// GET    = Read data (no body)
// POST   = Create/send data (has body)
// PUT    = Replace data (has body)
// PATCH  = Update part of data (has body)
// DELETE = Remove data
// ============================================

import express, { Router } from "express";
import { createError, errorHandler } from "../middleware/errorHandler.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { validateReq } from "../helpers/validateReq.js";
import type { typeValidationRules } from "../types/validationRules.js";
import { chatController } from "../controllers/chat.controller.js";

const router = Router();

// POST /api/chat
// Middleware chain: aiChatLimiter → validateChatRequest → chatController
// Each runs in order - if one fails, the rest don't run
router.post(
  "/",
  errorHandler,
  rateLimiter,
  (req: express.Request, res: express.Response) => {
    const validationRules: typeValidationRules = {
      message: ["required"],
      history: ["required"],
    };
    if (!validateReq(req, res, validationRules)) return;

    const { message, history } = req.body;

    // return res.send({ aiRes: "Hello there! This is a dummy response" }); //simulation

    chatController(message, history)
      .then((response) => {
        // console.log("Response was recorded", response);
        return res.send({ aiRes: response });
      })
      .catch((err) => createError(300, `The error message: ${err}`));
  },
);

// GET /api/health
// Simple health check - no auth or validation needed
// router.get("/health", healthController);
export default router;
