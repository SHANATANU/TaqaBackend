"use strict";

// Define our schema using the GraphQL schema language
const typeDefs = `
  type Package {
    _id:String
    name:String
    timePeriod:Float
    noOfOrder:Float
    price:Float
    activateStatus:Boolean
    deleteStatus:Boolean
    created_at:DateTime
  },
  input PackageInput {
    name:String
    timePeriod:Float
    noOfOrder:Float
    price:Float
    activateStatus:Boolean
    deleteStatus:Boolean
    
  },

  
`;

module.exports = typeDefs;
