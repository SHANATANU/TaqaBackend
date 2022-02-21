const User = use("App/Models/User");

const UserClass =use('./UserClass')

// Define resolvers
const resolver = {
  
  Query: {
    // Fetch all Package
    async allUser(_,{userType},{auth}) {
     await auth.check()
    // if(!await auth.check())
    // {
    //   throw new Error('Unauthenticate!');
    // }
     return await new UserClass().fetchAllUser(userType,auth)
    },
    // Get a post by its ID
    async fetchUser(_, { userId },{auth}) {
      await auth.check()
      return await new UserClass().findUserById(userId)
    },

    //// Auth Me
    async authMe(_,{},{auth}) {
      await auth.check()
      return await new UserClass().authMeUser(auth)
    },
  },
  Mutation: {
    // Create new user
    async addUser(_, { input },{auth}) {
      return await new UserClass().createUser(input,auth)
    },
    async addUser(_, { input },{auth}) {
      return await new UserClass().createUser(input,auth)
    },
    async addDriver(_, { input },{auth}) {
      return await new UserClass().createDriver(input,auth)
    },
    async addAdmin(_, { input },{auth}) {
      await auth.check()
      return await new UserClass().createAdmin(input)
    },
    async addSupervisor(_, { input },{auth}) {
      await auth.check()
      return await new UserClass().createSupervisor(input)
    },

    async loginUser(_, {input},{auth}) {
      return await new UserClass().loginUser(input,auth)
    },

    async updateUser(_, { userId,input },{auth}) {
      await auth.check()
      return await new UserClass().updateUser(userId,input)
    },


  },

};

module.exports = resolver;
