const Order = use("App/Models/Order");
const slugify = require("slugify");
const OrderClass =use('./OrderClass')
const { broadcast } = require("../../utils/SocketUtils");

// Define resolvers
const resolver = {
 
  Query: {
    // Fetch all Order
    async allOrder(_,{},{auth}) {
      await auth.check()
      return await new OrderClass().fetchAllOrder()
    },
    // Get a post by its ID
    async fetchOrder(_, { id },{auth}) {
      await auth.check()
      return await new OrderClass().findOrderById(id)
    },
    async fetchPreviousLocation(_, { userId },{auth}) {
      await auth.check()
      return await new OrderClass().fetchUserPreviousLocationList(userId)
    },
    async fetchUserOrder(_, { userId },{auth}) {
      await auth.check()
      return await new OrderClass().fetchUserOrderById(userId)
    },
    async fetchDriverOrder(_, { driverId },{auth}) {
      await auth.check()
      return await new OrderClass().fetchDriverAssignOrder(driverId)
    },


  },
  Mutation: {
    // Create new Order
    async addOrder(_, { userId,input },{auth}) {
      await auth.check()
   
      let allOrder= await new OrderClass().fetchAllOrder()
      broadcast("allOrder", "mlt:allOrder",allOrder);
      return await new OrderClass().createOrder(userId,input)
    },
    async assignDriver(_,{orderId,driverId},{auth}){
      await auth.check()
      return await new OrderClass().assignOrderToDriver(orderId,driverId)
    },
    async updateOrder(_,{id,input},{auth}){
      await auth.check()
      return await new OrderClass().updateOrder(id,input)
    },

    async updateDriverAssign(_,{id,input},{auth}){
      await auth.check()
      return await new OrderClass().updateDriverAssignById(id,input)
    }

  },



  Subscription:{
    onAddOrder: {
      subscribe: () => pubsub.asyncIterator(["ON_ADD_ORDER"]),
    },
  }

};

module.exports = resolver;
