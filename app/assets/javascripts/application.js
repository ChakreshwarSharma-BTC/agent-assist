// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.validate.min
//= require jquery_ujs
//= require common
//= require cocoon
//= require turbolinks
//= require SmartWizard
//= require select2-full
//= require chartkick
//= require moment
//= require bootstrap
//= require bootstrap-datetimepicker
// Fadout the flash messages.
$(document).ready(function(){
  $("#flash-message").delay(5000).slideUp(500).fadeOut();
});

// Show the Ajax loader image during the ajax calls.
$(document).ready(function () {
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
});