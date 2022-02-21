const Region = use("App/Models/Region");
const slugify = require("slugify");
const RegionClass =use('./RegionClass')

// Define resolvers
const resolver = {
 
  Query: {
    // Fetch all Order
    async allRegion(_,{},{auth}) {
      await auth.check()
      return await new RegionClass().fetchAll()
    },

    async allRegionPrice(_,{},{auth}) {
      await auth.check()
      return await new RegionClass().fetchAllRegionPrice()
    },
    // Get a post by its ID
    async fetchRegion(_, { id },{auth}) {
      await auth.check()
      return await new RegionClass().findById(id)
    },
    async checkRegion(_, { lat,lng },{auth}) {
      await auth.check()
      return await new RegionClass().checkRegionFunction(lat,lng)
    },
  },
  Mutation: {
    // Create new Region
    async addRegion(_, {input},{auth}) {
      await auth.check()
      return await new RegionClass().create(input)
    },
    // async assignPackage(_,{userId,roleId}){
    //   return await new PackageClass().assingRoleToUser(userId,roleId)
    // },
    async updateRegion(_,{id,input},{auth}){
      await auth.check()
      return await new RegionClass().update(id,input)
    },
    async updateRegionPrice(_,{id,input},{auth}){
      await auth.check()
      return await new RegionClass().updateRegionPrice(id,input)
    },
    async assignRegion(_,{id,regionIds},{auth}){
      await auth.check()
      return await new RegionClass().assingRegionFunction(id,regionIds)
    }

  },

};

module.exports = resolver;
