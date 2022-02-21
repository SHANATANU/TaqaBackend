'use strict'

const User = use("App/Models/User");
const Order = use("App/Models/Order");
class OrderController {

    //{"NEW","PENDING","ASSIGN","CANCEL","DELIVERED","ONWAY"}
    async createOrder ({ request, response,auth }) {
        try {
          let requestData=request.body
          let authUser=auth.user
          if(!requestData.user_id){
            requestData["user_id"] = authUser._id;
          }
          requestData["driver_id"] = null;
          requestData["order_status"]="NEW"
          requestData["delete_status"] = false;
          let result = await Order.create(requestData);
          response.ok({ success: true, error: null, data:result  });
        } catch (error) {
          this.checkErrorType(error,response)
        }
    }
    async fetchAllOrder({response }) {
        try {
          let result = await Order.query().with('orderUser').with('assignDriver').fetch();
          response.ok({ success: true, data:result , error: null });
        } catch (error) {
          this.checkErrorType(error, response);
        }
    }
    async fetchUserOrder({params,response }) {
        try {
          let result = await Order.query().where({'user_id':params.id}).with('assignDriver').fetch();
          response.ok({ success: true, data:result , error: null });
        } catch (error) {
          this.checkErrorType(error, response);
        }
    }

    async fetchOrderById({params,response,auth }) {
        try {
          let result =  await Order.query().where({'_id':params.id}).with('orderUser').with('assignDriver').fetch();
          if(!result){
            this.checkErrorType({code:"CUSTOME",msg:"Order does not exists"},response)
            return
          }
          response.ok({ success: true, data:result , error: null });
        } catch (error) {
          this.checkErrorType(error, response);
        }
    }

    async updateOrder({request,response,auth }) {
        try {
         let requestData=request.body
         let result = await Order.query().where({ _id: requestData.id }).update(requestData);
         if(result.result.nModified != 1){
            this.checkErrorType({code:"CUSTOME",msg:"User Updation failed"},response)
            return
         }
         result = await Order.query().where({'_id':requestData.id}).with('orderUser').with('assignDriver').fetch();
         response.ok({ success: true, data:result , error: null });
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

module.exports = OrderController
