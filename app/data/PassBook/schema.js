'use strict'


// Define our schema using the GraphQL schema language
const typeDefs = `
  type PassBook {
    _id:String
    txnid:String
    user_id:String
    addedBy:User
    user:User
    deposite: Float
    withdraw:Float
    purpose:String
    created_at:DateTime



  },
  input AddAmountInput {
    userId: String!
    amount: Float!
  },


  type ResponsePayload {
    success: Boolean
    error:JSON
   
  }




 
`


module.exports = typeDefs