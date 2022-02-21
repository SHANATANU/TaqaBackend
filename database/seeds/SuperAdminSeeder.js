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

    let role=await use("App/Models/Role").findBy({"name":"SUPERADMIN"})
    let reqUser={"firstName":"Super","lastName":"Admin","userType":"SUPERADMIN","email":"admin@mlt.com",'password':"admin@1234","phoneNumber":"","roleId":role._id,'deposite_amount':0,'profite_amount':0}
    let user=await use("App/Models/User").findBy({"userType":"SUPERADMIN"})
    if(user==null)
    {
        await use("App/Models/User").create(reqUser)
    }
  }
}

module.exports = SuperAdminSeeder
