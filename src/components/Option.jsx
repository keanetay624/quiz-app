import React from "react"

export default function Option(props) {
    const questionIndex = props.formData.find(formItem => formItem.questionId === props.questionId);
    const selectedVal = questionIndex.selectedValue;

    const styles = {
        backgroundColor: !props.showAnswer && selectedVal === props.id ? "#D6DBF5"
            : props.showAnswer && selectedVal === props.id && props.isCorrect ? "#94D7A2"
            : props.showAnswer && selectedVal === props.id && !props.isCorrect ? "#F8BCBC"
            : props.showAnswer && props.isCorrect ? "#94D7A2" 
            :  "white" 
    }
    
    return (
        <button className="btn" 
                onClick={(event) => props.updateForm(props.id, props.questionId, props.isCorrect)} 
                style={styles}>
                {props.value}
        </button>
    )
}