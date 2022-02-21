"use strict";

// Define our schema using the GraphQL schema language
const typeDefs = `
  type Role {
    _id:String
    name:String
    permission:[Permission]
    created_at:DateTime
  },
  input RoleInput {
    _id:String
    name:String
    permission:[PermissionInput]

  },
  type Permission {
      name:String
      permissionData:[String]
  },
  input PermissionInput {
    name:String
    permissionData:[String]
  },

  


  enum AccessType {
    EDIT,
    VIEW,
    DELETE,
    SELF,
    
  }


  
`;

module.exports = typeDefs;
