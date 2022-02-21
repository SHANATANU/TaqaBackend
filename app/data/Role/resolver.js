const Order = use("App/Models/Order");
const slugify = require("slugify");
const RoleClass =use('./RoleClass')

// Define resolvers
const resolver = {
 
  Query: {
    // Fetch all Order
    async allRole(_,{},{auth}) {
      await auth.check()
      return await new RoleClass().fetchAll()
    },
    // Get a post by its ID
    async fetchRole(_, { id },{auth}) {
      await auth.check()
      return await new RoleClass().findById(id)
    },
  },
  Mutation: {
    // Create new Order
    async addRole(_, {input},{auth}) {
      await auth.check()
      return await new RoleClass().create(input)
    },
    async assignRole(_,{userId,roleId},{auth}){
      await auth.check()
      return await new RoleClass().assingRoleToUser(userId,roleId)
    },
    async updateRole(_,{id,input},{auth}){
      await auth.check()
      return await new RoleClass().update(id,input)
    }

  },

};

module.exports = resolver;
