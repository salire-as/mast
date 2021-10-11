# MAST (Mongo Abstract syntax tree) 
A simple work in progress Abstract syntax tree (AST) builder that can be converted to JSON, Mongo Query and Mongo Query Expression. 

## Example
Here is some simple examples. 

### Create AST and return as a Mongo Query. 
````
import { CompoundCondition, FieldCondition } from "@aiflow/mast"

const ast = new CompoundCondition("and", [
  new FieldCondition("eq", "name", "Vemund Eldegard)
])

return ast.toQuery()
````

Will return: 
````
{
  "$and": [
    {
      "name": { 
        "$eq": "Vemund Eldegard
      }
    }
  ]
}
````

### Return as Mongo Query Expression ($expr)
````
import { CompoundCondition, FieldCondition } from "@aiflow/mast"

const ast = new CompoundCondition("and", [
  new FieldCondition("eq", "name", "Vemund Eldegard)
])

return ast.toQueryExpression()
````

Will return: 
````
{
  "$expr": {
    $and: [
      {
        "$eq": ["$name", "Vemund Eldegard"]
      }
    ]
  }
}
````