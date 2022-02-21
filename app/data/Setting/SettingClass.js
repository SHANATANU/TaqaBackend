"use strict";
const Setting = use("App/Models/Setting");

module.exports = class SettingClass {
  async createSetting(input,key) {
    try {
   
      let settingObj = await Setting.create(input);
      return settingObj;
    } catch(error) {
        console.log(error)
      return null;
    }
  }

  async fetchAllSetting() {
    try {
      let settingObj = await Setting.first();

      return settingObj;
    } catch(error) {
      return null;
    }
  }

//   async assignPackageToDriver(input) {
//     try {
//       let packageObj = await Package.findBy({ _id: input.packageId })
//       packageObj.merge({assingDriver:{name:"Ram",email:"ram@gmail.com"}})
//       await packageObj.save()
//       return packageObj.toJSON();
//     } catch(error) {
//       return null;
//     }
//   }


  async updateSetting(id,input) {
    try {
      let settingObj = await Setting.query().where({_id:id}).update(input);
      return settingObj.result.nModified==1?true:false;
    } catch(error) {
        console.log(error)
      return null;
    }
  }



};
