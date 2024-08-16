export type ValidationRule = (arg1: any) => string | boolean;

export type ValidationRules = ValidationRule[];

export type FromValidationRules = Record<string, ValidationRules>;
