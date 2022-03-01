'use strict'
const User = use("App/Models/User");
const Hash = use("Hash");
class UserController {

    async createUser({ request, response,auth }) {
        try {
          let requestData=request.body
          let userObj = await User.findBy({"email":requestData.email,user_type:"USER"}); 
          if(userObj){
            this.checkErrorType({code:"ER_DUP_ENTRY"},response)
            return
          }
          requestData["user_type"] = "USER";
          requestData["wallet_amount"]=0
          requestData["delete_status"] = false;
          userObj = await User.create(requestData);
          const { token } = await auth.withRefreshToken().generate(userObj)
          
          response.ok({ success: true, error: null, data: {"token":token,"user":userObj} });
        } catch (error) {
          this.checkErrorType(error,response)
        }
    }
    async createDriver({ request, response,auth }) {
        try {
            let requestData=request.body
            let userObj = await User.findBy({"email":requestData.email,user_type:"DRIVER"}); 
            if(userObj){
                this.checkErrorType({code:"ER_DUP_ENTRY"},response)
                return
            }
            requestData["user_type"] = "DRIVER";
            requestData["online"] = true;
            requestData["activated"] = false;
            requestData["suspended"] = false;
            requestData["delete_status"] = false;
            requestData["wallet_amount"]=0
            requestData['driver_percentage']=0
            userObj = await User.create(requestData);
            const { token } = await auth.withRefreshToken().generate(userObj)
    
            response.ok({ success: true, error: null, data: {"token":token,"user":userObj} });
         
        } catch (error) {
            this.checkErrorType(error,response)
        }
    }
    async loginUser({ request, response,auth }) {  
        try {
            let requestData=request.body
            let userObj = await User.findBy({"email":requestData.email}); 
            if(!userObj){
                this.checkErrorType({code:"CUSTOME",msg:"Invalid email"},response)
                return
            }
            const isSame = await Hash.verify(requestData.password, userObj.password);
            if(!isSame){
                this.checkErrorType({code:"CUSTOME",msg:"Password does not match"},response)
                return
            }
            const { token } = await auth.withRefreshToken().generate(userObj)
            response.ok({ success: true, error: null, data: {"token":token,"user":userObj} });
        }
        catch (error) {
            this.checkErrorType(error,response)
        }
    }

    async fetchAllDriver({response }) {
        try {
          let result = await User.query().where({ "user_type": "DRIVER"}).fetch();
          response.ok({ success: true, data:result , error: null });
        } catch (error) {
          this.checkErrorType(error, response);
        }
    }
    async fetchAllUser({response }) {
        try {
          let result = await User.query().where({ "user_type": "USER"}).fetch();
          response.ok({ success: true, data:result , error: null });
        } catch (error) {
          this.checkErrorType(error, response);
        }
    }

    async fetchUserById({params,response,auth }) {
        try {
          let userObj = await User.findBy({ _id: params.id });
          if(!userObj){
            this.checkErrorType({code:"CUSTOME",msg:"User does not exists"},response)
            return
          }
          response.ok({ success: true, data:userObj , error: null });
        } catch (error) {
          this.checkErrorType(error, response);
        }
    }
    async updateUser({request,response,auth }) {
        try { 
          let requestData=request.body
          let userObj = await User.query().where({ _id: requestData._id }).update(requestData);
          if(userObj.result.nModified != 1){
            this.checkErrorType({code:"CUSTOME",msg:"User Updation failed"},response)
            return
          }
          userObj = await User.findBy({ _id: requestData.id });
          response.ok({ success: true, data:userObj , error: null });
        } catch (error) {
            this.checkErrorType(error, response);
        }
    }

    
  async authMeUser({response,auth }) {
    try { 
            let authUser=auth.user
            let userObj = await User.findBy({"_id":authUser._id}); 
            if(!userObj){
                this.checkErrorType({code:"CUSTOME",msg:"Invalid access token"},response)
                return
            }
            response.ok({ success: true, data:{user:userObj} , error: null });
        } catch (error) {
            this.checkErrorType(error, response);
        }
    
    }
    


    

    async checkErrorType(error, response) {
        console.log(error)
        if (error.code === "ER_DUP_ENTRY") {
        response.badRequest({
            success: false,
            error: "User alredy exist !",
            data: null,
        });
        } 
        else if (error.code === "CUSTOME") {
            response.badRequest({
                success: false,
                error: error.msg,
                data: null,
            });
        }
        else if (error.code == "ER_BAD_FIELD_ERROR") {
        response.badRequest({
            success: false,
            error: "Unknown field exist !",
            data: null,
        });
        } else {
        response.badRequest({
            success: false,
            error: error,
            data: null,
        });
        }
    }



}

module.exports = UserController
