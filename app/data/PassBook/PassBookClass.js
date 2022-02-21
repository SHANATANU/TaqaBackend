"use strict";
const User = use("App/Models/User");
const PassBook = use("App/Models/PassBook");
const { nanoid } = require('nanoid')
module.exports = class PassBookClass {
  async addMoneyToUser(userId,amount,auth) {
    try {
      const userAuth = await auth.user;
      let user = await User.findBy({ _id: userId });
      let requestBody={};
      requestBody['txnid']=await nanoid()
      requestBody["added_by_user_id"] = userAuth._id;
      requestBody["user_id"] = user._id;
      requestBody["deposite"] = amount;
      requestBody["withdraw"] = 0;
      requestBody["purpose"] = "Add to wallet";
      let result = await PassBook.create(requestBody);

      //Add money to user wallet
      user.merge({ wallet_amount: user.wallet_amount+parseFloat(amount) })
      await user.save()

      //Add money to superadmin wallet
      let superAdminUser=await User.findBy({"userType":"SUPERADMIN"})
      let deposite_amount=superAdminUser.deposite_amount?superAdminUser.deposite_amount:0
      superAdminUser.merge({ deposite_amount: deposite_amount+parseFloat(amount) })
      await superAdminUser.save()
  


      return {"success":true,error:null}
    } catch (error) {
      console.log(error)
      return {"success":false,error:error}
    }
  }


  async fetchAllTransaction() {
    try {
      
      let passbookList = await PassBook.query().with('addedBy').with('user').fetch();
      return passbookList.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }






























  async handleCashPayement(driverId,order) {
    try {
      let superAdminUser=await User.findBy({"userType":"SUPERADMIN"})
      let driver = await User.findBy({ _id: driverId });
      let adminCutAmount=(100-driver.driverPercentage)*order.deliveryPrice/100

      let requestBody={};
      requestBody['txnid']=await nanoid()
      requestBody["added_by_user_id"] = superAdminUser._id;
      requestBody["user_id"] = driver._id;
      requestBody["deposite"] = 0;
      requestBody["withdraw"] = adminCutAmount;
      requestBody["purpose"] = "Order Delivery";
      let result = await PassBook.create(requestBody);

      //Add money to user wallet
      driver.merge({ wallet_amount: driver.wallet_amount-parseFloat(adminCutAmount) })
      await driver.save()

      //Add money to superadmin wallet
    
      let profite_amount=superAdminUser.profite_amount?superAdminUser.profite_amount:0
      superAdminUser.merge({ profite_amount: profite_amount+parseFloat(adminCutAmount) })
      await superAdminUser.save()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }


  async handleOnlinePayement(driverId,order) {
    try {
      let superAdminUser=await User.findBy({"userType":"SUPERADMIN"})
      let orderUser = await User.findBy({ _id: order.userId });
      let driver = await User.findBy({ _id: driverId });
      let requestBody={};
      requestBody['txnid']=await nanoid()
      requestBody["added_by_user_id"] = superAdminUser._id;
      requestBody["user_id"] = orderUser._id;
      requestBody["deposite"] = 0;
      requestBody["withdraw"] = order.deliveryPrice;
      requestBody["purpose"] = "Order Placed";
      await PassBook.create(requestBody);
      orderUser.merge({ wallet_amount: orderUser.wallet_amount-parseFloat( order.deliveryPrice) })
      await orderUser.save()

      let adminCutAmount=(100-driver.driverPercentage)*order.deliveryPrice/100
      let driverCutAmmount=order.deliveryPrice-adminCutAmount
      let requestBody1={};
      requestBody1['txnid']=await nanoid()
      requestBody1["added_by_user_id"] = superAdminUser._id;
      requestBody1["user_id"] = driver._id;
      requestBody1["deposite"] =driverCutAmmount;
      requestBody1["withdraw"] = 0;
      requestBody1["purpose"] = "Order Delivery";
      await PassBook.create(requestBody1);

      //Add money to user wallet
      driver.merge({ wallet_amount: driver.wallet_amount+driverCutAmmount })
      await driver.save()

      //Add money to superadmin wallet
    
      let profite_amount=superAdminUser.profite_amount?superAdminUser.profite_amount:0
      superAdminUser.merge({ profite_amount: profite_amount+parseFloat(adminCutAmount) })
      await superAdminUser.save()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }









};
