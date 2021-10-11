import { omit } from "lodash";
import { FieldOperator, LeanFieldCondition } from "../types";
import shortid from "shortid";

export class FieldCondition {
  public id: string;
  public field: string;
  public operator: FieldOperator;
  public value: any;
  
  private mongoOperator: string;

  constructor(operator: FieldOperator, field: string, value: any) {
    this.id = shortid.generate();
    this.operator = operator;
    this.field = field;
    this.value = value;
    this.mongoOperator = `$${this.operator}`;
  }

  toQuery() {
    return {
      [this.field]: {
        [this.mongoOperator]: this.value
      }
    };
  }

  toQueryExpression() {
    return {
      [this.mongoOperator]: [`$${this.field}`, this.value]
    }
  }

  toAst(): LeanFieldCondition {
    return omit(this, ["mongoOperator", "toQuery"]) as LeanFieldCondition;
  }
}