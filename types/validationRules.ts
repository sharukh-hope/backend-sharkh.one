type typeValidationRule =
  | "required"
  | { type: "minLength"; value: number }
  | { type: "maxLength"; value: number };

export type typeValidationRules = Record<string, typeValidationRule[]>;
//This signifies that type can have values "required" or "minLength"/"maxLength" with value.
//This helps keeps things standardized throughout the application
