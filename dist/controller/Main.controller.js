sap.ui.define(["jquery.sap.global","sap/ui/Device","sap/ui/core/Fragment","sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/Popover","sap/m/Button","sap/m/library"],function(e,t,r,o,a,n,s,i){"use strict";return o.extend("com.apptech.realestate.controller.Main",{onInit:function(){this.oMdlMenu=new a("model/menus.json");this.getView().setModel(this.oMdlMenu);this.router=this.getOwnerComponent().getRouter();this.router.navTo("Dashboard")},onRoutePatternMatched:function(e){var t=e.getParameter("name");this.byId("childViewSegmentedButton").setSelectedKey(t)},onAfterShow:function(e){e.navTo("Dashboard")},onSelect:function(e){this.router=this.getOwnerComponent().getRouter();this.router.navTo(e.getParameter("key"))},onMenuButtonPress:function(){var e=this.byId("toolPage");e.setSideExpanded(!e.getSideExpanded())},onIconPress:function(e){this.router.navTo("Dashboard")},onItemSelect:function(e){var t=e.getSource().getProperty("selectedKey");switch(t){case"businesspartners":this.router.navTo("BusinessPartner");break;case"pricelist":this.router.navTo("Pricelist");break;case"projects":this.router.navTo("Project");break;case"units":this.router.navTo("Unit");break;case"reservation":this.router.navTo("Reservation");break;case"quotation":this.router.navTo("Quotation");break;case"tax":this.router.navTo("TaxMatrix");break;case"paymententry":this.router.navTo("PaymentEntry");break;case"businessroles":this.router.navTo("BusinessRole");break;case"businessusers":this.router.navTo("BusinessUser");break;default:}},tilePricelist:function(e){var t=this.getView().byId("initialPage");var r=sap.ui.view({type:sap.ui.core.mvc.ViewType.XML,viewName:"com.apptech.realestate.view.Pricelist"});t.addContent(r)},onUserNamePress:function(e){var t=i.ButtonType,r=i.PlacementType;var o=new n({showHeader:false,placement:r.Bottom,content:[new s({text:"Feedback",type:t.Transparent}),new s({text:"Help",type:t.Transparent}),new s({text:"Logout",type:t.Transparent})]}).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");o.openBy(e.getSource())}})});