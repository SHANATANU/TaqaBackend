'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use("Hash");

class RoleSeeder {
  async run () {


    let reqData={"name":"SUPERADMIN","permission":[
      {"name":"dashboard","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"admin","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"supervisor","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"user","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"driver","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"order","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"role","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"package","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"setting","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"language","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"region","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"deliveryCharge","permissionData":["EDIT","VIEW","DELETE"]},
      {"name":"addMoney","permissionData":["EDIT","VIEW","DELETE"]}
    ]}
    let role=await use("App/Models/Role").findBy({"name":"SUPERADMIN"})
    if(role==null)
    {
      role= await use("App/Models/Role").create(reqData)
    }
    else
    {
        await use("App/Models/Role").query().where({_id:role._id}).update(reqData)
    }
    let reqUser={"firstName":"Super","lastName":"Admin","userType":"SUPERADMIN","email":"admin@mlt.com",'password':"admin@1234","phoneNumber":"","roleId":role._id}
    let user=await use("App/Models/User").findBy({"userType":"SUPERADMIN"})
    if(user==null)
    {
        await use("App/Models/User").create(reqUser)
    }
    else
    {
        reqUser.password=await Hash.make("admin@1234")
        await use("App/Models/User").query().where({_id:user._id}).update(reqUser)
    }
  }
}

module.exports = RoleSeeder
