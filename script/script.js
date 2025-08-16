        // Quiz questions array
        const quizQuestions = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correctAnswer: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 1
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correctAnswer: 1
            },
            {
                question: "In which year did World War II end?",
                options: ["1944", "1945", "1946", "1947"],
                correctAnswer: 1
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correctAnswer: 2
            },
            {
                question: "Which programming language is known as the 'language of the web'?",
                options: ["Python", "Java", "JavaScript", "C++"],
                correctAnswer: 2
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
                correctAnswer: 1
            },
        ];

        // Game state variables
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswer = null;
        let hasAnswered = false;

        // DOM elements
        const questionText = document.getElementById('questionText');
        const answerOptions = document.getElementById('answerOptions');
        const feedback = document.getElementById('feedback');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const nextButton = document.getElementById('nextButton');
        const questionCounter = document.getElementById('questionCounter');
        const progressFill = document.getElementById('progressFill');
        const quizContent = document.getElementById('quizContent');
        const finalScore = document.getElementById('finalScore');
        const finalScoreCircle = document.getElementById('finalScoreCircle');
        const finalMessage = document.getElementById('finalMessage');

        // Initialize the quiz
        function initQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = null;
            hasAnswered = false;
            quizContent.style.display = 'block';
            finalScore.style.display = 'none';
            displayQuestion();
            updateScore();
            updateProgress();
        }

        // Display current question and options
        function displayQuestion() {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            
            // Update question counter
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
            
            // Display question text
            questionText.textContent = currentQuestion.question;
            
            // Clear previous options
            answerOptions.innerHTML = '';
            
            // Create option buttons
            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.onclick = () => selectAnswer(index);
                answerOptions.appendChild(button);
            });
            
            // Reset feedback and next button
            feedback.className = 'feedback';
            feedback.textContent = '';
            nextButton.disabled = true;
            nextButton.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'Show Results' : 'Next Question';
            hasAnswered = false;
            selectedAnswer = null;
        }

        // Handle answer selection
        function selectAnswer(answerIndex) {
            if (hasAnswered) return;
            
            selectedAnswer = answerIndex;
            hasAnswered = true;
            
            const currentQuestion = quizQuestions[currentQuestionIndex];
            const buttons = document.querySelectorAll('.option-button');
            
            // Disable all buttons
            buttons.forEach(button => button.disabled = true);
            
            // Check if answer is correct
            const isCorrect = answerIndex === currentQuestion.correctAnswer;
            
            // Update score
            if (isCorrect) {
                score++;
                updateScore();
            }
            
            // Show visual feedback on buttons
            buttons.forEach((button, index) => {
                if (index === currentQuestion.correctAnswer) {
                    button.classList.add('correct');
                } else if (index === answerIndex && !isCorrect) {
                    button.classList.add('incorrect');
                }
            });
            
            // Show feedback message
            showFeedback(isCorrect);
            
            // Enable next button
            nextButton.disabled = false;
        }

        // Show feedback message
        function showFeedback(isCorrect) {
            feedback.textContent = isCorrect ? 
                '✅ Correct! Well done!' : 
                '❌ Incorrect. Better luck next time!';
            feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'} show`;
        }

        // Update score display
        function updateScore() {
            scoreDisplay.textContent = `Score: ${score} / ${quizQuestions.length}`;
        }

        // Update progress bar
        function updateProgress() {
            const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Move to next question or show final results
        function nextQuestion() {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < quizQuestions.length) {
                displayQuestion();
                updateProgress();
            } else {
                showFinalResults();
            }
        }

        // Show final results
        function showFinalResults() {
            quizContent.style.display = 'none';
            finalScore.style.display = 'block';
            
            const percentage = Math.round((score / quizQuestions.length) * 100);
            finalScoreCircle.textContent = `${score}/${quizQuestions.length}`;
            
            let message = '';
            if (percentage >= 90) {
                message = '🏆 Outstanding! You\'re a quiz master!';
            } else if (percentage >= 70) {
                message = '🎉 Great job! You did really well!';
            } else if (percentage >= 50) {
                message = '👍 Good effort! Keep practicing!';
            } else {
                message = '📚 Don\'t give up! Try again to improve!';
            }
            
            finalMessage.textContent = `You scored ${percentage}%! ${message}`;
        }

        // Restart the quiz
        function restartQuiz() {
            initQuiz();
        }

        // Start the quiz when page loads
        window.onload = function() {
            initQuiz();
        };