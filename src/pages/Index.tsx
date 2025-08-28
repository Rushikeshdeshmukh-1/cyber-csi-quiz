import { useState, useEffect } from "react";
import LoadingPage from "@/components/LoadingPage";
import LandingPage from "@/components/LandingPage";
import RegisterPage from "@/components/RegisterPage";
import QuizPage from "@/components/QuizPage";
import LeaderboardPage from "@/components/LeaderboardPage";

type PageType = "loading" | "landing" | "register" | "quiz" | "leaderboard";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const quizQuestions = [
  {
    id: "quiz-1",
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"],
    answer: "Central Processing Unit",
    next: "quiz-2"
  },
  {
    id: "quiz-2",
    question: "Which of the following is a database management system?",
    options: ["MySQL", "Python", "C++", "Linux"],
    answer: "MySQL",
    next: "quiz-3"
  },
  {
    id: "quiz-3",
    question: "In computer networks, what does IP stand for?",
    options: ["Internet Protocol", "Internal Process", "Interface Program", "Internet Procedure"],
    answer: "Internet Protocol",
    next: "quiz-4"
  },
  {
    id: "quiz-4",
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    next: "quiz-5"
  },
  {
    id: "quiz-5",
    question: "Which company created the Java programming language?",
    options: ["Sun Microsystems", "Microsoft", "Apple", "Google"],
    answer: "Sun Microsystems",
    next: "quiz-6"
  },
  {
    id: "quiz-6",
    question: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "High Transfer Text Program", "Hyper Transfer Text Protocol", "Host Transfer Text Path"],
    answer: "HyperText Transfer Protocol",
    next: "quiz-7"
  },
  {
    id: "quiz-7",
    question: "Which of these is an operating system?",
    options: ["Linux", "HTML", "SQL", "CSS"],
    answer: "Linux",
    next: "quiz-8"
  },
  {
    id: "quiz-8",
    question: "Which sorting algorithm has the best average case complexity?",
    options: ["Quick Sort", "Bubble Sort", "Selection Sort", "Merge Sort"],
    answer: "Merge Sort",
    next: "quiz-9"
  },
  {
    id: "quiz-9",
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "System Query Logic", "Sequential Query Language", "Standard Quick Language"],
    answer: "Structured Query Language",
    next: "quiz-10"
  },
  {
    id: "quiz-10",
    question: "Which part of the computer is considered the brain?",
    options: ["CPU", "GPU", "Motherboard", "RAM"],
    answer: "CPU",
    next: "scoreboard"
  }
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("loading");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; selected: string; correct: boolean }[]>([]);

  const handleLoadingComplete = () => {
    setCurrentPage("landing");
  };

  const handleGetStarted = () => {
    setCurrentPage("register");
  };

  const handleRegister = (data: UserData) => {
    setUserData(data);
    setCurrentPage("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (selectedAnswer: string, isCorrect: boolean) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    setAnswers(prev => [...prev, {
      question: currentQuestion.question,
      selected: selectedAnswer,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentPage("leaderboard");
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "loading":
        return <LoadingPage onComplete={handleLoadingComplete} />;
      
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case "register":
        return <RegisterPage onSubmit={handleRegister} />;
      
      case "quiz":
        const currentQuestion = quizQuestions[currentQuestionIndex];
        return (
          <QuizPage
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizQuestions.length}
          />
        );
      
      case "leaderboard":
        return (
          <LeaderboardPage
            userScore={score}
            userName={userData ? `${userData.firstName} ${userData.lastName}` : "Unknown"}
          />
        );
      
      default:
        return <LoadingPage onComplete={handleLoadingComplete} />;
    }
  };

  return renderCurrentPage();
};

export default Index;
