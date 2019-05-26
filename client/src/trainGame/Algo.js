export class TrainAlgo {
    constructor(letters, result, addCallback, resetCallback) {
        this.letters = letters;
        this.result = result;
        this.correctEvals = [];
        this.correct = addCallback;
        this.reset = resetCallback;

        // this.checkEval = this.checkEval.bind(this);
        this.NORMAL_TEIR = 1;
        this.BRACKET_TEIR = 2;
        this.SPACE_TEIR = 3;
        this.PERM_TEIR = 4;
    }

    calculateEvaluations() {
        this.reset();

        const operations = ["+", "-", "/", "*", "**", " "];
        const preOperations = [];
        const preBrackets = [];

        // Computing the permutations
        const perms = this.permutator(this.letters);
        preOperations.push({
            "numbers": perms.shift(),
            "teir": this.NORMAL_TEIR
        });
        perms.forEach((perm) => {
            preOperations.push({
                "numbers": perm,
                "teir": this.PERM_TEIR
            });
        });

        // Computing the operations
        preOperations.forEach((preOp) => {
            for (let i = 0; i < operations.length; i++) {
                for (let j = 0; j < operations.length; j++) {
                    for (let k = 0; k < operations.length; k++) {
                        const teir = preOp.teir;
                        const numbers = preOp.numbers;
                        const op1 = operations[i];
                        const op2 = operations[j];
                        const op3 = operations[k];

                        let evalArr = [numbers[0], op1, numbers[1], op2, numbers[2], op3, numbers[3]];
                        let isChanged;

                        ({ evalArr, isChanged } = this.removeSpaces(evalArr));

                        if (isChanged && teir < this.SPACE_TEIR) {
                            teir = this.SPACE_TEIR;
                        }

                        preBrackets.push({
                            "eval": evalArr,
                            "teir": teir  
                        });
                    }
                }
            }
        });

        // Computing the brackets
        preBrackets.forEach((evalObj) => {
            const evals = this.computeBracketsRecursive(evalObj);
            evals.forEach((preEvalObj) => {
                this.checkEval(preEvalObj.eval, preEvalObj.teir);
            });
        });
    }

    removeSpaces(evalArr) {
        let changes = 0;
        const length = evalArr.length;
        for (let l = 1; l < length; l += 2) {
            if (evalArr[l - 2*changes] === " ") {
                const removed = evalArr.splice(l-1 - 2*changes, 3);
                const combined = `${removed[0]}${removed[2]}`;
                evalArr.splice(l-1 - 2 * changes, 0, combined);
                changes++;
            }
        }

        // Possible optimising here
        if (changes > 0) {
            for (let l = 0; l < evalArr.length; l += 2) {
                evalArr[l] = this.removeLeadingZero(evalArr[l]);
            }
        }

        return {
            evalArr: evalArr,
            isChanged: (changes !== 0) ? true : false
        };
    }

    removeLeadingZero(number) {
        if (number[0] === "0" && number.length > 1) {
            return this.removeLeadingZero(number.substring(1, number.length));
        } else {
            return number;
        }
    }

    computeBracketsRecursive(evalObj) {
        // console.log(evalObj.eval);
        const evalArr = evalObj.eval;
        if (evalArr.length === 1) {
            return [{
                eval: evalArr[0],
                teir: evalObj.teir
            }];
            // return {
            //     evals: [evalArr[0]],
            //     teir: evalObj.teir
            // };
        } else if (evalArr.length === 3) {
            return [{
                eval: evalArr[0],
                teir: evalObj.teir
            }]
            // return {
            //     evals: [`${evalArr.join("")}`],
            //     teir: evalObj.teir
            // };
        } else {
            let evals = [];
            for (let i = 0; i < evalArr.length - 1; i += 2) {
                const firstArr = this.computeBracketsRecursive({
                    eval: evalArr.slice(0, i + 1),
                    teir: evalObj.teir
                });
                const secondArr = this.computeBracketsRecursive({
                    eval: evalArr.slice((i+2), evalArr.length),
                    teir: evalObj.teir
                });
                const operator = evalArr[i+1];
                firstArr.forEach((first) => {
                    evals = evals.concat(secondArr.map((second) => {
                        let teir = (first.teir < second.teir) ? second.teir : first.teir;
                        teir = (teir > this.BRACKET_TEIR) ? teir : this.BRACKET_TEIR;
                        return {
                            eval: "(" + first.eval + ")" + operator + "(" + second.eval + ")", 
                            teir
                        };
                    }));
                });
            } 
            evals.push({
                eval: evalArr.join(""),
                teir: evalObj.teir
            });
            return evals;
        }
    }

    checkEval(evalString, teir) {
        if (eval(evalString) === this.result) {
            if (this.correct) {
                this.correct({
                    eval: evalString,
                    teir
                });
            }
        }
    }

    permutator (inputArr) {
        let result = [];
      
        const permute = (arr, m = []) => {
          if (arr.length === 0) {
            result.push(m)
          } else {
            for (let i = 0; i < arr.length; i++) {
              let curr = arr.slice();
              let next = curr.splice(i, 1);
              permute(curr.slice(), m.concat(next))
           }
         }
       }
      
       permute(inputArr)
      
       return result;
    }
}