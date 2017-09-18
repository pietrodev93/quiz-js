(function(){
  var questions = [{
    question: "Which Italian car manufacturer sponsors a Formula One team?",
    choices: ["Ferrari", "Lamborghini", "Fiat", "Maserati"],
    correctAnswer: 0
  },
  {
    question: "What was the name of the town destroyed by mount Vesuvius in 79AD?",
    choices: ["Agropoli", "Sorrento", "Paestum", "Pompei"],
    correctAnswer: 3
  },
  {
    question: "Which is the largest of the Italian lakes?",
    choices: ["Maggiore", "Garda", "Como", "Lugano"],
    correctAnswer: 2
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel?",
    choices: ["Titian", "Michelangelo", "Donatello", "Raphael"],
    correctAnswer: 1
  },
  {
    question: "Which roman emperor was assassinated on the 'Ides of March'?",
    choices: ["Augustus", "Julius", "Nero", "Octavius"],
    correctAnswer: 1
  }];

  var questionCounter = 0;
  var selections = [];
  var quiz = $('#quiz');

  displayNext();

  $('#next').on('click', function(e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    if(isNaN(selections[questionCounter])) {
      alert("Fai la tua scelta!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  $('#prev').on('click', function(e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  $('#start').on('click', function(e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for(var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();

    if(questionCounter < questions.length) {
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if(!(isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }

      if(questionCounter === 1) {
        $('#prev').show();
      } else if (questionCounter === 0) {
        $('#prev').hide();
        $('#next').show();
      }
    } else {
      var scoreElem = displayScore();
      quiz.append(scoreElem).fadeIn();
      $('#next').hide();
      $('#prev').hide();
      $('#start').show();
    }
  });
}



function displayScore() {
  var score = $('<p>',{id: 'question'});

  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i] === questions[i].correctAnswer) {
      numCorrect++;
    }
  }

  score.append('You got ' + numCorrect + ' questions out of ' +
               questions.length + ' right!!!');
  return score;
}













})();
