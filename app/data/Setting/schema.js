'use strict'


// Define our schema using the GraphQL schema language
const typeDefs = `
  type Setting {
    _id:String
    deliveryStatus: [String!]
    deliveryType: [String!]
    financialDealingStatus:[String!]
    vehicleType:[String!]
    deliveryPricePerKm:Float
    deliveryPricePerMin:Float
    contantPrice:Float
    regions:[String]
   
  },
  input SettingInput {
    deliveryStatus: [String!]
    deliveryType: [String!]
    financialDealingStatus:[String!]
    vehicleType:[String!]
    deliveryPricePerKm:Float
    deliveryPricePerMin:Float
    contantPrice:Float
    regions:[String]
  },
 
`


module.exports = typeDefs