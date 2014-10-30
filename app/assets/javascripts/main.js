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

        if (originalWord) {
          var upcase = originalWord[0] === originalWord[0].toUpperCase();

          var wordWithPunc = valueArr[i];

          var wordWithPuncArr = wordWithPunc.split(/\s*\b\s*/);

          var word = wordWithPuncArr.shift().toUpperCase();

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
        }

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

  var gettysburg = "Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.\n\n" +
                    "Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.\n\n" +
                    "But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.";
  
  var hamlet = "To be, or not to be--that is the question:\n" +
                "Whether 'tis nobler in the mind to suffer\n" +
                "The slings and arrows of outrageous fortune\n" +
                "Or to take arms against a sea of troubles\n" +
                "And by opposing end them."

  var frost = "Two roads diverged in a wood, and I—I took the one less traveled by, and that has made all the difference."

  var texts = {
    "gettysburg": gettysburg,
    "hamlet": hamlet,
    "frost": frost
  }


  $("body").on("click", ".btn-text", function(e) {
    e.preventDefault();
    var text = $(this).attr("data-text");

    $('.animated').val(texts[text]).trigger('autosize.resize');
    inflationate();
  })
});