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

        resultElement.innerHTML = `Final Score: ${score}/${totalQuestions}`;

        nextBtn.style.display = "none";

        return;
    }

    questionCount++;

    optionsElement.innerHTML = "";

    resultElement.innerHTML = "Loading...";

    try{

        const url = "https://opentdb.com/api.php?amount=1&category=19&type=multiple";

        const response = await fetch(url);

        const data = await response.json();

        if(!data.results || data.results.length === 0){

            questionElement.innerHTML = "Failed to load question";

            return;
        }

        const questionData = data.results[0];

        questionElement.innerHTML = questionData.question;

        correctAnswer = questionData.correct_answer;

        let options = [...questionData.incorrect_answers];

        options.push(correctAnswer);

        options.sort(() => Math.random() - 0.5);

        resultElement.innerHTML = "";

        options.forEach(option => {

            const button = document.createElement("button");

            button.innerHTML = option;

            button.classList.add("option-btn");

            button.onclick = () => checkAnswer(option);

            optionsElement.appendChild(button);

        });

    }catch(error){

        questionElement.innerHTML = "Error loading quiz 😢";

        console.log(error);

    }

}

function checkAnswer(selectedOption){

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => btn.disabled = true);

    if(selectedOption === correctAnswer){

        resultElement.innerHTML = "Correct ✅";

        score++;

    }else{

        resultElement.innerHTML = `Wrong ❌ <br> Correct Answer: ${correctAnswer}`;

    }

    scoreElement.innerHTML = `Score: ${score}`;

}

nextBtn.addEventListener("click", loadQuestion);

loadQuestion();
