import {ActionType, calculator, sum} from './reducer';

test('sum',() => {
    // 1.Test data
    const num1 = 10;
    const num2 = 12;

    // 2.Executing code
    const result = sum(num1,num2)

    // 3.Comparing with expected result
    expect(result).toBe(22);
})

test('sum by calculator',() => {
    // 1.Test data
    const num1 = 10;
    const num2 = 12;

    // 2.Executing code
    const action:ActionType = {type:"SUM",number:num2};
    const result = calculator(num1,action)

    // 3.Comparing with expected result
    expect(result).toBe(22);
})

test('mult by calculator',() => {
    const num1 = 10;
    const action:ActionType = {type:"MULT",number:12};
    expect(calculator(num1,action)).toBe(120);
})

test('sub by calculator',() => {
    const num1 = 10;
    const action:ActionType = {type:"SUB",number:12};
    expect(calculator(num1,action)).toBe(-2);
})

test('div by calculator',() => {
    const num1 = 10;
    const action:ActionType = {type:"DIV",number:12};
    expect(calculator(num1,action)).toBe(0.8333333333333334);
})

test('exp by calculator',() => {
    const num1 = 10;
    const action:ActionType = {type:"EXP",number:12};
    expect(calculator(num1,action)).toBe(1000000000000);
})

