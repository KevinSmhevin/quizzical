export default function Question(props) {
    function loadAnswers() {
        return props.answers.map((answer, index) => (
            <div key={props.id} className="answer-option">
                <input 
                    type="radio" 
                    id={`q${props.id}-a${index}`} 
                    name={`question-${props.id}`} 
                    value={answer}
                    onChange={() => props.onChange(props.id, answer)}
                />
                <label htmlFor={`q${props.id}-a${index}`}>{answer}</label>
            </div>
        ));
    }

    return (
        <div className="question-container">
            <h3 className="question-text">{props.question}</h3>
            {loadAnswers()}
        </div>
  )
}