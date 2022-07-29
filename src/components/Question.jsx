import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid";
import Option from "./Option"

export default function Question(props) {

    const { allOptions } = props;

    const buttonElements = allOptions.map(option =>
        <Option key={nanoid()} 
            id={props.allOptions.indexOf(option)}
            questionId={props.id}
            value={option} 
            isCorrect={props.correct === option ? true : false}
            showAnswer={props.showAnswer}
            updateForm={props.updateForm}
            formData={props.formData}
        />
    )

    return (
        <div className="question">
            <h3 className="question--title">{props.question}</h3>
            <div className="option--group">
                {buttonElements}
            </div>
            <hr />
        </div>
    )

}