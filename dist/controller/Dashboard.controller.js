sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast","com/apptech/realestate/controller/AppUI5"],function(t,e,o,n){"use strict";return t.extend("com.apptech.realestate.controller.Dashboard",{onRoutePatternMatched:function(t){document.title="Real Estate"},onInit:function(){var t=this.getOwnerComponent().getRouter().getRoute("Dashboard");t.attachPatternMatched(this.onRoutePatternMatched,this);this.oMdlDataCount=new sap.ui.model.json.JSONModel;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_COUNTDATA&queryType=DataCount",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,n){o.show(n)},success:function(t){},context:this}).done(function(t){if(t){this.oMdlDataCount.setJSON('{"alldatacount" : '+JSON.stringify(t).replace("[","").replace("]","")+"}");this.getView().setModel(this.oMdlDataCount,"oMdlDataCount")}})},tileCustomer:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("BusinessPartner")},tileProject:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("Project")},tileUnit:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("Unit")},tileREReservations:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("Reservation")},tileREQuotations:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("Quotation")},tileTaxMatrix:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("TaxMatrix")},tileCreateUser:function(t){this.router=this.getOwnerComponent().getRouter();this.router.navTo("BusinessUser")}})});