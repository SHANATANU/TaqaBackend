'use strict'

/*
|--------------------------------------------------------------------------
| SettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class SettingSeeder {
  async run () {

    let reqData={"deliveryStatus":["SCHEDULE","INPROGRESS","PENDING","REJECTED","ACCEPTED","IN THE WAY","DELIVERED"],"financialStatus":[],"deliveryType":[],"vehicleType":[],"deliveryPricePerKm":0.0,"deliveryPricePerMin":0.0,"contantPrice":0.0,"regions":[]}
    let setting=await use("App/Models/Setting").first()
    if(setting==null)
    {
        await use("App/Models/Setting").create(reqData)
    }

  }
}

module.exports = SettingSeeder
