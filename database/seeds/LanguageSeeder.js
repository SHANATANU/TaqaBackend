'use strict'

/*
|--------------------------------------------------------------------------
| LanguageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class LanguageSeeder {
  async run () {

    let reqData={ 
      "languageName":"English",
      "rtlSupport":false,
      "languageJson":{
        /// heading
        login:"Login",
        createYourAccount:"Create Your Account",
        forgetYourPassword:"Forget Your Password ",
        settings:"Settings",
        myWallet:"My Wallet",
        addMoneyToWallet:"Add Money To Wallet",
        orderNumber:"Order No.",
        //login screen
        phoneNumber:"Phone Number",
        password:"Password",
        forgetPassword:"Forget Password",
        dontHaveAnAccount:"Dont have an account",
    
         //signup screen
         firstName:"First Name",
         lastName:"Last Name",
         selectLocation:"Select Location",
         street:"Street",
         region:"Region",
         city:"City",
         valid:"Valid",
         landmark:"Landmark",
         addProfilePhoto:"Add profile Photo",
         optional:"Optional",
         register:"Register",
         gender:"Gender",
         dateOfBirth:"Date of Birth",
         vehicle:"Vehicle",
         image:"Image",
         platNumber:"Plat Number",
         meter:"Meter",
         expiration:"Expiration",
         license:"License",
         insurance:"Insurance",
         validity:"Validity",
         ownership:"Owner Ship",
         vehicleBollValidity:"Vehicle Boll validity",
    
    
         //Forget Password
         enterYourPhoneNumber:"Enter your Phone Number",
         passwordResetLinkMsg:"Link to reset your password will be shae to your mobile number via sms",
         sendLink:'Send Link',
    
         //Home screen
         search:"Search",
         profile:"Profile",
         home:"Home",
         userHeading:"Start Your Work Comfortably",
         menu:"Menu",
         order:"Order",
         wallet:"Wallet",
    
         //Wallet Screen
         walletBalane:"Wallet Balance",
         currentySymbol:"$",
         accountStatus:"Account Status",
         active:"Active",
         pending:"Pending",
         deactive:"Deactive",
         package:"Package",
         expiresOn:"Expires On",
    
         //Add Order Screen
         map:"Map",
         searchOn:"Search on ",
         pickUp:"Pick Up",
         next:"Next",
         previous:"Previous",
         cancel:"Cancel",
         dropOff:"Drop Off",
         financial:"Financial",
         description:"Description",
         placed:"Placed",
         continue:"Continue",
         buildingNumber:"Building Number", 
    
    
         //Order info screen
         schedule:"Schedule",
         new:"New",
         inProgress:"In Progress",
         complete:"Complete",
         pending:"Pending",
         rejected:"Rejected",
         accepted:"Accepted",
         ready:"Ready",
         inTheWay:"In The Way",
         delivered:"Delivered",

         my:"My",
         signUp:"Sign Up",
         expiry:"Expiry",
         more:"More",
         add:"Add",
         location:"Location",
         nearest:"Nearest",
         landmark:"Landmark",
         save:"Save",
         address:"Address",
         more:"More",
         detail:"Detail",
         date:"Date",
         time:"Time",
         status:"Status",
         delivery:"Delivery",
         price:"Price",
         item:"Item",
         name:"Name",
         dealing:"Dealing",
         type:'Type',
         notes:"Notes",
         change:"Change",
         language:"Language",
         notification:"Notification",
         driver:"Driver",
         past:"Past",
         present:"Present",
         future:"Future",
         arrivingIn:"Arriving in",
         please:"Please",
         select:"Select",
         enter:"Enter",
         expected:"Expected",
         distance:"Distance",
         time:"Time",
         send:"Send",
         
    
    
        //driver App
    
    
        accept:"Accept",
        reject:"Reject",
        quota:"Quota",
        monthly:"Monthly",
        daily:"Daily",
        yearly:"Yearly",
        willBeValidFor:"Will Be Valid For",
    
    
        //Driver Save Card
    
        card:"Card",
        payement:"Payement",
        method:"Method",
        debit:"Debit",
        credit:"Credit",
        proceedToPay:"Proceed To Pay",
        pay:"Pay",
        saveCardDetail:"Save Card Detail",
        cardNickname:"Card Nickname",
        cardNumber:"Card Number",
        cvvNumber:"Cvv / CVC Number",
        cardHolderName:"Card holder name",
        logout:"Logout",
        specifyReasonTorejectOrder:"Specify reason to reject order",
        reason:"Reason",
        submit:"Submit"
    
    
    
    }
  }
    let language=await use("App/Models/Language").findBy({"languageName":"English"})
    
    if(language==null)
    {
        await use("App/Models/Language").create(reqData)
    }
    else{
      await use("App/Models/Language").query().where({_id:language._id}).update(reqData)
    }
  }
}

module.exports = LanguageSeeder
