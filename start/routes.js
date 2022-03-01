"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});






Route.group(() => {
  Route.post('signUp', 'UserController.createUser')
  Route.post('createDriver', 'UserController.createDriver')
  Route.post('signIn', 'UserController.loginUser')
  Route.get('fetchAllDriver', 'UserController.fetchAllDriver')
  Route.get('fetchAllUser', 'UserController.fetchAllUser')
  Route.get('fetchUserById/:id', 'UserController.fetchUserById')
  Route.post('updateUser', 'UserController.updateUser')
  Route.get('authMe', 'UserController.authMeUser').middleware('auth')



  Route.post('createOrder', 'OrderController.createOrder').middleware('auth')
  Route.get('fetchAllOrder', 'OrderController.fetchAllOrder')
  Route.get('fetchOrderById/:id', 'OrderController.fetchOrderById')
  Route.post('updateOrder', 'OrderController.updateOrder').middleware('auth')
  Route.get('fetchUserOrder', 'OrderController.fetchUserOrder').middleware('auth')



  Route.get('getDashboard', 'DashboardController.getDashboard').middleware('auth')

  Route.get('fetchSetting', 'SettingController.fetchSetting')
  Route.post('updateSetting', 'SettingController.updateSetting')

}).prefix("api");




Route.group(() => {
  Route.post("upload", "FileController.upload");
  Route.get("download/:fileName", "FileController.download");
}).prefix("api/file/");