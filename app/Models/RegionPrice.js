'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RegionPrice extends Model {
    sourceInfo () {
        return this.hasOne('App/Models/Region', 'source', '_id')
    }
    destinationInfo () {
        return this.hasOne('App/Models/Region', 'destination', '_id')
    }

}

module.exports = RegionPrice
