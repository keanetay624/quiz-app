import React from "react"

export default function(props) {
    return (
        <div className="start--screen">
            <h1>Quizzical</h1>
            <button className="btn btn--start" onClick={props.toggleQuizStart}>Start quiz</button>
        </div>
    )
}