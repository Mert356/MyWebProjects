const apiUrl = "https://opentdb.com/api.php?amount=13&category=18&difficulty=medium&type=multiple";

const startButton = document.getElementById("start");
const questionContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const choicesElements = Array.from(document.getElementsByClassName("answer"));
const loaderBar = document.getElementById('loader-bar');
const startingScreen = document.getElementById("starting");

let currentQuestionIndex = 0;
let questions = [];
let canAnswer = true;
let loaderTimeout;

const ses = new Audio("intro.m4a");


startButton.addEventListener("click", () => {
    ses.play().catch(error => console.error("Ses oynatılamadı:", error));
    startQuiz();
});


function startQuiz() {
    startingScreen.style.display = "none"; 
    questionContainer.style.display = "flex"; 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results.map(item => ({
                question: decodeHTML(item.question),
                correctAnswer: decodeHTML(item.correct_answer),
                incorrectAnswers: item.incorrect_answers.map(ans => decodeHTML(ans))
            }));
            showNextQuestion();
        })
        .catch(error => {
            console.error("Sorular yüklenirken hata:", error);
            alert("Sorular yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        });
}


function decodeHTML(html) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
}

function showNextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("🎉 Quiz tamamlandı! Tebrikler!");
        return;
    }

    canAnswer = true;
    startLoader();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    const allAnswers = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];
    allAnswers.sort(() => Math.random() - 0.5);

    const price = document.getElementById(`price${currentQuestionIndex + 1}`);
    if (price) price.style.backgroundColor = "#FFA000";

    choicesElements.forEach((choice, index) => {
        choice.textContent = allAnswers[index];
        choice.style.backgroundColor = "#162447";
        choice.onclick = () => {
            if (canAnswer) {
                clearTimeout(loaderTimeout);
                handleAnswerClick(choice.textContent === currentQuestion.correctAnswer, price, choice);
            }
        };
    });

    loaderTimeout = setTimeout(() => {
        if (canAnswer) {
            canAnswer = false;
            showCorrectAnswer();
            setTimeout(() => {
                currentQuestionIndex++;
                showNextQuestion();
            }, 3000);
        }
    }, 30000);
}

function handleAnswerClick(isCorrect, price, choice) {
    canAnswer = false;

    if (isCorrect) {
        price.style.backgroundColor = "#2ECC71";
        choice.style.backgroundColor = "#2ECC71";
    } else {
        price.style.backgroundColor = "#c0392b";
        choice.style.backgroundColor = "#c0392b";
        showCorrectAnswer();
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showNextQuestion();
    }, 3000);
}

function showCorrectAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const correctChoice = choicesElements.find(choice => choice.textContent === currentQuestion.correctAnswer);
    if (correctChoice) correctChoice.style.backgroundColor = "#FFA500";
}

function startLoader() {
    loaderBar.style.transition = 'none';
    loaderBar.style.width = '0';
    setTimeout(() => {
        loaderBar.style.transition = 'width 30s linear';
        loaderBar.style.width = '100%';
    }, 50);
}
