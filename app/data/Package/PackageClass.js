"use strict";
const User = use("App/Models/User");
const Package = use("App/Models/Package");

module.exports = class PackageClass {
  async create(input) {
    try {
    
      let result = await Package.create(input);
      return result;
    } catch (error) {
      return null;
    }
  }
  async fetchAll() {
    try {
      let result = await Package.all();
      return result.toJSON();
    } catch (error) {
      return null;
    }
  }
  async findById(id) {
    try {
      let result = await Package.findBy({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(id, input) {
    try {
      let result = await Package.query().where({ _id: id }).update(input);
      return result.result.nModified == 1 ? true : false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async assingRoleToUser(userId, roleId) {
    try {
      let result = await User.query().where({_id,userId}).update({roleId:roleId});
      return result?true:false;
    } catch (error) {
      return null;
    }
  }


 


};
