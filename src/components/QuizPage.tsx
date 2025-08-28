import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  next?: string;
}

interface QuizPageProps {
  question: QuizQuestion;
  onAnswer: (selectedAnswer: string, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizPage = ({ question, onAnswer, questionNumber, totalQuestions }: QuizPageProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setSelectedOption("");
    setShowResult(false);
    setTimeLeft(30);
  }, [question.id]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmit();
    }
  }, [timeLeft, showResult]);

  const handleSubmit = () => {
    const correct = selectedOption === question.answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(selectedOption, correct);
    }, 2000);
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return "text-primary";
    if (timeLeft > 10) return "text-yellow-400";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background cyberpunk-grid flex items-center justify-center relative p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="hologram rounded-lg p-8 mb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-primary">Question {questionNumber}</h2>
              <div className="text-sm text-muted-foreground">
                {questionNumber} of {totalQuestions}
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className={`text-2xl font-bold ${getTimeColor()} font-mono`}>
                {timeLeft}s
              </div>
              <div className="text-sm text-muted-foreground">Time Left</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 bg-muted rounded-full h-2">
            <div 
              className="h-full bg-primary rounded-full neon-glow transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Question */}
        <div className="hologram rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-foreground mb-8">
            {question.question}
          </h1>
          
          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option === question.answer;
              
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ";
              
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "bg-destructive/20 border-destructive text-destructive";
                } else {
                  buttonClass += "bg-muted/20 border-muted text-muted-foreground";
                }
              } else {
                if (isSelected) {
                  buttonClass += "bg-primary/20 border-primary text-primary neon-glow";
                } else {
                  buttonClass += "bg-muted/10 border-muted/30 text-foreground hover:border-primary/50 hover:bg-primary/10";
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedOption(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Submit Button */}
          {!showResult && (
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption}
              size="lg"
              className="w-full mt-8 bg-primary hover:bg-primary/80 text-primary-foreground font-bold neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </Button>
          )}
          
          {/* Result Display */}
          {showResult && (
            <div className="text-center space-y-4 mt-8">
              <div className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-destructive'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              {!isCorrect && (
                <div className="text-muted-foreground">
                  The correct answer was: <span className="text-green-400 font-bold">{question.answer}</span>
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                Moving to next question...
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-4 h-4 bg-primary rounded-full animate-pulse" />
      <div className="absolute bottom-10 left-10 w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
    </div>
  );
};

export default QuizPage;