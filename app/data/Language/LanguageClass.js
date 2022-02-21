"use strict";
const Language = use("App/Models/Language");

module.exports = class SettingClass {
  async manageLanguage(input) {
    try {
      let languageObj = null;
      let languageDemo = await Language.findBy({ languageName: "English" });
      if (input.languageName) {
        languageObj = await Language.findBy({
          languageName: input.languageName,
        });
      }
      if (input._id || languageObj != null) {

        Object.keys(languageDemo.languageJson).forEach(function (key) {
          if (!input.languageJson.hasOwnProperty(key)) {
            delete input["languageJson"];
          }
         });
        languageObj = await Language.query()
          .where({ _id: input._id ? input._id : languageObj._id })
          .update(input);
        languageObj = languageObj.result.nModified == 1 ? true : false;
      } 
      else {
         Object.keys(languageDemo.languageJson).forEach(function (key) {
          if (!input.languageJson.hasOwnProperty(key)) {
            input["languageJson"] = languageDemo.languageJson;
          }
         });
        languageObj = await Language.create(input);
        languageObj = languageObj != null ? true : false;
      }
      return languageObj;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async fetchAllLanguage() {
    try {
      let languageObj = await Language.all();
      return languageObj.toJSON();
    } catch (error) {
      return null;
    }
  }

  async fetchLanguageByName(name) {
    try {
      let languageObj;
      if (name == "new") {
        languageObj = await Language.findBy({ languageName: "English" });
      } else {
        languageObj = await Language.findBy({ languageName:name });
      }
      return languageObj;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
