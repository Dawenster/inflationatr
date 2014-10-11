$(document).ready(function() {
  $.ajax({
    url: "/load",
    dataType: "json"
  })
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  });
});