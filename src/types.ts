import { CompoundCondition } from "./compoundCondition";
import { FieldCondition } from "./fieldCondition";

export type FieldOperator = "eq" | "in" | "gt" | "gte" | "lt" | "lte" | "all";

export type CompoundOperator = "or" | "and" | "not" | "nor";

export type CompoundConditionValue =
  | FieldCondition
  | CompoundCondition
  | LeanFieldCondition
  | LeanCompoundCondition;


export type CompoundConditionValues = CompoundConditionValue[];

export type LeanFieldCondition = Omit<
  FieldCondition,
  "toQuery" | "toAst" | "mongoOperator"
>;

export type LeanCompoundConditionValues = { value: LeanFieldCondition[] };

export type LeanCompoundCondition = Omit<
  CompoundCondition,
  "mongoOperator" | "addField" | "removeField" | "toAst" | "toQuery"
> &
  LeanCompoundConditionValues;