AgentAssist = {};  
AgentAssist.Common = {
showDatePicker: function(){
  $('#dob').datetimepicker({
        format: "DD/MM/YYYY"
      });
},
partialHideShow: function(){
  $('#life_insurance,#vehicle').hide();
  $('#policy_plan_attributes_company_categories_id').on('change', function(){
    var selected = $('#policy_plan_attributes_company_categories_id :selected').text();
    var list = $.map($('#policy_plan_attributes_company_categories_id option'), function(ele) {
      return ele.value; 
    });
    remain = jQuery.grep(list, function(value) {
      return value != selected;
    });
   if ($.inArray(selected, list) > -1)
    {
      selected_option = selected.replace(/ /g, "_").toLowerCase(); 
      $('#'+selected_option).show();
      var i;
      for (i = 0; i < remain.length; i++) {
        other_option=remain[i].replace(/ /g, "_").toLowerCase();
        $('#'+other_option).hide();
      }
    }
  });
},
wizardSlideSteps: function(){
  $('#wizard').smartWizard();
    $('#wizard_verticle').smartWizard({
    transitionEffect: 'slide'
  });
},
selectDropDown: function(){
  $(".select").select2().change(function(){
    $(this).valid();
  });
  $("#policy_plan_attributes_company_categories_id, #policy_plan_id").select2({});
},
buttonOfForm: function(){
  $('.buttonNext').addClass('btn btn-success');
  $('.buttonPrevious').addClass('btn btn-primary');
  $('.buttonFinish').addClass('btn btn-default');
  $('#policy_plan_attributes_company_categories_id').on('change', function(){
    var selected = $('#policy_plan_attributes_company_categories_id :selected').text();
    var list = $.map($('#policy_plan_attributes_company_categories_id option'), function(ele) {
      return ele.value; 
    });
    remain = jQuery.grep(list, function(value) {
      return value != selected;
    });
   if ($.inArray(selected, list) > -1)
    {
      selected_option = selected.replace(/ /g, "_").toLowerCase(); 
      $('#'+res).show();
      var i;
      for (i = 0; i < remain.length; i++) {
        other_option=remain[i].replace(/ /g, "_").toLowerCase();
        $('#'+res1).remove();
      }
    }
  });
  $('.buttonFinish').on('click', function(){
    $('form').submit();
  })
},
documentOnReady: function (){
  AgentAssist.Common.showDatePicker();
  AgentAssist.Common.partialHideShow();
  AgentAssist.Common.wizardSlideSteps();
  AgentAssist.Common.selectDropDown();
  AgentAssist.Common.buttonOfForm();
}
};
$(document).ready(function(){
   AgentAssist.Common.documentOnReady();
});