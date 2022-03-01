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

    let reqData={
      "delivery_price":{"per_km":1,"per_min":1},
    }
    let setting=await use("App/Models/Setting").first()
    if(setting==null)
    {
        await use("App/Models/Setting").create(reqData)
    }

  }
}

module.exports = SettingSeeder
