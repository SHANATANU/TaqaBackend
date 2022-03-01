'use strict'
const Setting = use("App/Models/Setting");
class SettingController {

    async fetchSetting({response }) {
        try {
            let result = await Setting.first();
            if(!result){
                this.checkErrorType({code:"CUSTOME",msg:"No setting record avilable"},response)
                return
            }
            response.ok({ success: true, data:result , error: null });
        } catch(error) {
            this.checkErrorType(error, response);
        }
    }


    async updateSetting({request,response }) {
        try {
            let requestData=request.body
            let result = await Setting.query().where({ _id: requestData._id }).update(requestData);
            if(result.result.nModified != 1){
              this.checkErrorType({code:"CUSTOME",msg:"Setting Updation failed"},response)
              return
            }
            result = await Setting.findBy({ _id: requestData.id });
            response.ok({ success: true, data:result , error: null });
        } catch(error) {
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

module.exports = SettingController
