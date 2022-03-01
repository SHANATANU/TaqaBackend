'use strict'

/*
|--------------------------------------------------------------------------
| SuperAdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class SuperAdminSeeder {
  async run () {

    let reqUser={
      email:"admin@taqa.com",
      first_name:"Super",
      last_name:"Admin",
      phone_number:"7485964160",
      password:"admin@1234",
      fcm_token:"122222",
      user_type:"SUPERADMIN"
    }
    let user=await use("App/Models/User").findBy({"userType":"SUPERADMIN"})
    if(user==null)
    {
        await use("App/Models/User").create(reqUser)
    }
  }
}

module.exports = SuperAdminSeeder
