AgentAssist = {};
AgentAssist.Common = {
  selectDropDown: function(){
    $(".select").select2().change(function(){
      $(this).valid();
    });
    $("#policy_plan_attributes_company_category_id, #policy_plan_id, policy_CategoryCompany_company_id").select2({});
  },
  Flash_message: function(){
    $(".flash_msg").delay(5000).slideUp(3000).fadeOut();
  },
  applyLoader: function () {
    $.blockUI({css:{
      border: 'none',
      padding: '15px',
      backgroundColor: '#000',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: .5,
      color: '#fff'
    }});
  },
  ajaxLoader: function () {
    $(document).ajaxStart(function () {
      AgentAssist.Common.applyLoader();
    }).ajaxStop(function () {
      $.unblockUI();
    });
  },
  notification: function(){
    $('#notification_checked').on('change', function(){
      var notification_value = $(this).is(':checked');
      $.ajax({
        type:'GET',
        url: '/premium_reminder',
        data: {notification: notification_value}
      });
    });
  },
  documentOnReady: function (){
    AgentAssist.Common.selectDropDown();
    AgentAssist.Common.Flash_message();
    AgentAssist.Common.ajaxLoader();
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});