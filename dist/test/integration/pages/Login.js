sap.ui.define(["sap/ui/test/Opa5"],function(e){"use strict";var i="Login";e.createPageObjects({onTheAppPage:{actions:{},assertions:{iShouldSeeTheApp:function(){return this.waitFor({id:"app",viewName:i,success:function(){e.assert.ok(true,"The Login view is displayed")},errorMessage:"Did not find the Login view"})}}}})});