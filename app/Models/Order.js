'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    

    orderUser () {
        return this.hasOne('App/Models/User', 'user_id', '_id')
    }
    assignDriver () {
        return this.hasOne('App/Models/User', 'driver_id', '_id')
    }
    
}

module.exports = Order
