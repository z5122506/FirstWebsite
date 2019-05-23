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
        this.setState({
            evals: []
        })
        event.preventDefault();
        const form = event.target;
        const numbers = form.elements.numbers.value;
        let result = form.elements.result.value;
        if (result === "") {
            result = 10;
        } else {
            result = parseInt(result);
        }

        const algo = new TrainAlgo(numbers.split(""), result, this.addEvaluation, this.resetEvaluations);
        algo.calculateEvaluations();
    }

    addEvaluation(obj) {
        let newEvals = this.state.evals;
        newEvals.push(obj);
        this.setState({
            evals: newEvals
        });
    }

    resetEvaluations() {
        console.log("Resetting");
        this.setState({
            evals: []
        });
    }

    render() {
        console.log("Rendering form");
        const results = [];
        if (this.state.evals != null) {
            // console.log(this.state);
            this.state.evals.forEach((evalObj) => {
                results.push(<li>{`${evalObj.teir}: ${evalObj.eval}`}</li>);
            });
        }

        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <label>Numbers:</label>
                    <input name="numbers"></input>
                    <label>Result</label>
                    <input name="result" placeholder="10"></input>
                    <button type="submit">Run</button>
                </form>
                <ul>
                    {results}
                </ul>
            </div>
        );
    }
}