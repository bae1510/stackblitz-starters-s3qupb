import React from 'react';
import { useState } from 'react';
export default function Calculator() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState();

  function handleValue1(e) {
    setNum1(e.target.value);
  }
  function handleValue2(e) {
    setNum2(e.target.value);
  }

  function handleAdd() {
    const sum = Number(num1) + Number(num2);
    setResult(sum);
    setNum1('');
    setNum2('');
  }
  function handleSub() {
    const sub = Number(num1) - Number(num2);
    setResult(sub);
    setNum1('');
    setNum2('');
  }
  function handleMul() {
    const mul = Number(num1) * Number(num2);
    setResult(mul);
    setNum1('');
    setNum2('');
  }
  function handleDiv() {
    const div = Number(num1) / Number(num2);
    setResult(div);
    setNum1('');
    setNum2('');
  }

  return (
    <div>
      <h3>Calculator</h3>
      <input
        type="number"
        placeholder="Enter a value"
        value={num1}
        onChange={handleValue1}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="Enter a value "
        value={num2}
        onChange={handleValue2}
      />
      <br />
      <br />
      <button onClick={handleAdd}>Addition</button>
      <button onClick={handleSub}>Substraction</button>
      <button onClick={handleMul}>Multiplication</button>
      <button onClick={handleDiv}>Division</button>
      <h2>Result:{result}</h2>
    </div>
  );
}