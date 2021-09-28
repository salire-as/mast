import { omit } from "lodash";
import { FieldCondition } from "../fieldCondition";
import { CompoundConditionValue, CompoundConditionValues, CompoundOperator, LeanCompoundCondition } from "../types";
import { isCompoundCondition, isFieldCondition } from "../utils/conditionals";
import shortid from "shortid";

export class CompoundCondition {
  public id: string;
  public operator: CompoundOperator;
  public value: (FieldCondition | CompoundCondition)[] = [];
  private mongoOperator: string;

  constructor(operator: CompoundOperator, values?: CompoundConditionValues) {
    this.id = shortid.generate();
    this.operator = operator;
    this.mongoOperator = `$${this.operator}`;
    this.addFields(values);
  }

  public addFields(value: CompoundConditionValues = []) {
    if(!value) return
    for (const field of value) {
      this.addField(field);
    }
  }

  public addField(value: CompoundConditionValue) {
    if (value instanceof FieldCondition || value instanceof CompoundCondition) {
      this.value.push(value);
    } else {
      if (isCompoundCondition(value)) {
        this.value.push(new CompoundCondition(value.operator, value.value));
      } else if (isFieldCondition(value))
        this.value.push(
          new FieldCondition(value.operator, value.field, value.value)
        );
    }
  }

  public removeField(id: string) {
    return (this.value = this.value.filter((field) => field.id !== id));
  }

  public toAst(): LeanCompoundCondition {
    return Object.assign(omit(this, ["mongoOperator"]), {
      value: this.value.map((field) => field.toAst())
    }) as LeanCompoundCondition;
  }

  public toQuery(): Record<string, any> {
    return Object.assign(
      {},
      {
        [this.mongoOperator]: this.value.map((fieldCondition) => {
          return fieldCondition.toQuery();
        })
      }
    );
  }
}