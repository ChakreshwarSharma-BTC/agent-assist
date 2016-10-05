AgentAssist = {};
AgentAssist.Common = {
  selectDropDown: function(){
    $(".select").select2().change(function(){
      $(this).valid();
    });
    $("#policy_plan_attributes_company_categories_id, #policy_plan_id").select2({});
  },
  Flash_message: function(){
    $(".flash_msg").delay(5000).slideUp(3000).fadeOut();
  },
  Auto_load: function(){
    $(document).ajaxStart(function () {
      $.blockUI({ css: {
          border: 'none',
          padding: '15px',
          backgroundColor: '#000',
          '-webkit-border-radius': '10px',
          '-moz-border-radius': '10px',
          opacity: .5,
          color: '#fff'
      } });
    }).ajaxStop(function () {
        $.unblockUI();
    });
  },
  documentOnReady: function (){
    AgentAssist.Common.selectDropDown();
    AgentAssist.Common.Flash_message();
    AgentAssist.Common.Auto_load();
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});