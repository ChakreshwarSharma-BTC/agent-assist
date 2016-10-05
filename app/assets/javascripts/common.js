AgentAssist = {};
AgentAssist.Common = {
  selectDropDown: function(){
    $(".select").select2().change(function(){
      $(this).valid();
    });
    $("#policy_plan_attributes_company_category_id, #policy_plan_id, policy_CategoryCompany_company_id").select2({});
  },
  documentOnReady: function (){
    AgentAssist.Common.selectDropDown();
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});