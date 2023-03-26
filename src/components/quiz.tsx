import React, { useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonIcon,
  IonCard,
} from "@ionic/react";
import {
  arrowForward,
  checkmarkCircleOutline,
  sadOutline,
} from "ionicons/icons";
import questions from "./question.json";
import "../pages/Home.css";

const Quiz = () => {
  const [currentquestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerSelection = (event: {
    detail: { value: React.SetStateAction<string> };
  }) => {
    setSelectedAnswer(event.detail.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentquestion].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    setCurrentQuestion(currentquestion + 1);
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === questions[currentquestion].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    setCurrentQuestion(-1);
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
  };

  const renderQuiz = () => {
    if (currentquestion < 0) {
      return (
        <IonCard  className="quiz-container padding">
          <IonIcon
            icon={score >= 5 ? checkmarkCircleOutline : sadOutline}
            className={score >= 5 ? "happy-icon" : "sad-icon"}
          />
          <h1>{score >= 5 ? "Congratulations!" : "Sorry!"}</h1>
          <p>
            Your final score is {score} out of {questions.length}.
          </p>
          <IonButton onClick={handleTryAgain}>
            <h1>Try Again</h1>
          </IonButton>
        </IonCard>
      );
    }
    const question = questions[currentquestion];
    return (
      <>
        <IonCard className="padding">
          <h1>{question.question}</h1>
          <IonRadioGroup
            value={selectedAnswer}
            onIonChange={handleAnswerSelection}
          >
            {question.choices.map((choice, index) => (
              <IonItem key={index}>
                <IonLabel>{choice}</IonLabel>
                <IonRadio slot="start" value={choice} />
              </IonItem>
            ))}
          </IonRadioGroup>
          <IonButton
            disabled={!selectedAnswer}
            onClick={
              currentquestion === questions.length - 1
                ? handleSubmitQuiz
                : handleNextQuestion
            }
          >
            {currentquestion === questions.length - 1
              ? "Submit Quiz"
              : "Next Question"}
            <IonIcon icon={arrowForward} />
          </IonButton>
        </IonCard>
      </>
    );
  };

  return (
    <IonApp>
      <IonHeader >
        <IonToolbar >
          <IonTitle>JavaScript Functions Quiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>{renderQuiz()}</IonList>
      </IonContent>
    </IonApp>
  );
};

export default Quiz;
