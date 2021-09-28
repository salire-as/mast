import { FieldCondition } from "."

const field = "name"
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