/*
*
*
*  validationRules = {
    message: "required"
    }
*
*/
import express from "express";
import type { typeValidationRules } from "../types/validationRules.ts";

export const validateReq = (
  req: express.Request,
  res: express.Response,
  validationRules: typeValidationRules,
): boolean => {
  for (const rule of Object.keys(validationRules)) {
    if (!req.body[rule]) {
      res.status(400).json({ error: `${rule} is required` });
      return false;
    }
  }
  return true;
};
