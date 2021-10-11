import { CompoundCondition } from "."
import { FieldCondition } from ".."

const operator = "and"
const mongoOperator = "$and"
const condition = new CompoundCondition(operator)

test('Create new CompoundCondition', () => {
  expect(condition.operator).toBe(operator)
  expect(condition.value).toBeInstanceOf(Array)
  expect(condition.value).toHaveLength(0)
  expect(typeof condition.id).toBe("string")
})

test('Add new field', () => {
  condition.addField(new FieldCondition("eq", "name", "Vemund Eldegard"))
  expect(condition.value).toHaveLength(1)
})

test('Output to AST', () => {
  const ast = condition.toAst()
  
  expect(ast).toHaveProperty("operator")
  expect(ast).toHaveProperty("id")
  expect(ast).toHaveProperty("value")
  expect(ast.value).toHaveLength(1)
})

test('Output to Mongo Query', () => {
  const query = condition.toQuery()
  
  expect(query).toHaveProperty(mongoOperator)
  expect(query[mongoOperator]).toBeInstanceOf(Array)
})

test('Output to Mongo Query Expression', () => {
  const query = condition.toQueryExpression()
  
  expect(query.$expr).toBeInstanceOf(Object)
  expect(query.$expr.$and).toBeInstanceOf(Array)
  expect(query.$expr.$and).toHaveLength(1)
  expect(query.$expr.$and[0].$eq).toBeInstanceOf(Array)
  expect(query.$expr.$and[0].$eq).toHaveLength(2)
})

test('Remove a field', () => {
  const fieldId = condition.value[0].id

  condition.removeField(fieldId)
  expect(condition.value).toHaveLength(0)
})

test('Add multiple fields', () => {
  condition.addFields([
    new FieldCondition("eq", "name", "Vemund Eldegard"),
    new FieldCondition("in", "status", ["Closed", "Won"])
  ])

  expect(condition.value).toHaveLength(2)
})

test('Output multiple fields to Mongo Query Expression', () => {
  const query = condition.toQueryExpression()
  
  expect(query.$expr).toBeInstanceOf(Object)
  expect(query.$expr.$and).toBeInstanceOf(Array)
  expect(query.$expr.$and).toHaveLength(2)
  expect(query.$expr.$and[0].$eq).toBeInstanceOf(Array)
  expect(query.$expr.$and[0].$eq).toHaveLength(2)
  expect(query.$expr.$and[1].$in).toBeInstanceOf(Array)
  expect(query.$expr.$and[1].$in).toHaveLength(2)
})