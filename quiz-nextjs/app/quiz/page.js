"use client";

import { useState } from "react";
import { quiz } from "../data";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const question = quiz.questions[currentQuestionIndex];

  return (
    <div className="text-center my-8 rtl">
      <h3 className="text-2xl">{question.question} ؟</h3>
      <ul className="flex justify-center gap-5 mt-3">
        {question.answers.map((item, index) => (
          <li
            key={index}
            className={`boder-solid outline-1 p-2 rounded-lg cursor-pointer ${
              userAnswers[question.id] && userAnswers[question.id] == item
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
            onClick={() => {
              setUserAnswers({ ...userAnswers, [question.id]: item });
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {userAnswers[question.id] && (
        <div className="flex justify-center mt-6">
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              className="decoration-white decoration-1 decoration-solid underline cursor-pointer hover:scale-105 transition-normal"
              onClick={() => console.log(userAnswers)}
            >
              پایان و مشاهده نتایج آزمون
            </button>
          ) : (
            <button
              className="decoration-white decoration-1 decoration-solid underline cursor-pointer hover:scale-105 transition-normal"
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            >
              سوال بعدی
            </button>
          )}
        </div>
      )}
    </div>
  );
}
