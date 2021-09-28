import { COMPOUND_OPERATORS, FIELD_OPERATORS } from "../constants";
import { LeanCompoundCondition, LeanFieldCondition } from "../types";

export const isCompoundCondition = (
  object: Record<string, any>
): object is LeanCompoundCondition => {
  if(object.operator) return COMPOUND_OPERATORS.includes(object.operator);
  else return false
};

export const isFieldCondition = (
  object: Record<string, any>
): object is LeanFieldCondition => {
  return FIELD_OPERATORS.includes(object?.operator);
};