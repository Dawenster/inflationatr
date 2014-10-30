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
                "And by opposing end them. To die, to sleep--\n" +
                "No more--and by a sleep to say we end\n" +
                "The heartache, and the thousand natural shocks\n" +
                "That flesh is heir to. 'Tis a consummation\n" +
                "Devoutly to be wished. To die, to sleep--\n" +
                "To sleep--perchance to dream: ay, there's the rub,\n" +
                "For in that sleep of death what dreams may come\n" +
                "When we have shuffled off this mortal coil,\n" +
                "Must give us pause. There's the respect\n" +
                "That makes calamity of so long life.\n" +
                "For who would bear the whips and scorns of time,\n" +
                "Th' oppressor's wrong, the proud man's contumely\n" +
                "The pangs of despised love, the law's delay,\n" +
                "The insolence of office, and the spurns\n" +
                "That patient merit of th' unworthy takes,\n" +
                "When he himself might his quietus make\n" +
                "With a bare bodkin? Who would fardels bear,\n" +
                "To grunt and sweat under a weary life,\n" +
                "But that the dread of something after death,\n" +
                "The undiscovered country, from whose bourn\n" +
                "No traveller returns, puzzles the will,\n" +
                "And makes us rather bear those ills we have\n" +
                "Than fly to others that we know not of?\n" +
                "Thus conscience does make cowards of us all,\n" +
                "And thus the native hue of resolution\n" +
                "Is sicklied o'er with the pale cast of thought,\n" +
                "And enterprise of great pitch and moment\n" +
                "With this regard their currents turn awry\n" +
                "And lose the name of action. -- Soft you now,\n" +
                "The fair Ophelia! -- Nymph, in thy orisons\n" +
                "Be all my sins remembered."

  var feist = "Oh baby, baby\n" +
              "Oh baby, baby\n\n" +

              "Oh baby, baby, how was I supposed to know\n" +
              "That something wasn't right here\n" +
              "Oh baby, baby, I shouldn't have let you go\n" +
              "And now you're out of sight, yeah\n" +
              "Show me how you want it to be\n" +
              "Tell me baby 'cause I need to know now, oh because\n\n" +

              "My loneliness is killing me (and I)\n" +
              "I must confess I still believe (still believe)\n" +
              "When I'm not with you I lose my mind \n" +
              "Give me a sign\n" +
              "Hit me baby one more time\n\n" +
 
              "Oh baby, baby\n" +
              "The reason I breathe is you\n" +
              "Boy you got me blinded\n" +
              "Oh pretty baby\n" +
              "There's nothing that I wouldn't do\n" +
              "It's not the way I planned it\n" +
              "Show me how you want it to be\n" +
              "Tell me baby 'cause I need to know now, oh because\n\n" +

              "Oh baby, baby\n" +
              "Oh baby, baby\n" +
              "Yeah,\n\n" +

              "Oh baby, baby how was I supposed to know\n" +
              "Oh pretty baby, I shouldn't have let you go\n" +
              "I must confess, that my loneliness is killing me now\n" +
              "Don't you know I still believe\n" +
              "That you will be here\n" +
              "And give me a sign\n" +
              "Hit me baby one more time\n\n" +
 
              "I must confess, that my loneliness is killing me now\n" +
              "Don't you know I still believe\n" +
              "That you will be here\n" +
              "And give me a sign\n" +
              "Hit me baby one more time"

  var texts = {
    "gettysburg": gettysburg,
    "hamlet": hamlet,
    "feist": feist
  }


  $("body").on("click", ".btn-text", function() {
    var text = $(this).attr("data-text");

    $("#input").val(texts[text]).trigger('autosize.resize');
    inflationate();
  })
});