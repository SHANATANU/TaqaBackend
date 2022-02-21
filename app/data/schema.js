'use strict'
const { merge } = require("lodash");
const graphqlScaler =require("graphql-scalars")
const ScalerTypeDef=graphqlScaler.typeDefs
const ScalerResover=graphqlScaler.resolvers


// Define our schema using the GraphQL schema language
const OrderTypedef =require('./Order/schema');
const userTypedef =require('./User/schema');
const settingTypedef =require('./Setting/schema');
const roleTypedef =require('./Role/schema');
const languageTypedef =require('./Language/schema');
const packageTypedef =require('./Package/schema');
const regionTypedef =require('./Region/schema');
const passBookTypedef=require('./PassBook/schema')


const OrderResolver =require('./Order/resolver');
const userResolver =require('./User/resolver');
const settingResolver =require('./Setting/resolver');
const languageResolver =require('./Language/resolver');
const roleResolver =require('./Role/resolver');
const packageResolver =require('./Package/resolver');
const regionResolver =require('./Region/resolver');
const passBookResolver=require('./PassBook/resolver')

const Query = `
    type Query {
        authMe:User
        allUser(userType: String!):[User]
        fetchUser(userId:String!):User
        allOrder: [Order]
        fetchUserOrder(userId: String!): [Order]
        fetchDriverOrder(driverId:String):[AssignDriver]
        fetchOrder(id: String!): Order
        fetchPreviousLocation(userId:String!):[Location]
        fetchSetting:Setting
        fetchLanguageList:[Language]
        fetchLanguage(name: String!):Language
        allRole:[Role]
        fetchRole(id:String!):Role
        allPackage:[Package]
        fetchPackage(id:String!):Package
        allRegion:[Region]
        fetchRegion(id:String!):Region
        allRegionPrice:[RegionPrice]
        checkRegion(lat:Float,lng:Float):Region
        allAddedMoney:[PassBook]

    },
    type Mutation {
        addUser(input:UserInput): AuthPayload! 
        addDriver(input:UserInput): AuthPayload!
        addAdmin(input:UserInput): User 
        addSupervisor(input:UserInput): User 
        add(input:UserInput): User 
        loginUser(input:UserInput):AuthPayload!
        updateUser(userId:String, input:UserInput):Boolean
        addOrder(userId:String,input:OrderInput): Order
        assignDriver(orderId:String,driverId:String):Boolean
        updateOrder(id:String,input:OrderInput):Boolean
        addSetting(input:SettingInput):Setting
        updateSetting(id:String ,input:SettingInput):Boolean
        manageLanguage(input:LanguageInput):Boolean
        addRole(input:RoleInput): Role 
        updateRole(id:String, input:RoleInput):Boolean
        assignRole(userId:String,roleId:String):Boolean
        addPackage(input:PackageInput): Package 
        updatePackage(id:String, input:PackageInput):Boolean
        updateDriverAssign(id:String,input:AssignDriverInput):Boolean
        addRegion(input:RegionInput): Region 
        updateRegion(id:String, input:RegionInput):Boolean
        updateRegionPrice(id:String, input:RegionPriceInput):Boolean
        assignRegion(id:String,regionIds:[String]):Boolean

        addMoneyToUser(userId:String,amount:Float):ResponsePayload
    }


    type Subscription {
        onAddOrder: [Order]
    }
`;


let resolverStack = merge(ScalerResover,OrderResolver,userResolver,settingResolver,languageResolver,roleResolver,packageResolver,regionResolver,passBookResolver);

module.exports = ({typeDefs: [ScalerTypeDef,Query,settingTypedef,OrderTypedef,userTypedef,languageTypedef,roleTypedef,packageTypedef,regionTypedef,passBookTypedef], resolvers:resolverStack,})