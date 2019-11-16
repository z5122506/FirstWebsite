import { TrainAlgo } from './Algo';

it('generates brackets correctly for 4 digits', () => {
    // Run on 1 + 2 + 3 + 4
    const algo = new TrainAlgo("1234", 10);

    const results = algo.computeBracketsRecursive({
        eval: ["1", "+", "2", "+", "3", "+", "4"],
        teir: 1
    });

    console.log(results);

    expect(results).toStrictEqual([
        {eval: ["(1)", "+", "((2)", "+", "(3", "+", "4))"], teir: 2},
        {eval: ["(1)", "+", "((2", "+", "3)", "+", "(4))"], teir: 2},
        {eval: ["(1)", "+", "(2", "+", "3", "+", "4)"], teir: 2},
        {eval: ["(1", "+", "2)", "+", "(3", "+", "4)"], teir: 2},
        {eval: ["((1)", "+", "(2", "+", "3))", "+", "(4)"], teir: 2},
        {eval: ["((1", "+", "2)", "+", "(3))", "+", "(4)"], teir: 2},
        {eval: ["(1", "+", "2", "+", "3)", "+", "(4)"], teir: 2},
        {eval: ["1", "+", "2", "+", "3", "+", "4"], teir: 1}
    ])
});