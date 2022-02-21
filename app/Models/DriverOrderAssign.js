'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DriverOrderAssign extends Model {
      driverInfo() {
        return this.hasOne('App/Models/User', 'driverId', '_id')
      }
      orderInfo() {
        return this.hasOne('App/Models/Order', 'orderId', '_id')
      }


}

module.exports = DriverOrderAssign
