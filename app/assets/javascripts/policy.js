AgentAssist.Policy = {
  policyPartialHideShow: function(){
    $('#life_insurance,#vehicle').hide();
    $('#policy_plan_attributes_company_categories_id').on('change', function(){
      var selected_option = $('#policy_plan_attributes_company_categories_id :selected').text();
      var list = $.map($('#policy_plan_attributes_company_categories_id option'), function(ele) {
        return ele.value; 
      });
      remain = jQuery.grep(list, function(value) {
        return value != selected_option;
      });
      if ($.inArray(selected_option, list) > -1)
        {
          selected_option = selected_option.replace(/ /g, "_").toLowerCase(); 
          $('#'+selected_option).show();
          var i;
          for (i = 0; i < remain.length; i++) {
            other_option=remain[i].replace(/ /g, "_").toLowerCase();
            $('#'+other_option).hide();
          }
      }
    });
  },
  buttonOfForm: function(){
    $('.buttonNext').addClass('btn btn-success');
    $('.buttonPrevious').addClass('btn btn-primary');
    $('.buttonFinish').addClass('btn btn-default');
    $('.buttonFinish').on('click', function(){
      var selected_option = $('#policy_plan_attributes_company_categories_id :selected').text();
      var list = $.map($('#policy_plan_attributes_company_categories_id option'), function(ele) {
        return ele.value; 
      });
      remain = jQuery.grep(list, function(value) {
        return value != selected_option;
      });
     if ($.inArray(selected_option, list) > -1)
      {
        selected_option = selected_option.replace(/ /g, "_").toLowerCase(); 
        $('#'+selected_option).show();
        var i;
        for (i = 0; i < remain.length; i++) {
          other_option=remain[i].replace(/ /g, "_").toLowerCase();
          $('#'+other_option).remove();
        }
      }
      $('form').submit();
    })
  }
};
$(document).ready(function(){
  AgentAssist.Policy.policyPartialHideShow();
  AgentAssist.Policy.buttonOfForm();
});