$(function () {
    //regular expression of only letters
    let alphaRegex = /^[a-zA-Z]*$/;


$("#noSpaces").blur(function () {
    //first grab the value from the textbox and put in a variable
    let inputVal = $(this).val();
    //initialize an string variable that represents a space
    let strSpace = " ";
    //found this online, initialize a variable to count number of spaces in a string
    //takes the variable of the input and runs the split() method
    //which is an array method to chop it up whenever it finds the search parameter, in the case a space (" ")
    let spaceCount = inputVal.split(" ").length - 1;

    console.log(spaceCount);
    if (spaceCount === 0) {
      $(this).next().text("all good");
    } else if (spaceCount > 0) {
      $(this).next().text("Please do not enter spaces in email address");
    }
  });

  $("#noAlpha").keyup(function (e) {
    e.preventDefault();
    this.value = this.value.replace(/[^0-9\.]/g, "");
    $(this).next().text("Only numbers please!");
  });



  $("#noNumbersDown").keydown(function (e) {
    let inputVal = $(this).val();

    // test input value against regular expression
    if (alphaRegex.test(inputVal)) {
      $(this).removeClass("error").addClass("success");
      $(this).next().text("Looks good!");
    } else {
      $(this).removeClass("success").addClass("error");
      $(this).next().text("Please delete any non-alpha characters!");
    }
  });



  $("input[type=radio][name=experience]").change(function () {
    let experience = $("input[name=experience]:checked").val();
    if (experience === "Yes") {
      $("#divExplain").show();
    } else {
      $("#divExplain").hide();
    }
  });

 

    

  let choices = [
    ["yes", ["Better than Facebook", "Banjo's are super cool", "Other"]],
    ["no", ["Not as good as Facebook", "Banjo's are really bad", "Other"]],
  ];
  
  $("#choice").on("change", function (e) {
    //enables the pet name dropdown
    $("#decision").prop("disabled", false);

    let inputVal = this.value;

    console.log(inputVal);

    $.each(choices, function (key, value) {
      //match pet name to user selected
      if (inputVal === value[0]) {
        console.log(
          "value[0]:" + value[0] + ", key:" + key + "value: " + value
        );
        $.each(value, function (nestKey, nestValue) {
          // console.log(nestKey);

          switch (nestKey) {
            case 0:
              $("label[for=decision]").text(nestValue);
              $("#decision").empty();
              $("#decision").append(
                $("<option>").text(`Why? `)
              );
              break;
            case 1:
              $.each(nestValue, function (nameKey, nameValue) {
                console.log(nameKey, nameValue);

                $("#decision").append(
                  $("<option>").val(nameValue).text(nameValue)
                );
              });
              break;
          }
        });
      }
    });
  });

  $("#loadProfile").on("click", function () {
    console.log("button clicked: "); //TODO: find out who clicked me, w/this?

    $.ajax({
      url: "data.json",
      dataType: "json",
      success: function (data) {
        console.log(data.noSpaces);
        $("#noSpaces").val(data.noSpaces);
        console.log(data.Check1);
        $("#Check1").prop("checked", data.Check1);
        console.log(data.InputPassword1);
        $("#InputPassword1").val(data.InputPassword1);
        console.log(data.noAlpha);
        $("#noAlpha").val(data.noAlpha);
        console.log(data.noNumbersDown);
        $("#noNumbersDown").val(data.noNumbersDown);
        console.log(data.textarea1);
        $("#textarea1").val(data.textarea1);
        console.log(data.textarea2);
        $("#textarea2").val(data.textarea2);
        console.log(data.choice);
        $("#choice").val(data.choice);
        console.log(data.noEntertained);
        $("#noEntertained").prop("unchecked", data.noEntertained);
      },
    });

    //TODO: can we grab data form anohter website.
  });

  $("#displayProfile").on("click", function () {
    console.log("dipsplay button clicked: "); //TODO: find out who clicked me, w/

    $("#dataContainer").append(
      $("#userName").val() + " put in ... data from my input boxes"
    );
  });
});


