import React from 'react';
import { TrainAlgo } from './Algo';

export class TrainForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            evals: [] 
        };
        this.submitForm = this.submitForm.bind(this);
        this.addEvaluation = this.addEvaluation.bind(this);
        this.resetEvaluations = this.resetEvaluations.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        
        console.log(this.isANumber("1a"))
        console.log(this.isANumber("10"))

        // Getting form information
        const form = event.target;
        const numbers = form.elements.numbers.value;
        let isCorrectInput = true;
        if (!this.isANumber) {
            this.setSuccessField("Carriage number must be a number");
            isCorrectInput = false;
        }
        // TODO: remove this restriction
        if (numbers.length !== 4) {
            this.setSuccessField("Carriage number must be of length 4");
            isCorrectInput = false;
        }

        let result = form.elements.result.value;
        if (result === "") {
            result = 10;
        } else {
            if (this.isANumber(result)) result = parseInt(result);
            else {
                this.setSuccessField("Result must be a number");
                isCorrectInput = false;
            }
        }

        if (isCorrectInput) {
            // Collecting and displaying resulting evalutions
            const algo = new TrainAlgo(numbers.split(""), result, this.addEvaluation, this.resetEvaluations);
            const success = algo.calculateEvaluations();

            // Displaying a success or fail state for possible answers
            if (success) {
                this.setSuccessField("Answer found");
            } else {
                this.setSuccessField("No answers found");
            }
        }
    }

    isANumber(numStr) {
        if (numStr.search(/[^0-9]/) !== -1) return false;
        return true;
    }

    setSuccessField(message) {
        const field = document.getElementById('successField');
        field.innerHTML = message;
    }

    addEvaluation(obj) {
        let newEvals = this.state.evals;
        newEvals.push(obj);
        this.setState({
            evals: newEvals
        });
    }

    resetEvaluations() {
        let newEvals = this.state.evals;
        newEvals.length = 0;
        this.setState({
            evals: newEvals
        });
    }

    render() {
        const results = [];
        if (this.state.evals != null) {
            this.state.evals.forEach((evalObj) => {
                results.push(<li>{`${evalObj.teir}: ${evalObj.eval}`}</li>);
            });
        }

        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <label>Numbers:</label>
                    <input name="numbers" required></input>
                    <label>Result</label>
                    <input name="result" placeholder="10"></input>
                    <button type="submit">Run</button>
                </form>
                <div id="successField">
                </div>
                <ul>
                    {results}
                </ul>
            </div>
        );
    }
}