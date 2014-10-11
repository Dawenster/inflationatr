if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

$(document).ready(function() {
  var data = {}

  $.ajax({
    url: "/load",
    dataType: "json"
  })
  .done(function(result) {
    data = result.data;
  })
  .fail(function() {
    alert( "error" );
  });

  $("#inflationate").click(function() {
    var value = $("#input").val().trim();
    var valueArr = value.split(" ");
    var returnArr = []
    
    for (var i = 0; i < valueArr.length; i++) {
      var wordWithPunc = valueArr[i].toUpperCase();

      var wordWithPuncArr = wordWithPunc.split(/\s*\b\s*/);

      var word = wordWithPuncArr.shift();

      var translated = data[word];

      var finalTranslated = ""

      if (translated) {
        finalTranslated = "<span class='translated'>" + translated.toUpperCase() + "</span>"
      } else {
        finalTranslated = word
      }

      if (wordWithPuncArr.length > 0) {
        finalTranslated += wordWithPuncArr.join("");
      }

      returnArr.push(finalTranslated);

    };
    $("#output").html(returnArr.join(" "));
  })

});