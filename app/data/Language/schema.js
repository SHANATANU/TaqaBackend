'use strict'


// Define our schema using the GraphQL schema language
const typeDefs = `
  type Language {
    _id:String
    languageName:String!
    rtlSupport: Boolean!
    languageJson:JSON!
   
  },
  input LanguageInput {
    _id:String
    languageName:String!
    rtlSupport: Boolean!
    languageJson:JSON!
  },

`


module.exports = typeDefs