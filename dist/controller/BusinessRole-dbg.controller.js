sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/apptech/realestate/controller/AppUI5"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator, AppUI5) {
	"use strict";
	return Controller.extend("com.apptech.realestate.controller.BusinessRole", {
		onRoutePatternMatched: function (event) {
			this.prepareTable(false);
		},
		onInit: function () {
			var route = this.getOwnerComponent().getRouter().getRoute("BusinessRole");
			route.attachPatternMatched(this.onRoutePatternMatched, this);
			this.bIsAdd = "0";
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			//CREATING COLUMNS
			this.aCols = [];
			this.columnData = [];
			this.oEditRecord = {};
			this.iRecordCount = 0;
			
			this.oIconTab = this.getView().byId("tab1");
			this.oIconTab2 = this.getView().byId("tab2");
			this.recordCode = "";
			// GETTING DATA
			// CREATING DYNAMIC TABLE BINDING
			this.oMdlAllRecord = new JSONModel();
			//CREATING TEMPLATE FOR EDITING AND ADDING
			this.oMdlEditRecord = new JSONModel("model/BusinessRole.json");
			this.getView().setModel(this.oMdlEditRecord, "oMdlEditRecord");
			//REFERENCES JSON MODELS
			this.oMdlRoleStatus = new JSONModel("model/BusinessRoleStatus.json");
			this.getView().setModel(this.oMdlRoleStatus, "oMdlRoleStatus");
			
			this.prepareTable(true);
		},
		prepareTable: function (bIsInit) {
			$.ajax({
				url: "/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETBUSINESSROLE&keyCode=&queryType=GetAllBusinessRole",
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
					this.aCols = Object.keys(results[0]);
					var i;
					this.iRecordCount = results.length;
					this.oIconTab.setCount(this.iRecordCount);
					if (bIsInit) {
						for (i = 0; i < this.aCols.length; i++) {
							this.columnData.push({
								"columnName": this.aCols[i]
							});
						}
					}
					this.oMdlAllRecord.setData({
						rows: results,
						columns: this.columnData
					});
					if (bIsInit) {
						this.oTable = this.getView().byId("tblBusinessRole");
						this.oTable.setModel(this.oMdlAllRecord);
						this.oTable.bindColumns("/columns", function (sId, oContext) {
							var columnName = oContext.getObject().columnName;
							return new sap.ui.table.Column({
								label: columnName,
								template: new sap.m.Text({
									text: "{" + columnName + "}"
								})
							});
						});
						this.oTable.bindRows("/rows");
						this.oTable.setSelectionMode("Single");
						this.oTable.setSelectionBehavior("Row");
						this.renameColumns();
					}
				}
			});
		},
		renameColumns: function () {
			this.oTable.getColumns()[0].setVisible(false);
			this.oTable.getColumns()[1].setLabel("Description");
			this.oTable.getColumns()[1].setFilterProperty("Desc");
			this.oTable.getColumns()[2].setLabel("Other Description");
			this.oTable.getColumns()[2].setFilterProperty("OtherDesc");
			this.oTable.getColumns()[3].setLabel("Is Active");
			this.oTable.getColumns()[4].setLabel("Remarks");
			this.oTable.getColumns()[5].setLabel("Date Created");
		},
		onEdit: function (oEvent) {
			var iIndex = this.oTable.getSelectedIndex();
			var sQueryType = "GetSpecificBusinessRole";
			var sCode = "";
			if (iIndex !== -1) {
				var oRowSelected = this.oTable.getBinding().getModel().getData().rows[this.oTable.getBinding().aIndices[iIndex]];
				sCode = oRowSelected.Code;
				//AJAX selected Key
				$.ajax({
					url: "/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETBUSINESSROLE&keyCode=" +
						sCode + "&queryType=" + sQueryType,
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
					if (results.length <= 0) {
						return;
					}
					var oResult = JSON.stringify(results).replace("[", "").replace("]", "");
					this.oMdlEditRecord.setJSON("{\"EditRecord\" : " + oResult + "}");
					this.getView().setModel(this.oMdlEditRecord, "oMdlEditRecord");
					this.getView().byId("idIconTabBarInlineMode").getItems()[1].setText("Record Code : " + this.oMdlEditRecord.getData().EditRecord
						.Desc + " [EDIT]");
				});
			}
			this.recordCode = sCode;
			var tab = this.getView().byId("idIconTabBarInlineMode");
			tab.setSelectedKey("tab2");
			this.bIsAdd = "E";
		},
		onAdd: function (oEvent) {
			this.oMdlEditRecord.getData().EditRecord.Code = "";
			this.oMdlEditRecord.getData().EditRecord.Desc = "";
			this.oMdlEditRecord.getData().EditRecord.OtherDesc = "";
			this.oMdlEditRecord.getData().EditRecord.IsActive = "Y";
			this.oMdlEditRecord.getData().EditRecord.Remarks = "";
			this.oMdlEditRecord.refresh();
			this.getView().byId("idIconTabBarInlineMode").getItems()[1].setText("RECORD [ADD]");
			var tab = this.getView().byId("idIconTabBarInlineMode");
			tab.setSelectedKey("tab2");
			this.bIsAdd = "A";
		},
		onSave: function (oEvent) {
			if (this.bIsAdd === "0") {
				return;
			}
			if (this.bIsAdd === "A") {
				var tableCode = AppUI5.generateUDTCode();
				//Generate Code
				var recordCode = "";
				$.ajax({
					url: "/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=SPAPP_RE_GETBUSINESSROLE&keyCode=&queryType=GetNewCode",
					type: "GET",
					async: false,
					xhrFields: {
						withCredentials: true
					},
					error: function (xhr, status, error) {
						jQuery.sap.log.error("This should never have happened!");
					},
					success: function (json) {
						recordCode = json[0].Code;
					},
					context: this
				}).done(function (results) {
					if (results) {
						recordCode = results[0].Code;
					}
				});
				//prepareJSON object
				var oRecord = {};
				oRecord.R_ROLE = [];
				var dataObject = {};
				dataObject.O = "I";
				dataObject.Code = tableCode;
				dataObject.Desc =  this.oMdlEditRecord.getData().EditRecord.Desc;
				dataObject.OtherDesc = this.oMdlEditRecord.getData().EditRecord.OtherDesc;
				dataObject.IsActive = this.oMdlEditRecord.getData().EditRecord.IsActive;
				dataObject.Remarks = this.oMdlEditRecord.getData().EditRecord.Remarks;
				oRecord.R_ROLE.push(dataObject);
				//AJAX Call for Posting
				var resultAjaxCall = AppUI5.postData(oRecord);
				if (resultAjaxCall === 0) {
					MessageToast.show("Saved Successfully " + recordCode);
				} else {
					MessageToast.show("Error");
				}
			} else {
				//prepareJSON object
				oRecord = {};
				oRecord.R_ROLE = [];
				dataObject = {};
				dataObject.O = "U";
				dataObject.Code = this.oMdlEditRecord.getData().EditRecord.Code;
				dataObject.Desc =  this.oMdlEditRecord.getData().EditRecord.Desc;
				dataObject.OtherDesc = this.oMdlEditRecord.getData().EditRecord.OtherDesc;
				dataObject.IsActive = this.oMdlEditRecord.getData().EditRecord.IsActive;
				dataObject.Remarks = this.oMdlEditRecord.getData().EditRecord.Remarks;
				oRecord.R_ROLE.push(dataObject);
				//AJAX Call for Posting
				resultAjaxCall = AppUI5.postData(oRecord);
				if (resultAjaxCall === 0) {
					MessageToast.show("Successfully Updated " + this.oMdlEditRecord.getData().EditRecord.Desc);
				} else {
					MessageToast.show("Error");
				}
			}
			this.prepareTable(false);
		},
		filterGlobally: function (oEvent) {
			var sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;
			if (sQuery) {
				this._oGlobalFilter = new Filter([
					new Filter("Desc", FilterOperator.Contains, sQuery),
					new Filter("OtherDesc", FilterOperator.Contains, sQuery)
				], false);
			}
			this._filter();
		},
		_filter: function () {
			var oFilter = null;
			if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			}
			this.byId("tblBusinessRole").getBinding().filter(oFilter, "Application");
		},
		clearAllFilters: function (oEvent) {
			var oTable = this.getView().byId("tblBusinessRole");
			this._oGlobalFilter = null;
			this._filter();
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}
		},
		/**
		 *@memberOf com.apptech.realestate.controller.Project
		 */
		onChangeRoleStatus: function (oEvent) {
			var sSelectedKeyRoleStatus = oEvent.getSource().getProperty("selectedKey");
			this.oMdlEditRecord.getData().EditRecord.IsActive = sSelectedKeyRoleStatus;
		}
	});
});