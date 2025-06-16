import React, { useReducer } from 'react';
import DigitButton from './Digit';
import OperationButton from './Operation';
import './index.css'

 export const ACTIONS ={
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperation === "0") return state;
      if (payload.digit === "." && state.currentOperation?.includes(".")) return state;
      return {
        ...state,
        currentOperation: `${state.currentOperation || ""}${payload.digit}`,
      };
    
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperation == null && state.previousOperation == null) {
        return state;
      }
      if (state.previousOperation == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperation: state.currentOperation,
          currentOperation: null,
        };
      }
      return {
        ...state,
        previousOperation: evaluate(state),
        operation: payload.operation,
        currentOperation: null,
      };
    
    case ACTIONS.CLEAR:
      return {};
    
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite: false,
          currentOperation: null
        }

      }
      if (state.currentOperation == null) return state;
      if (state.currentOperation.length === 1) {
        return { ...state, currentOperation: null };
      }
      return {
        ...state,
        currentOperation: state.currentOperation.slice(0, -1),
      };
    
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperation == null || state.previousOperation == null) {
        return state;
      }
      return {
        ...state,
        previousOperation: null,
        operation: null,
        currentOperation: evaluate(state),
      };
    
  }
}

function evaluate({ currentOperation, previousOperation, operation }) {
  const prev = parseFloat(previousOperation);
  const current = parseFloat(currentOperation);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function Index() {
const [{currentOperation, previousOperation, operation}, dispatch] =
 useReducer(reducer, {
  
 });

  return (
    <div className="calculator-grid">
      <div className='outPut'>
        <div className='previous operand'>{previousOperation} {operation}</div>
        <div className='current-operand'>  {currentOperation}</div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button  onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation ="/" dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation ="*" dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation ="+" dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation ="-" dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className='span-two'  onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default Index;