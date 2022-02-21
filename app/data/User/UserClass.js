"use strict";
const User = use("App/Models/User");
const Location = use("App/Models/Location");
const Role = use("App/Models/Role");
const DriverRegionAssign = use("App/Models/DriverRegionAssign");
const Hash = use("Hash");
module.exports = class UserClass {
  async createUser(input,auth) {
    try {
      input["userType"] = "USER";
      input["wallet_amount"]=0
      let userObj = await User.create(input);
      const { token } = await auth.withRefreshToken().generate(userObj)
      return {"token":token,"user":userObj}
    } catch (error) {
      return null;
    }
  }

  async createDriver(input,auth) {
    try {
      input["userType"] = "DRIVER";
      input["online"] = true;
      input["activated"] = false;
      input["suspended"] = false;
      input["deleteStatus"] = false;
      input["wallet_amount"]=0
      input['driverPercentage']=0
      let userObj = await User.create(input);
      const { token } = await auth.withRefreshToken().generate(userObj)

      console.log({"token":token,"user":userObj})
      return {"token":token,"user":userObj}
     
    } catch (error) {
      return null;
    }
  }

  async createAdmin(input) {
    try {
      input["userType"] = "ADMIN";
      let userObj = await User.create(input);
      return userObj;
    } catch (error) {
      return null;
    }
  }

  async createSupervisor(input) {
    try {
      input["userType"] = "SUPERVISOR";
      let userObj = await User.create(input);
      return userObj;
    } catch (error) {
      return null;
    }
  }

  async fetchAllUser(userType,auth) {
    try {

      let userObj = await User.query().where({userType:userType}).fetch()
      
      return userObj.toJSON();
    } catch (error) {
    
    }
  }

  async loginUser(input,auth) {  
      let userObj = await User.findBy({ phoneNumber: input.phoneNumber });
      if (userObj==null) {
        userObj = await User.findBy({email: input.phoneNumber});
      }
      if(userObj==null){
        throw new Error('User email/password does not match!');
      }
      const isSame = await Hash.verify(input.password, userObj.password);
      if(!isSame){
        throw new Error('Password does not match!');
      }
      userObj.merge({ deviceToken: input.deviceToken });
      await userObj.save();
      const { token } = await auth.withRefreshToken().generate(userObj)
      userObj=await User.query().where({ _id: userObj._id }).with('roleData').fetch();
      return {"token":token,"user":userObj.toJSON()[0]}
  }

  async findUserById(id) {
    try {
      let userObj = await User.findBy({ _id: id });
      userObj['regions']=await DriverRegionAssign.query().where({userId:userObj._id}).pluck("regionId")
      return userObj;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async authMeUser(auth) {
   
      let authUser=auth.user
      let userObj = await User.query().where({ _id: authUser._id }).with('roleData').fetch();
     
      if(userObj.length==0){
        throw new Error('Invalid User aceess!');
      }

      return userObj.toJSON()[0];
     
  }







  async updateUser(id, input) {
    try {
      
      if(input.password){
        input.password=await Hash.make(input.password)
      }
      if (input.location) {
        let location = {
          userId: id,
          buildingNumber: input.location.buildingNumber
            ? input.location.buildingNumber
            : "",
          street: input.location.street ? input.location.street : "",
          city: input.location.city ? input.location.city : "",
          region: input.location.region ? input.location.region : "",
          state: input.location.state ? input.location.state : "",
          country: input.location.country ? input.location.country : "",
          country: input.location.country ? input.location.country : "",
          landmark: input.location.buildingNumber
            ? input.location.buildingNumber
            : "",
          phoneNumber: input.location.phoneNumber
            ? input.location.phoneNumber
            : "",
          dateAt: input.location.dateAt ? input.location.dateAt : new Date(),
          timeAt: input.location.timeAt ? input.location.timeAt : new Date(),
          latitude: input.location.latitude ? input.location.latitude : 0.0,
          longitude: input.location.longitude ? input.location.longitude : 0.0,
          locationType: "Address",
        };

        await Location.create(location);
      }
      let userObj = await User.query().where({ _id: id }).update(input);
      return userObj.result.nModified == 1 ? true : false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
