import { isCompoundCondition, isFieldCondition } from "./conditionals"

test('isCompoundCondition', () => {
  expect(isCompoundCondition({
    operator: "and",
  })).toBeTruthy()

  expect(isCompoundCondition({
    operator: "eq"
  })).toBeFalsy()
})

test('isFieldCondition', () => {
  expect(isFieldCondition({
    operator: "eq",
  })).toBeTruthy()

  expect(isFieldCondition({
    operator: "and"
  })).toBeFalsy()
})