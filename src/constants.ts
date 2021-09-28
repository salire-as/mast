import { CompoundOperator, FieldOperator } from "./types";

export const FIELD_OPERATORS: readonly FieldOperator[] = [
  "eq",
  "in",
  "gt",
  "gte",
  "lt",
  "lte",
  "all"
] as const;

export const COMPOUND_OPERATORS: readonly CompoundOperator[] = [
  "and",
  "or",
  "nor",
  "not"
] as const;