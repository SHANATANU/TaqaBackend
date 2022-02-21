
const slugify = require("slugify");
const LanguageClass =use('./LanguageClass')

// Define resolvers
const resolver = {
 
  Query: {
    // Fetch all Package
    async fetchLanguageList(_,{},{auth}) {
      await auth.check()
      return await new LanguageClass().fetchAllLanguage()
    },
    async fetchLanguage(_, { name },{auth}) {
     
      return await new LanguageClass().fetchLanguageByName(name)
    },
    
  },
  Mutation: {
    // Create new Package
    async manageLanguage(_, { input },{auth}) {
     
      return await new LanguageClass().manageLanguage(input)
    },
  },

};

module.exports = resolver;
