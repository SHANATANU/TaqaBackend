const User = use("App/Models/User");

const PassBookClass =use('./PassBookClass')

// Define resolvers
const resolver = {
  
  Query: {
    // Fetch all Package
    async allAddedMoney(_,{},{auth}) {
     await auth.check()
     return await new PassBookClass().fetchAllTransaction()
    },
   
  },
  Mutation: {
    // Create new user
    async addMoneyToUser(_, { userId,amount },{auth}) {
      await auth.check()
      return await new PassBookClass().addMoneyToUser(userId,amount,auth)
    },
   

  },

};

module.exports = resolver;
