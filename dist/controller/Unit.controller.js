sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/ui/model/Filter","sap/ui/model/FilterOperator","com/apptech/realestate/controller/AppUI5"],function(t,e,o,d,i,s){"use strict";return t.extend("com.apptech.realestate.controller.Unit",{onRoutePatternMatched:function(t){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());this.prepareTable(false)},onInit:function(){var t=this.getOwnerComponent().getRouter().getRoute("Unit");t.attachPatternMatched(this.onRoutePatternMatched,this);this.bIsAdd="0";this.tableId="tblUnit";this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());this.aCols=[];this.columnData=[];this.oEditRecord={};this.iRecordCount=0;this.oIconTab=this.getView().byId("tab1");this.oIconTab2=this.getView().byId("tab2");this.recordCode="";this.oMdlAllRecord=new e;this.oMdlEditRecord=new e("model/Unit.json");this.getView().setModel(this.oMdlEditRecord,"oMdlEditRecord");this.oMdlProject=new sap.ui.model.json.JSONModel;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETALLDATA&tableName=M_PROJECT",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(t){if(t){this.oMdlProject.setJSON('{"allproject" : '+JSON.stringify(t)+"}");this.getView().setModel(this.oMdlProject,"oMdlProject")}});this.oMdlBuildType=new sap.ui.model.json.JSONModel;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETALLDATA&tableName=R_BUILD_TYPE",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(t){if(t){this.oMdlBuildType.setJSON('{"allbuildtype" : '+JSON.stringify(t)+"}");this.getView().setModel(this.oMdlBuildType,"oMdlBuildType")}});this.oMdlUnitStat=new sap.ui.model.json.JSONModel;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETALLDATA&tableName=R_UNIT_STATUS",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(t){if(t){this.oMdlUnitStat.setJSON('{"allunitstat" : '+JSON.stringify(t)+"}");this.getView().setModel(this.oMdlUnitStat,"oMdlUnitStat")}});this.oMdlPropType=new sap.ui.model.json.JSONModel;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETALLDATA&tableName=R_BUILD_TYPE",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(t){if(t){this.oMdlPropType.setJSON('{"allproptype" : '+JSON.stringify(t)+"}");this.getView().setModel(this.oMdlPropType,"oMdlPropType")}});this.oMdlHouseModel=new sap.ui.model.json.JSONModel;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETALLDATA&tableName=R_HOUSE_MODEL",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(t){if(t){this.oMdlHouseModel.setJSON('{"allhousemodel" : '+JSON.stringify(t)+"}");this.getView().setModel(this.oMdlHouseModel,"oMdlHouseModel")}});this.prepareTable(true)},prepareTable:function(t){$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETUNITDATA&keyCode=&queryType=GetAllUnit",type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(e){if(e){this.aCols=Object.keys(e[0]);var o;this.iRecordCount=e.length;this.oIconTab.setCount(this.iRecordCount);if(t){for(o=0;o<this.aCols.length;o++){this.columnData.push({columnName:this.aCols[o]})}}this.oMdlAllRecord.setData({rows:e,columns:this.columnData});if(t){this.oTable=this.getView().byId(this.tableId);this.oTable.setModel(this.oMdlAllRecord);this.oTable.bindColumns("/columns",function(t,e){var o=e.getObject().columnName;return new sap.ui.table.Column({label:o,template:new sap.m.Text({text:"{"+o+"}"})})});this.oTable.bindRows("/rows");this.oTable.setSelectionMode("Single");this.oTable.setSelectionBehavior("Row");this.renameColumns()}}})},renameColumns:function(){this.oTable.getColumns()[0].setVisible(false);this.oTable.getColumns()[1].setLabel("Unit Code");this.oTable.getColumns()[1].setFilterProperty("UnitCode");this.oTable.getColumns()[2].setLabel("Unit Name");this.oTable.getColumns()[2].setFilterProperty("UnitDesc");this.oTable.getColumns()[3].setLabel("Unit Status");this.oTable.getColumns()[4].setLabel("Project");this.oTable.getColumns()[5].setLabel("Floor Area")},onEdit:function(t){var e=this.oTable.getSelectedIndex();var d="GetUnitSpecific";var i="";if(e!==-1){var s=this.oTable.getBinding().getModel().getData().rows[this.oTable.getBinding().aIndices[e]];i=s.Code;$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GETUNITDATA&keyCode="+i+"&queryType="+d,type:"GET",xhrFields:{withCredentials:true},error:function(t,e,d){o.show(d)},success:function(t){},context:this}).done(function(t){if(t.length<=0){return}var e=JSON.stringify(t).replace("[","").replace("]","");this.oMdlEditRecord.setJSON('{"EditRecord" : '+e+"}");this.getView().setModel(this.oMdlEditRecord,"oMdlEditRecord");this.getView().byId("idIconTabBarInlineMode").getItems()[1].setText("Record Code : "+this.oMdlEditRecord.getData().EditRecord.UnitCode+" [EDIT]")})}this.recordCode=i;var a=this.getView().byId("idIconTabBarInlineMode");a.setSelectedKey("tab2");this.bIsAdd=false},onAdd:function(t){this.onClearAdd()},onClearAdd:function(){this.oMdlEditRecord.getData().EditRecord.Code="";this.oMdlEditRecord.getData().EditRecord.UnitCode="";this.oMdlEditRecord.getData().EditRecord.UnitDesc="";this.oMdlEditRecord.getData().EditRecord.LotNo="";this.oMdlEditRecord.getData().EditRecord.PhaseNo="";this.oMdlEditRecord.getData().EditRecord.BlockNo="";this.oMdlEditRecord.getData().EditRecord.FloorArea="";this.oMdlEditRecord.getData().EditRecord.LotArea="";this.oMdlEditRecord.getData().EditRecord.UnitType="1";this.oMdlEditRecord.getData().EditRecord.HouseModel="1";this.oMdlEditRecord.getData().EditRecord.StandardCost=0;this.oMdlEditRecord.getData().EditRecord.AccumulatedCost=0;this.oMdlEditRecord.getData().EditRecord.PercentComplete=0;this.oMdlEditRecord.getData().EditRecord.PercentUpdateDate="";this.oMdlEditRecord.getData().EditRecord.PrprtyTypeCode="";this.oMdlEditRecord.getData().EditRecord.ProjectCode="1";this.oMdlEditRecord.getData().EditRecord.UnitStatus="1";this.oMdlEditRecord.getData().EditRecord.TurnoverStat="";this.oMdlEditRecord.getData().EditRecord.Notes="";this.oMdlEditRecord.refresh();this.getView().byId("idIconTabBarInlineMode").getItems()[1].setText("RECORD [ADD]");var t=this.getView().byId("idIconTabBarInlineMode");t.setSelectedKey("tab2");this.bIsAdd="A"},onSelectGender:function(t){var e=t.getSource().getProperty("text");this.oMdlEditRecord.getData().EditRecord.Gender=e.toUpperCase()},onSave:function(t){if(this.bIsAdd==="0"){return}this.oRecord={};this.oRecord.M_UNIT=[];this.dataObject={};this.resultAjaxCall=-1;if(this.bIsAdd==="A"){var e=s.generateUDTCode();var d="";$.ajax({url:"/rexsjs/public/rexsjs/ExecQuery.xsjs?dbName=APP_RE&procName=SPAPP_RE_GENERATEUNIT&"+"lotNumber="+this.oMdlEditRecord.getData().EditRecord.LotNo+"&phaseNumber="+this.oMdlEditRecord.getData().EditRecord.PhaseNo+"&blockNumber="+this.oMdlEditRecord.getData().EditRecord.BlockNo+"&projNumber="+this.oMdlEditRecord.getData().EditRecord.ProjectCode,type:"GET",async:false,xhrFields:{withCredentials:true},error:function(t,e,o){jQuery.sap.log.error("This should never have happened!")},success:function(t){d=t[0].Code},context:this}).done(function(t){if(t){d=t[0].Code;this.dataObject.O="I";this.dataObject.Code=e;this.dataObject.UnitCode=d;this.dataObject.UnitDesc=this.oMdlEditRecord.getData().EditRecord.UnitDesc;this.dataObject.LotNo=this.oMdlEditRecord.getData().EditRecord.LotNo;this.dataObject.PhaseNo=this.oMdlEditRecord.getData().EditRecord.PhaseNo;this.dataObject.BlockNo=this.oMdlEditRecord.getData().EditRecord.BlockNo;this.dataObject.FloorArea=this.oMdlEditRecord.getData().EditRecord.FloorArea;this.dataObject.LotArea=this.oMdlEditRecord.getData().EditRecord.LotArea;this.dataObject.UnitType=this.oMdlEditRecord.getData().EditRecord.UnitType;this.dataObject.HouseModel=this.oMdlEditRecord.getData().EditRecord.HouseModel;this.dataObject.StandardCost=this.oMdlEditRecord.getData().EditRecord.StandardCost;this.dataObject.AccumulatedCost=this.oMdlEditRecord.getData().EditRecord.AccumulatedCost;this.dataObject.PercentComplete=this.oMdlEditRecord.getData().EditRecord.PercentComplete;this.dataObject.PercentUpdateDate=this.oMdlEditRecord.getData().EditRecord.PercentUpdateDate;this.dataObject.ProjectCode=this.oMdlEditRecord.getData().EditRecord.ProjectCode;this.dataObject.UnitStatus=this.oMdlEditRecord.getData().EditRecord.UnitStatus;this.dataObject.TurnoverStat=this.oMdlEditRecord.getData().EditRecord.TurnoverStat;this.dataObject.Notes=this.oMdlEditRecord.getData().EditRecord.Notes;this.oRecord.M_UNIT.push(this.dataObject);this.resultAjaxCall=s.postData(this.oRecord);if(this.resultAjaxCall===0){o.show("Saved Successfully "+this.oMdlEditRecord.getData().EditRecord.UnitDesc);this.onClearAdd()}else{o.show("Error")}}})}else{this.oRecord={};this.oRecord.M_UNIT=[];this.dataObject={};this.dataObject.O="U";this.dataObject.Code=this.oMdlEditRecord.getData().EditRecord.Code;this.dataObject.UnitCode=this.oMdlEditRecord.getData().EditRecord.UnitCode;this.dataObject.UnitDesc=this.oMdlEditRecord.getData().EditRecord.UnitDesc;this.dataObject.LotNo=this.oMdlEditRecord.getData().EditRecord.LotNo;this.dataObject.PhaseNo=this.oMdlEditRecord.getData().EditRecord.PhaseNo;this.dataObject.BlockNo=this.oMdlEditRecord.getData().EditRecord.BlockNo;this.dataObject.FloorArea=this.oMdlEditRecord.getData().EditRecord.FloorArea;this.dataObject.LotArea=this.oMdlEditRecord.getData().EditRecord.LotArea;this.dataObject.UnitType=this.oMdlEditRecord.getData().EditRecord.UnitType;this.dataObject.HouseModel=this.oMdlEditRecord.getData().EditRecord.HouseModel;this.dataObject.StandardCost=this.oMdlEditRecord.getData().EditRecord.StandardCost;this.dataObject.AccumulatedCost=this.oMdlEditRecord.getData().EditRecord.AccumulatedCost;this.dataObject.PercentComplete=this.oMdlEditRecord.getData().EditRecord.PercentComplete;this.dataObject.PercentUpdateDate=this.oMdlEditRecord.getData().EditRecord.PercentUpdateDate;this.dataObject.ProjectCode=this.oMdlEditRecord.getData().EditRecord.ProjectCode;this.dataObject.UnitStatus=this.oMdlEditRecord.getData().EditRecord.UnitStatus;this.dataObject.TurnoverStat=this.oMdlEditRecord.getData().EditRecord.TurnoverStat;this.dataObject.Notes=this.oMdlEditRecord.getData().EditRecord.Notes;this.oRecord.M_UNIT.push(this.dataObject);this.resultAjaxCall=s.postData(this.oRecord);if(this.resultAjaxCall===0){o.show("Successfully Updated "+this.oMdlEditRecord.getData().EditRecord.UnitCode)}else{o.show("Error")}}this.prepareTable(false)},filterGlobally:function(t){var e=t.getParameter("query");this._oGlobalFilter=null;if(e){this._oGlobalFilter=new d([new d("UnitDesc",i.Contains,e),new d("UnitCode",i.Contains,e)],false)}this._filter()},_filter:function(){var t=null;if(this._oGlobalFilter){t=this._oGlobalFilter}this.byId(this.tableId).getBinding().filter(t,"Application")},clearAllFilters:function(t){var e=this.getView().byId(this.tableId);this._oGlobalFilter=null;this._filter();var o=e.getColumns();for(var d=0;d<o.length;d++){e.filter(o[d],null)}}})});