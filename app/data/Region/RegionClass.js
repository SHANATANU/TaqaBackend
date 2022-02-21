"use strict";
const User = use("App/Models/User");
const Region = use("App/Models/Region");
const RegionPrice = use("App/Models/RegionPrice");
const DriverRegionAssign = use("App/Models/DriverRegionAssign");




module.exports = class RegionClass {
  async create(input) {
    try {
      let result = await Region.findBy({ name: input.name });
      if (result == null) {
        result = await Region.create(input);
        let allRegion = await Region.all();
        let regionList = allRegion.toJSON().reduce((acc, item) => {
          acc.push({
            source: item._id,
            destination: result._id,
            pricePerKm: 0.0,
            pricePerMin:0.0
          });
          return acc;
        }, []);

        await RegionPrice.createMany(regionList);
      }
      return result;
    } catch (error) {
      return null;
    }
  }
  async fetchAll() {
    try {
      let result = await Region.all();
      return result.toJSON();
    } catch (error) {
      return null;
    }
  }
  async findById(id) {
    try {
      let result = await Region.findBy({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(id, input) {
    try {
      let result = await Region.query().where({ _id: id }).update(input);
      return result.result.nModified == 1 ? true : false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async fetchAllRegionPrice() {
    try {
      let result = await RegionPrice.query()
        .with(["sourceInfo", "destinationInfo"])
        .fetch();
      return result.toJSON();
    } catch (error) {
      return null;
    }
  }

  async updateRegionPrice(id, input) {
    try {
      let result = await RegionPrice.query().where({ _id: id }).update(input);
      return result.result.nModified == 1 ? true : false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async assingRegionFunction(id, regionIds) {
    try {
  
      let user = await User.findBy({ _id: id });
      await DriverRegionAssign.query().where({ userId: user._id }).delete();
      let reqData = regionIds.reduce((acc, item) => {
        acc.push({
          userId: user._id.toString(),
          regionId: item,
          userType: user.userType,
        });
        return acc;
      }, []);
      let result = await DriverRegionAssign.createMany(reqData);
      return result ? true : false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async checkRegionFunction(lat, lng) {
    try {
      let region = null;
      let result = await Region.all();
      result = result.toJSON().length > 0 ? result.toJSON() : [];
      for (let i = 0; i < result.length; i++) {
        if (await this.inside(lat, lng, result[i].data)) {
          region = result[i];
          break;
        }
      }
      return region;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async inside(lat, lng, vs) {
    var x = lat,
      y = lng;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i].lat,
        yi = vs[i].lng;
      var xj = vs[j].lat,
        yj = vs[j].lng;

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }
};
