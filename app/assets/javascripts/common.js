AgentAssist = {};  

AgentAssist.Common = {
showDatePicker: function(){
 	$('#dob').datetimepicker({
        format: "DD/MM/YYYY"
      });
 },
documentOnReady: function (){
	AgentAssist.Common.showDatePicker();
}
};
$(document).ready(function(){
   AgentAssist.Common.documentOnReady();
})