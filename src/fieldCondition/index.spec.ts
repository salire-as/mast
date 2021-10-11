import { FieldCondition } from "."

const field = "name"
const mongoField = "$name"
const operator = "eq"
const mongoOperator = "$eq"
const value = "Vemund Eldegard"

const condition = new FieldCondition(operator, field, value)

test('Create a new FieldCondition', () => {
  expect(condition.operator).toBe(operator)
  expect(condition.field).toBe(field)
  expect(condition.value).toBe(value)
  expect(typeof condition.id).toBe("string")
})

test('Field Condition to Mongo Query', () => {
  const query = condition.toQuery()
  expect(query).toHaveProperty(field)
  expect(query[field]).toHaveProperty(mongoOperator)
  expect(query[field][mongoOperator]).toBe(value)
})

test('Field Condition to Mongo Query Expression', () => {
  const query = condition.toQueryExpression()
  expect(query).toHaveProperty(mongoOperator)
  expect(query[mongoOperator]).toBeInstanceOf(Array)
  expect(query[mongoOperator]).toHaveLength(2)
  expect(query[mongoOperator][0]).toBe(mongoField)
})