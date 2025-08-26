import './question.css'

export default function Question(props) {
    function loadAnswers() {
        return props.answers.map((answer, index) => {
            const answerId = `q${props.id}-a${index}`;
            return (
                <div key={answerId} className="answer-option">
                <input
                    type="radio"
                    id={answerId}
                    name={`question-${props.id}`}
                    value={answer}
                    onChange={() => props.onChange(props.id, answer)}
                    disabled={props.disabled}
                    />
                <label htmlFor={answerId}>{answer}</label>
            </div>
            )
        });
    }

    return (
        <div className="question-container">
            <h3 className="question-text">{props.question}</h3>
            <div className="answer-options">
                {loadAnswers()}
            </div>
        </div>
  )
}