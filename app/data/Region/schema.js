"use strict";

// Define our schema using the GraphQL schema language
const typeDefs = `
  type Region {
    _id:String
    code:String
    name:String
    data:JSON
    created_at:DateTime
  },
  input RegionInput {
    code:String
    name:String
    data:JSON
    activeStatus:Boolean
    deleteStatus:Boolean 
  },

  type RegionPrice{
    _id:String
    source:String
    destination:String
    pricePerKm:Float
    pricePerMin:Float
    sourceInfo:Region
    destinationInfo:Region

  },

  input RegionPriceInput{
    pricePerKm:Float
    pricePerMin:Float

  },
  type DriverRegion {
    _id:String
    regionId:String
    userId: String
    userType:String

  },
  




`;

module.exports = typeDefs;
