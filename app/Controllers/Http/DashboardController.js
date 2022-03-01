'use strict'
const Order = use("App/Models/Order");
const Location = use("App/Models/Location");
const User = use("App/Models/User");

class DashboardController {

    async getDashboard({ request, response }) {
        try{
            let resData={};
            resData['driverCount'] = await User.query().where({ user_type:"DRIVER" }).count()
            resData['userCount'] = await User.query().where({ user_type:"USER" }).count()
            resData['newOrderCount'] = await Order.query().where({ order_status:"NEW" }).count()
            resData['pendingOrderCount'] = await Order.query().where({ order_status:"PENDING" }).count()
            resData['completeOrderCount'] = await Order.query().where({ order_status:"DELIVERED" }).count() 
            response.ok({ success: true, error: null, data: resData });
        }
        catch (error) {
           
            response.badRequest({ success: false, error: error, data: null });
        }
      }

}

module.exports = DashboardController

