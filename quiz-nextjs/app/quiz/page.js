"use client";

import { Suspense, useEffect, useState } from "react";
import { quiz } from "../data";
import Loading from "./loading";
import { serverDelaySimulator } from "../util/helper";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { AnswerButton } from "./AnswerButton";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userCorrectAnswers, setUserCorrectAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const [question, setQuestion] = useState(
    quiz.questions[currentQuestionIndex]
  );

  /**
   * Set question on question index change
   */
  useEffect(() => {
    setQuestion(quiz.questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  /**
   * Fitler correct user answers and set to the state
   */
  useEffect(() => {
    const correctAnswers = quiz.questions.map((item, id) => item.correctAnswer);

    const correctSelects = Object.values(userAnswers).filter((value) =>
      correctAnswers.includes(value)
    );

    setUserCorrectAnswers(correctSelects);
  }, [userAnswers]);

  /**
   * Reset the quiz
   */
  const reset = () => {
    setCurrentQuestionIndex(0);

    setUserAnswers({});

    setUserCorrectAnswers([]);

    setShowResult(false);
  };

  /**
   * Executes after select answer by user
   */
  const selectAnswerHandler = (answer) => {
    setUserAnswers({ ...userAnswers, [question.id]: answer });
  };

  /**
   * Executes after click on next question button
   */
  const moveToNextQuestion = () => {
    setQuestion(null);

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 2000);
  };

  return showResult ? (
    <div className="text-center my-8 rtl w-100 mx-auto">
      <h3 className="text-2xl mb-4">نتایج آزمون</h3>
      <div className="grid grid-cols-2 justify-center gap-4 mb-4">
        <p>
          <span>تعداد سوالات درست :</span>
          <span>{userCorrectAnswers.length}</span>
        </p>
        <p>
          <span>تعداد سوالات غلط :</span>
          <span>
            {Object.values(userAnswers).length - userCorrectAnswers.length}
          </span>
        </p>
      </div>
      <button
        className="border-solid border-1 px-3 py-2 rounded-3xl cursor-pointer hover:bg-white hover:text-black"
        onClick={reset}
      >
        شروع مجدد آزمون
      </button>
    </div>
  ) : (
    <div className="text-center my-8 rtl">
      {question ? (
        <>
          <h3 className="text-2xl">{question.question} ؟</h3>
          <ul className="flex justify-center gap-5 mt-3">
            {question.answers.map((item, index) => (
              <Suspense
                key={index}
                fallback={
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <p>
                      <Skeleton count={1} height={40} width={50} />
                    </p>
                  </SkeletonTheme>
                }
              >
                <AnswerButton
                  onClick={() => selectAnswerHandler(item)}
                  answer={item}
                  isActive={
                    userAnswers[question.id] && userAnswers[question.id] == item
                  }
                />
              </Suspense>
            ))}
          </ul>
          {userAnswers[question.id] && (
            <div className="flex justify-center mt-6">
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  className="decoration-white decoration-1 decoration-solid underline cursor-pointer hover:scale-105 transition-normal"
                  onClick={() => setShowResult(true)}
                >
                  پایان و مشاهده نتایج آزمون
                </button>
              ) : (
                <button
                  className="decoration-white decoration-1 decoration-solid underline cursor-pointer hover:scale-105 transition-normal"
                  onClick={moveToNextQuestion}
                >
                  سوال بعدی
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="w-96 mx-auto">
          <Loading />
        </div>
      )}
    </div>
  );
}
