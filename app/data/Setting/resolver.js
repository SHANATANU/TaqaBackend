
const slugify = require("slugify");
const SettingClass =use('./SettingClass')

// Define resolvers
const resolver = {
 
  Query: {
    // Fetch all Package
    async fetchSetting(_,{},{auth}) {
      await auth.check()
      return await new SettingClass().fetchAllSetting()
    },
    
  },
  Mutation: {
    // Create new Package
    async addSetting(_, { input },{auth}) {
      await auth.check()
      return await new SettingClass().createSetting(input)
    },

    async updateSetting(_, { id,input },{auth}) {
      await auth.check()
        return await new SettingClass().updateSetting(id,input)
      },
    

  },

};

module.exports = resolver;
