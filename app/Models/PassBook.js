'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PassBook extends Model {

    user () {
        return this.hasOne('App/Models/User', 'user_id', '_id')
    }

    addedBy () {
        return this.hasOne('App/Models/User', 'added_by_user_id', '_id')
    }


}

module.exports = PassBook
