if(typeof(String.prototype.trim) === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, '');
  };
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $("#inflationate").click(function() {
    inflationate();
  })

  $('#input').bind("enterKey", function(e){
    inflationate();
  });

  $('#input').keydown(function(e){
    if (e.keyCode == 13) {
      e.preventDefault();
      $(this).trigger("enterKey");
    }
  });

  var inflationate = function() {
    var value = $("#input").val().trim();
    var paragraphs = value.match(/[^\r\n]+/g);
    var paragraphsReturnArr = [];
    var numInflatedWords = 0;

    for (var ip = 0; ip < paragraphs.length; ip++) {
      var valueArr = paragraphs[ip].split(" ");
      var returnArr = []

      
      for (var i = 0; i < valueArr.length; i++) {
        var originalWord = valueArr[i];
        var upcase = originalWord[0] === originalWord[0].toUpperCase();

        var wordWithPunc = valueArr[i].toUpperCase();

        var wordWithPuncArr = wordWithPunc.split(/\s*\b\s*/);

        var word = wordWithPuncArr.shift();

        var translated = data[word];

        var finalTranslated = ""

        if (translated) {
          translated = translated.toLowerCase();
          if (upcase) {
            translated = capitaliseFirstLetter(translated);
          }
          finalTranslated = "<span class='translated'>" + translated + "</span>"
          numInflatedWords += 1;
        } else {
          finalTranslated = word.toLowerCase()
          if (upcase) {
            finalTranslated = capitaliseFirstLetter(finalTranslated);
          }
        }

        if (wordWithPuncArr.length > 0) {
          finalTranslated += wordWithPuncArr.join("");
        }

        returnArr.push(finalTranslated);
      };
      paragraphsReturnArr.push(returnArr.join(" "));
    };
    $("#output").html(paragraphsReturnArr.join("<br/><br/>"));
    addCountToDatabase(numInflatedWords);
    addCountToView(numInflatedWords);
  }

  var addCountToDatabase = function(numInflatedWords) {
    $.ajax({
      url: "/add_to_count",
      method: "post",
      dataType: "json",
      data: {
        num_to_add: numInflatedWords
      }
    })
    .done(function(result) {
      console.log(result.data);
    })
    .fail(function() {
      alert("Gawd, something broke...");
    });
  }

  var addCountToView = function(numToAdd) {
    var oldText = $(".counter").text().replace (/,/g, "");
    var oldNum = parseInt(oldText);
    $(".counter").text(numberWithCommas(oldNum + numToAdd));
  }
});