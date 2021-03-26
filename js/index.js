(function () {
  var questions = [
    {
      question: "COVID-19 adalah singkatan dari ?",
      choices: ["Coronavirus Indonesia - 2019", "Corona Desinfektan - 2019", "Coronavirus Disease - 2019", "Corona International Disease - 2019"],
      correctAnswer: 2,
    },
    {
      question: "Virus corona menyebar melalui ?",
      choices: ["batuk, bersin, dan perantara nyamuk", "batuk, bersin, dan air liur", "batuk, air liur, dan perantara nyamuk", "bersin, air liur, dan perantara nyamuk"],
      correctAnswer: 1,
    },
    {
      question: "Virus corona dapat menempel di benda-benda sekitar yang kita pegang dapat masuk melalui bagian tubuh kita, kecuali ?",
      choices: ["hidung", "mata", "mulut", "telinga"],
      correctAnswer: 3,
    },
    {
      question: "Cara apa yang dapat menolongmu untuk terhindar dari virus corona ?",
      choices: ["dengan sering memegang wajah", "jarang menggunakan pembersih cuci tangan/hand sanitizer", "dengan menggunakan masker", "dengan menemui banyak orang"],
      correctAnswer: 2,
    },
    {
      question: "Jarak yang aman untuk kamu berada di sekitar orang yang batuk atau bersin di sekitarmu adalah ?",
      choices: ["1 meter", "0.5 meter", "30 centimeter", "80 centimeter"],
      correctAnswer: 0,
    },
  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $("#quiz"); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $("#next").on("click", function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(":animated")) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert("Please make a selection!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $("#prev").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $("#start").on("click", function (e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });

  // Animates buttons on hover
  $(".button").on("mouseenter", function () {
    $(this).addClass("active");
  });
  $(".button").on("mouseleave", function () {
    $(this).removeClass("active");
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $("<div>", {
      id: "question",
    });

    var header = $("<h2>Pertanyaan " + (index + 1) + ":</h2>");
    qElement.append(header);

    var question = $("<p>").append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function () {
      $("#question").remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop("checked", true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $("#prev").show();
        } else if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        $("#start").show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $("<p>", { id: "question" });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append("Kamu Menjawab " + numCorrect + " pertanyaan dari " + questions.length + " right!!!");
    return score;
  }
})();
