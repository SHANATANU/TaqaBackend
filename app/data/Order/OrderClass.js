"use strict";
const User = require("../../Models/User");
const Order = use("App/Models/Order");
const Location = use("App/Models/Location");
const Setting = use("App/Models/Setting");
const Database = use('Database')
const PassBookClass =use('App/data/PassBook/PassBookClass');
const DriverRegionAssign =use("App/Models/DriverRegionAssign");
const DriverOrderAssign =use("App/Models/DriverOrderAssign")
module.exports = class OrderClass {
  async createOrder(userId, input) {
    try {
      let user = await User.findBy({ _id: userId });
      let dropLocation = {
        userId: user._id,
        buildingNumber: input.dropLocation.buildingNumber
          ? input.dropLocation.buildingNumber
          : "",
        street: input.dropLocation.street ? input.dropLocation.street : "",
        city: input.dropLocation.city ? input.dropLocation.city : "",
        region: input.dropLocation.region ? input.dropLocation.region : "",
        state: input.dropLocation.state ? input.dropLocation.state : "",
        country: input.dropLocation.country ? input.dropLocation.country : "",
        country: input.dropLocation.country ? input.dropLocation.country : "",
        landmark: input.dropLocation.buildingNumber
          ? input.dropLocation.buildingNumber
          : "",
        phoneNumber: input.dropLocation.phoneNumber
          ? input.dropLocation.phoneNumber
          : "",
        dateAt: input.dropLocation.dateAt
          ? input.dropLocation.dateAt
          : new Date(),
        timeAt: input.dropLocation.timeAt
          ? input.dropLocation.timeAt
          : new Date(),
        latitude: input.dropLocation.latitude
          ? input.dropLocation.latitude
          : 0.0,
        longitude: input.dropLocation.longitude
          ? input.dropLocation.longitude
          : 0.0,
        locationType: "DROPOFF",
      };
      let pickUpLocation = {
        userId: user._id,
        buildingNumber: input.pickUpLocation.buildingNumber
          ? input.pickUpLocation.buildingNumber
          : "",
        street: input.pickUpLocation.street ? input.pickUpLocation.street : "",
        city: input.pickUpLocation.city ? input.pickUpLocation.city : "",
        region: input.pickUpLocation.region ? input.pickUpLocation.region : "",
        state: input.pickUpLocation.state ? input.pickUpLocation.state : "",
        country: input.pickUpLocation.country
          ? input.pickUpLocation.country
          : "",
        country: input.pickUpLocation.country
          ? input.pickUpLocation.country
          : "",
        landmark: input.pickUpLocation.buildingNumber
          ? input.pickUpLocation.buildingNumber
          : "",
        phoneNumber: input.pickUpLocation.phoneNumber
          ? input.pickUpLocation.phoneNumber
          : "",
        dateAt: input.pickUpLocation.dateAt
          ? input.pickUpLocation.dateAt
          : new Date(),
        timeAt: input.pickUpLocation.timeAt
          ? input.pickUpLocation.timeAt
          : new Date(),
        latitude: input.pickUpLocation.latitude
          ? input.pickUpLocation.latitude
          : 0.0,
        longitude: input.pickUpLocation.longitude
          ? input.dropLocation.longitude
          : 0.0,
        locationType: "PICKUP",
      };

      await Location.createMany([dropLocation, pickUpLocation]);
      // let tempDistance=await this.calculateDistance({latitude: pickUpLocation.latitude,longitude:pickUpLocation.longitude},{latitude: dropLocation.latitude,longitude:dropLocation.longitude})
  
      let orderObj = await Order.create({
        userId: user._id,
        itemName: input.itemName,
        itemImage: input.itemImage,
        itemDescription: input.itemDescription,
        itemPrice: input.itemPrice,
        deliveryPrice:input.deliveryPrice ,
        deliveryStatus: input.deliveryStatus,
        deliveryType: input.deliveryType,
        financialDealingStatus: input.financialDealingStatus,
        deleteStatus: 0,
        activeStatus: 1,
        additionInfo: input.additionInfo,
        dropLocation: dropLocation,
        pickUpLocation: pickUpLocation,
        distance:input.distance,
        expectedTime:input.expectedTime,
        sourceRegionId:input.sourceRegionId,
        destinationRegionId:input.destinationRegionId,
        paymentMethod:input.payementMethod
      });

      let driverRegion= await DriverRegionAssign.findBy({ regionId:input.destinationRegionId,userType:"DRIVER" });
      if(driverRegion){
      await DriverOrderAssign.create({ orderId:orderObj._id.toString(),driverId:driverRegion.userId,accept:false,reject:false,revoke:false,completed:false });
      }
     
      return orderObj.toJSON();
    } catch (error) {
     console.log(error)
      return null;
    }
  }
  async findOrderById(OrderId) {
      let order = await Order.findBy({ _id: OrderId });
      let orderObj = await Order.query().where({ _id: OrderId }).with('orderUser').fetch();
      orderObj=orderObj.toJSON()
      if(orderObj.length==0){
        throw new Error('Order not avilable!');
      }
      orderObj=orderObj[0]
      let driver=await DriverOrderAssign.query().where({ orderId: order._id,reject:false,revoke:false }).with('driverInfo').fetch();
      driver=driver.toJSON()
      orderObj['assignDriver']=driver.length>0?driver[0].driverInfo:null
      return orderObj;
  
  }

  async fetchAllOrder() {
    try {
      let orderObjs = await Order.with('assignDriver').fetch();

      return orderObjs.toJSON();
    } catch (error) {

      console.log(error)
      return null;
    }
  }

  async assignOrderToDriver(orderId, driverId) {
    try {
      let driver = await User.findBy({ _id: driverId });
      let order = await Order.findBy({ _id: orderId });
      await DriverOrderAssign.query().where({orderId: order._id}).update({revoke:true });
      let driverAssignObj = await DriverOrderAssign.create({ orderId: order._id,driverId:driver._id,accept:false,reject:false,revoke:false,completed:false });
      return driverAssignObj?true:false;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async updateOrder(id, input) {
    try {

      if(input.deliveryStatus && input.deliveryStatus=="DELIVERED"){
        let order = await Order.findBy({ _id: id });
        let driverAssign= await DriverOrderAssign.findBy({orderId:order._id,accept:true})
       
        console.log("payement",order.paymentMethod)
        if(order.paymentMethod &&order.paymentMethod.toLowerCase()=="cash" )
        {
          if(!await new PassBookClass().handleCashPayement(driverAssign.driverId,order)){
            return false
          }
        }
        if(order.paymentMethod &&order.paymentMethod.toLowerCase()=="wallet" )
        {
          if(!await new PassBookClass().handleOnlinePayement(driverAssign.driverId,order)){
            return false
          }
        }
        driverAssign.merge({completed:true})
        driverAssign.save()
       await DriverOrderAssign.query().where({ orderId: id }).update({completed:true})
      }
     let orderObj = await Order.query().where({ _id: id }).update(input);
     return orderObj.result.nModified == 1 ? true : false;
     return false
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async fetchUserPreviousLocationList(userId) {
    try {
      let locationObj = await Location.query().where({ userId:userId }).fetch();
      return locationObj.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async fetchUserOrderById(userId) {
    try {
      let user = await User.findBy({ _id: userId });
      let orderObj = await Order.query().where({ userId: user._id }).fetch();
      return orderObj.toJSON();
    } catch (error) {
      console.log(error);
      return null;
    }
  }



  async fetchDriverAssignOrder(driverId) {
    try {
      let driver = await User.findBy({ _id: driverId });
      let order=await DriverOrderAssign.query().where({ driverId: driver._id,revoke:false ,reject:false}).with('orderInfo').fetch();
      return order.toJSON()
    } catch (error) {
      console.log(error);
      return null;
    }
  }




  async updateDriverAssignById(id,input) {
    try {

      let order=await DriverOrderAssign.query().where({ _id: id }).update(input)
      return order.result.nModified == 1 ? true : false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


    // async calculateDistance(source,destination){
    //   let lat1=source.latitude
    //   let lat2=destination.latitude
    //   let lon1=source.longitude
    //   let lon2=destination.longitude
       
    //   if (lat1 == lat2 && lon1 == lon2) {
    //     return 0;
    //   } 
    //   else {
    //     var radlat1 = (Math.PI * lat1) / 180;
    //     var radlat2 = (Math.PI * lat2) / 180;
    //     var theta = lon1 - lon2;
    //     var radtheta = (Math.PI * theta) / 180;
    //     var dist =
    //       Math.sin(radlat1) * Math.sin(radlat2) +
    //       Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //     if (dist > 1) {
    //       dist = 1;
    //     }
    //     dist = Math.acos(dist);
    //     dist = (dist * 180) / Math.PI;
    //     dist = dist * 60 * 1.1515;
    //     dist = dist * 1.609344 ;
    //     return dist.toFixed(2);
    //   }
    // };
    // async calculateDeliveryPrice(distance){

    //   let settingObj = await Setting.first();
    //   let totalAmmount=settingObj.contantPrice+(distance*settingObj.deliveryPricePerKm)+(10*settingObj.deliveryPricePerMin)
    //   return totalAmmount?totalAmmount:0

    // }
  












};
