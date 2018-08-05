// const _= require("lodash")

var app = function(){
  const url = 'https://opentdb.com/api.php?amount=10&type=boolean'
  makeRequest(url, requestComplete)
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const questions = JSON.parse(jsonString);
  // debugger;
  populateCatagories(_.uniqWith(questions.results));
  handleSelect(questions.results);
  displayAnswer(questions)
};

const populateCatagories = function(questions) {
  console.log(questions);
  const select = document.getElementById('catagory-select')
  questions.forEach(function(question, index){
    let option = document.createElement('option')
    option.innerText = question.category
    option.value = index
    select.appendChild(option)
  })
};

const handleSelect = function(questions){
  const select = document.getElementById('catagory-select')
  select.addEventListener('change', function(){
    const selectedCatagory = questions[this.value]
    returnQuestionFromCatagory(selectedCatagory)
  })
}

  const returnQuestionFromCatagory = function (question) {
    const div = document.getElementById('returned-question')
    clearContent(div)
    let selectedQuestion = document.createElement('h2')
    // let decodeanswer = decodeURI(jsonqa[i].correct_answer);
    selectedQuestion.innerText = `${question.question}`
    // const options = document.createElement('ul')
    // options.innerText = ` ${question.incorrect_answers}, `
    // const otherOption = document.createElement('ul')
    // otherOption.innerText = ` ${question.correct_answer} `
    // var enc = encodeURI(uri);
    div.appendChild(selectedQuestion)
    // div.appendChild(options)
    // div.appendChild(otherOption)
    return div
}

  const displayAnswer = function(question){
    const div = document.getElementById('answer')
    clearContent(div)
    const questionsAnswer = document.createElement('h3')
    questionsAnswer.innerText = ` ${question.correct_answer} `
    div.appendChild(questionsAnswer)

  }


  const clearContent = function(node){
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }

  window.addEventListener('load', app);
