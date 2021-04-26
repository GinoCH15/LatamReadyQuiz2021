/* eslint-env jquery, browser */
$(document).ready(() => {
  window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
  }, 5000);
});