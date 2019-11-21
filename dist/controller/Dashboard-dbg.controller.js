sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"com/apptech/realestate/controller/AppUI5"
], function (Controller, JSONModel, MessageToast, AppUI5) {
	"use strict";

	return Controller.extend("com.apptech.realestate.controller.Dashboard", {

		 
		onRoutePatternMatched: function (event) {
			document.title = "Real Estate";
		},
		
		onInit: function () {
			var route = this.getOwnerComponent().getRouter().getRoute("Dashboard");
			route.attachPatternMatched(this.onRoutePatternMatched, this);
			
		this.oMdlDataCount = new sap.ui.model.json.JSONModel();
		$.ajax({
			url: "/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_COUNTDATA&queryType=DataCount",
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			error: function (xhr, status, error) {
				MessageToast.show(error);
			},
			success: function (json) {},
			context: this
		}).done(function (results) {
			if (results) {
				this.oMdlDataCount.setJSON("{\"alldatacount\" : " + JSON.stringify(results).replace("[","").replace("]","") + "}");
				this.getView().setModel(this.oMdlDataCount, "oMdlDataCount");
			}
		});
			
				
		},
		tileCustomer: function (oEvent) {
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("BusinessPartner");
		},
		tileProject: function(oEvent){
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("Project");
		},
		tileUnit: function(oEvent){
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("Unit");
		},
		tileREReservations: function(oEvent){
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("Reservation");
		},
		tileREQuotations: function(oEvent){
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("Quotation");
		},
		tileTaxMatrix: function(oEvent){
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("TaxMatrix");
		},
		tileCreateUser: function(oEvent){
			this.router = this.getOwnerComponent().getRouter();
			this.router.navTo("BusinessUser");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.apptech.realestate.view.Dashboard
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.apptech.realestate.view.Dashboard
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.apptech.realestate.view.Dashboard
		 */
		//	onExit: function() {
		//
		//	}

	});

});