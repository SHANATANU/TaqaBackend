'use strict'


// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    _id:String
    firstName: String
    lastName: String
    email:String
    phoneNumber:String
    password:String
    location:Location
    profileImage:String
    vehicleType:String
    vehicleName:String
    additionData:[AddtitonData]
    userType:UserType
    deviceToken:String
    online:Boolean
    activated:Boolean
    suspended:Boolean
    deleteStatus:Boolean
    gender:GenderType
    regions:[String]
    roleId:String
    roleData:Role
    wallet_amount:Float
    driverPercentage:Float
   


  },
  input UserInput {
    firstName: String
    lastName: String
    phoneNumber:String
    password:String
    location:LocationInput
    profileImage:String
    vehicleType:String
    vehicleName:String
    additionData:[AddtitonDataInput]
    deviceToken:String
    online:Boolean
    activated:Boolean
    suspended:Boolean
    deleteStatus:Boolean
    gender:String
    regions:[String]
    roleId:String
    driverPercentage:Float

  },


  type AuthPayload {
    token: String!
    user: User!
   
  }




  enum UserType {
    SUPERADMIN,
    ADMIN,
    SUPERVISOR,
    USER,
    DRIVER
  }
  enum GenderType {
    MALE,
    FEMALE,
    OTHER,
   
  }

 
`


module.exports = typeDefs