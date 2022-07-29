import React, { useEffect, useState } from "react"
import Question from "./Question"
import { nanoid } from "nanoid"

export default function Quiz(props) {
    
    const [showAnswer, setShowAnswer] = useState(false)
    const [quizEnded, setQuizEnded] = useState(false)
    const [score, setScore] = useState(0)
    const [formData, setFormData] = useState([
        {
            questionId:0,
            selectedValue: null,
            isCorrect: false
        }, {
            questionId:1,
            selectedValue: null,
            isCorrect: false
        }, {
            questionId:2,
            selectedValue: null,
            isCorrect: false
        }, {
            questionId:3,
            selectedValue: null,
            isCorrect: false
        }, {
            questionId:4,
            selectedValue: null,
            isCorrect: false
        }
    ])

    const elements = props.allQuestions.map(
        question => {
            return <Question key={nanoid()}
                id={props.allQuestions.indexOf(question)}
                allOptions={
                    question.options
                }
                question={atob(question.question)}
                correct={atob(question.correct_answer)}
                showAnswer={showAnswer}
                updateForm={updateForm}
                formData={formData}
            />
        })

    function updateForm(selectedValue, questionId, isCorrect) {
        const updatedData = {
            questionId: questionId,
            selectedValue: selectedValue,
            isCorrect: isCorrect
        }
        setFormData(prev => [...prev.filter(item => item.questionId !== questionId), updatedData])
    }

    function showAnswers() {
        if (quizEnded) {
            props.reloadQuestions();
            props.toggleQuizStart();
            setQuizEnded(false);
        } else {
            setScore(computeScore())
            setShowAnswer(prevShowAnswer => !prevShowAnswer)
            setQuizEnded(true)
        }
    }

    function computeScore() {
        let score = 0;

        formData.forEach(element => {
        if (element.isCorrect) {
            score++
        }
        });
        return score;
    }
    
    return (
        <div className="questions--container">
            {elements}
            {quizEnded && <span>You scored {score} / {formData.length} correct answers.</span>}
            <button className="btn btn--check-answers" onClick={showAnswers}>{!quizEnded ? "Check answers" : "Play Again"}</button>
        </div>
    )
}