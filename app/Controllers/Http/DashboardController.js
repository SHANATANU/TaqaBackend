'use strict'
const Order = use("App/Models/Order");
const Location = use("App/Models/Location");
const User = use("App/Models/User");

class DashboardController {

    async getDashboard({ request, response }) {
        try{
            let resData={};
            // let superAdminUser=await User.findBy({"userType":"SUPERADMIN"})

            // resData['driverCount'] = await User.query().where({ userType:"DRIVER" }).count()
            // resData['userCount'] = await User.query().where({ userType:"USER" }).count()
            // resData['newOrderCount'] = await Order.query().where({ deliveryStatus:"SCHEDULE" }).count()
            // resData['pendingOrderCount'] = await Order.query().where({ deliveryStatus:"PENDING" }).count()
            // resData['completeOrderCount'] = await Order.query().where({ deliveryStatus:"DELIVERED" }).count() 
            // resData['deposite_amount'] =  superAdminUser.deposite_amount
            // resData['profite_amount'] =   superAdminUser.profite_amount
            response.ok({ success: true, error: null, data: resData });
        }
        catch (error) {
           
            response.badRequest({ success: false, error: error, data: null });
        }
      }

}

module.exports = DashboardController

