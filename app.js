/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which of these insects are harmful in the garden?',
      answers: [
        'Wasp',
        'Assassin bug',
        'Green June Beetle',
        'Green Lacewing'
      ],
      correctAnswer: 'Green June Beetle'
    },
    {
      question: 'Which of these is a shade plant?',
      answers: [
        'Fern',
        'Rose',
        'Thyme',
        'Lilac'
      ],
      correctAnswer: 'Fern'
    },
    {
      question: 'Which is NOT a benefit of “no-till” gardening?',
      answers: [
        'Protects the microbiology',
        'Protects against fungi',
        'Improves soil structure',
        'Uses fewer fertilizers'
      ],
      correctAnswer: 'Protects against fungi'
    },
    {
      question: 'All of the following plants are from the same family EXCEPT…',
      answers: [
        'Eggplant',
        'Tomatoes',
        'Okra',
        'Potatoes'
      ],
      correctAnswer: 'Okra'
    },
    {
      question: 'What do you call a fruit that has been left to rot on the tree?',
      answers: [
        'Corpse',
        'Mummy',
        'Deadhead',
        'Bumper crop'
      ],
      correctAnswer: 'Mummy'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  currentQuestion: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateStartScreenHtml() {
  //genereate start screen with button
  return `
    <div class="start-screen">
      <p>This quiz tests your gardening knowledge.</p>
      <button type="start" id="start-btn" alt="Start Quiz">Start Quiz</button>
    </div>`;
}

function generateQuestionNumberAndScoreHtml() {
  //genereate html question # and score
  return `
    <div class="container-current-info">
      <div id="question-number">
        <p>Question Number:</p> 
        <p>${store.questionNumber + 1} out of ${store.questions.length}</p>
      </div>
      <div id="score">
        <p>Score:</p>
        <p>${store.score} out of ${store.questions.length}</p>
      </div>
    </div>
  `;
}


function currentQuestion(){
  let index = store.questionNumber;
  let questionObject = store.questions[index];
  return {
    index: index +1,
    question: questionObject
  };
}


function generateQuestionHtml() {

  //create var for current question 
  let currentQuestion = store.questions[store.currentQuestion];
  //generate HTML question
  return `
    <div class="container">
    <div id="question-container">
      <h4>${currentQuestion.question}</h4> 
    </div>
    <form class="answer-buttons">
      <button type="button" class="btn" id="btn-1">${currentQuestion.answers[0]}</button>
      <button type="button" class="btn" id="btn-2">${currentQuestion.answers[1]}</button>
      <button type="button" class="btn" id="btn-3">${currentQuestion.answers[2]}</button>
      <button type="button" class="btn" id="btn-4">${currentQuestion.answers[3]}</button>
    </form>
    <button type="button"  id="next-btn">Next>></button>
  </div>
  `;
}

function disableOtherButtons(){
 $('.btn').prop('disabled', true);
}

function generateFeedbackHtml(answerStatus){
  let correctAnswer = store.questions[store.currentQuestion].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct!</div>
    `;
  }else if (answerStatus === 'incorrect') {
      html = `
        <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
      `;
  }
    return html;
}


function generateQuizResultsString(){
  //genereate html end statement ans restart btn
  return `
    <div class='results-screen'>
      <p>The quiz is over.</p>
      <p>You scored ${store.score} out of 5</p>            
        <button type="restart" id="restart-btn">Restart Quiz</button>      
    </div>`;
}

function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.currentQuestion = 0;
  store.score = 0;

}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = '';
  //genereate start screen is boolean in false
  if (store.quizStarted === false) {
    $('main').html(generateStartScreenHtml());
    return;
  }
  // handles start and next question
  else if (store.currentQuestion >= 0 && store.currentQuestion < store.questions.length) {
    //updated score and question back fill with raw html
    html = generateQuestionNumberAndScoreHtml();
    html += generateQuestionHtml(currentQuestion());
    //grab html element "main" then adding html generated from above fuctions
    $('main').html(html);
    
  }
  else {
    $('main').html(generateQuizResultsString());
  }
}



/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartButton(){
  $('main').on('click', '#start-btn', (event) =>{
    event.preventDefault();
    //update started boolean
    store.quizStarted = true;
    //render quiz
    render();
  });
}

function handleAnswerChoiceBtn(){
  $('main').on('click', '.btn', function(event) {
    event.preventDefault();
    //call function to disable other answer btn
    disableOtherButtons();
    //log answer in var
    let selectedAnswer = $(this).text();
    //create var for correct answer listed in store
    let currentCorrectAnswer = store.questions[store.currentQuestion].correctAnswer;
    //compare answer to correct answer
      if( selectedAnswer === currentCorrectAnswer){
        //if correct count up score
        store.score++;
        //toggle btn color
        console.log(this);
        $(this).addClass('btn-correct');
        //toggle next btn so visable
        $('#next-btn').show();
        //create html statement
        $('.container').append(generateFeedbackHtml('correct'));
      }else{
        //toggle btn color
        $(this).addClass('btn-wrong');
        //toggle next btn so visable
        $('#next-btn').show();
        //create html statement
        $('.container').append(generateFeedbackHtml('incorrect'));
        }
        store.currentQuestion++;
        store.questionNumber++;
  });
}

function handleNextQuestionSubmit(){
  $('main').on('click', '#next-btn', (event) => {
    event.preventDefault();
    //render quize to genereate a new question
    render();
  });
}

function handleRestartButtonClick(){
  $('main').on('click', '#restart-btn', (event) =>{
    event.preventDefault();
    restartQuiz();
    render();
  });
}


function handleQuizApp() {
  render();
  handleStartButton();
  handleAnswerChoiceBtn();
  handleNextQuestionSubmit();
  handleRestartButtonClick();
}

$(handleQuizApp);