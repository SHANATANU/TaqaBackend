const Order = use("App/Models/Order");
const slugify = require("slugify");
const PackageClass =use('./PackageClass')

// Define resolvers
const resolver = {
 
  Query: {
    // Fetch all Order
    async allPackage(_,{},{auth}) {
      await auth.check()
      return await new PackageClass().fetchAll()
    },
    // Get a post by its ID
    async fetchPackage(_, { id },{auth}) {
      await auth.check()
      return await new PackageClass().findById(id)
    },
  },
  Mutation: {
    // Create new Order
    async addPackage(_, {input},{auth}) {
      await auth.check()
      return await new PackageClass().create(input)
    },
    // async assignPackage(_,{userId,roleId}){
    //   return await new PackageClass().assingRoleToUser(userId,roleId)
    // },
    async updatePackage(_,{id,input},{auth}){
      await auth.check()
      return await new PackageClass().update(id,input)
    }

  },

};

module.exports = resolver;
