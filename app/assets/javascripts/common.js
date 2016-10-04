AgentAssist = {};
AgentAssist.Common = {
  selectDropDown: function(){
    $(".select").select2().change(function(){
      $(this).valid();
    });
    $("#policy_plan_attributes_company_categories_id, #policy_plan_id").select2({});
  },
  documentOnReady: function (){
    AgentAssist.Common.selectDropDown();
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});