'use strict'


// Define our schema using the GraphQL schema language
const typeDefs = `
  type Order {
    _id:String
    userId:String
    orderUser:User
    itemName: String
    itemImage:String
    itemDescription:String
    itemPrice:String
    deliveryPrice:Float
    deliveryStatus:String
    deliveryType:String
    payementMethod:String
    deleteStatus:Boolean
    activeStatus:Boolean
    financialDealingStatus:String
    notes:String
    additionInfo:[AddtitonData]
    dropLocation:Location
    pickUpLocation:Location
    distance:Float
    expectedTime:Float
    assignDriverId:String
    assignDriver:User
    cancel:Boolean
    sourceRegionId:String
    destinationRegionId:String
    cancelReason:String
    created_at:DateTime
 
  },
  input OrderInput {
    itemName: String
    itemImage:String
    itemDescription:String
    itemPrice:String
    deliveryPrice:Float
    deliveryStatus:String
    vehicleType:String
    deliveryType:String
    payementMethod:String
    deleteStatus:Boolean
    activeStatus:Boolean
    financialDealingStatus:String
    notes:String
    additionInfo:[AddtitonDataInput]
    dropLocation:LocationInput
    pickUpLocation:LocationInput
    distance:Float
    expectedTime:Float
    assignDriverId:String
    cancel:Boolean
    sourceRegionId:String
    destinationRegionId:String
    cancelReason:String
    created_at:DateTime
   
  },
  type Location {
    userId:String
    buildingNumber:String
    street:String
    city:String  
    region:String
    state:String
    country:String
    pincode:String
    landmark:String
    phoneNumber:String
    dateAt:Date
    timeAt:DateTime
    latitude:Float 
    longitude:Float
    locationType:String
  },
  input LocationInput {
    buildingNumber:String
    street:String
    city:String  
    region:String
    state:String
    country:String
    pincode:String
    landmark:String
    phoneNumber:String
    dateAt:Date
    timeAt:Time
    latitude:Float
    longitude:Float
   
  },

  type AddtitonData {
    key:String
    value:String
   
  },

  input AddtitonDataInput {
    key:String
    value:String
  },


  type AssignDriver {
    _id:String
    orderId:String!
    driverId: String!
    accept:Boolean
    reject:Boolean
    revoke:Boolean
    completed:Boolean
    reason:String
    orderInfo:Order
  

  },
  input AssignDriverInput {
    orderId:String
    driverId: String
    accept:Boolean
    reject:Boolean
    revoke:Boolean
    completed:Boolean
    reason:String
  },




 
  
`


module.exports = typeDefs