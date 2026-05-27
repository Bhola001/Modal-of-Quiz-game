const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");

const resultElement = document.getElementById("result");
let correctAnswer = "";
let score = 0;
let questionCount = 0;
let totalQuestions = 5;

async function loadQuestion() {

    if(questionCount >= totalQuestions){

        questionElement.innerHTML = "Quiz Finished 🎉";

        optionsElement.innerHTML = "";

        resultElement.innerHTML = `Final Score: ${score} / ${totalQuestions}`;

        nextBtn.style.display = "none";

        return;
    }

    questionCount++;

    optionsElement.innerHTML = "";

    resultElement.innerHTML = "";

    const url = "Your_API";

    const response = await fetch(url);

    const data = await response.json();

    const questionData = data.results[0];

    questionElement.innerHTML = questionData.question;

    correctAnswer = questionData.correct_answer;

    let options = [...questionData.incorrect_answers];

    options.push(correctAnswer);

    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {

        const button = document.createElement("button");

        button.innerHTML = option;

        button.classList.add("option-btn");

        button.onclick = () => checkAnswer(option);

        optionsElement.appendChild(button);

    });

}

function checkAnswer(selectedOption) {

    if(selectedOption === correctAnswer){

        resultElement.innerHTML = "Correct ✅";

        score++;

    }else{

        resultElement.innerHTML = "Wrong ❌";

    }

    scoreElement.innerHTML = `Score: ${score}`;

}

nextBtn.addEventListener("click", loadQuestion);

loadQuestion();
