import "./App.css";
import { useState } from "react";
import "./Calculator.css";
function App() {
  const [mathOperation, setMathOperation] = useState("");
  const [mathResult, setMathResult] = useState("");

  const LegalOperatorsFirst = /[%*/]/;
  const LegalOperators = /[-+%*/]/;
  const allButtons = /[0-9]|-|\+|\/|\*|%/;
  const localLastInput = mathOperation[mathOperation.length - 1];
  const localPrevLastInput = mathOperation[mathOperation.length - 2];

  // Handle Paste #############################
  const handlePatse = (e) => {
    e.preventDefault();
    alert("pasting is not allowed!");
  };
  // Handle Equelation *********************************************************************
  const [lastOperation, setLastOperation] = useState([]);
  const handleEqualOperator = () => {
    setLastOperation([...lastOperation, `${mathOperation}= ${mathResult}`]);
    if (
      lastOperation[lastOperation.length - 1] ===
        `${mathOperation}= ${mathResult}` ||
      mathOperation === ""
    ) {
      setLastOperation([...lastOperation]);
    }
    setMathOperation("");
  };
  let historyList = lastOperation.map((item, index) => {
    return (
      <ul>
        <li key={index}>{item} </li>
      </ul>
    );
  });

  // Handle Change ***************
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const lastInput = e.target.value[e.target.value.length - 1];
    const prevLastInput = mathOperation[mathOperation.length - 1];

    if (mathOperation === "" && LegalOperatorsFirst.test(lastInput)) {
      console.log("illegal");
      console.log(inputValue.replace(lastInput, ""));
      console.log(mathOperation);
      setMathOperation(inputValue.replace(lastInput, ""));
    } else if (!allButtons.test(lastInput)) {
      setMathOperation(inputValue.replace(lastInput, ""));
    } else if (
      LegalOperators.test(prevLastInput) &&
      LegalOperators.test(lastInput)
    ) {
      setMathOperation(
        inputValue.slice(0, inputValue.length - 2) + `${lastInput}`
      );
    } else {
      setMathOperation(inputValue);
    }

    if (lastInput === ".") {
      setMathOperation(inputValue);
    }
    let parts = inputValue.split(/[*+\-/]/);
    let lastPart = parts[parts.length - 1];
    if ((lastPart.match(/\./g) || []).length > 1) {
      setMathOperation(inputValue.slice(0, inputValue.length - 1));
    }

    // On deleting characters************************
    if (
      e.nativeEvent.data === null &&
      (!Number(lastInput) || lastInput === "0")
    ) {
      setMathResult(eval(mathOperation.slice(0, inputValue.length - 1)));
    }
    if (!Number(lastInput) && !Number(prevLastInput)) {
      setMathResult(eval(mathOperation.slice(0, inputValue.length - 2)));
    } else if (!Number(lastInput)) {
      setMathResult(eval(mathOperation.slice(0, inputValue.length - 1)));
    } else {
      setMathResult(eval(inputValue));
    }
  };

  //***** Handle Key Press ***** */
  const handleKeyPress = (e) => {
    setMathOperation((prev) => prev + e.target.value);

    const lastInput = e.target.value;
    const prevLastInput = mathOperation[mathOperation.length - 1];

    if (mathOperation === "" && LegalOperatorsFirst.test(lastInput)) {
      console.log("illegal");
      console.log(mathOperation.replace(lastInput, ""));
      console.log(mathOperation);
      setMathOperation(mathOperation.replace(lastInput, ""));
    } else if (
      LegalOperators.test(prevLastInput) &&
      LegalOperators.test(lastInput)
    ) {
      setMathOperation(
        (prevMathOperation) =>
          prevMathOperation.slice(0, prevMathOperation.length - 2) +
          `${lastInput}`
      );
    }
    let parts = mathOperation.split(/[*+\-/]/);
    let lastPart = parts[parts.length - 1];

    if (lastInput === ".") {
      if (prevLastInput === "." && lastInput === ".") {
        setMathOperation(mathOperation.replace(lastInput, "."));
      }
      if ((lastPart.match(/\./g) || []).length > 0) {
        setMathOperation(mathOperation + "");
      }
    }
    if (Number(+e.target.value) || e.target.value === "0") {
      setMathResult(eval(mathOperation + +e.target.value));
    }
    if (lastInput === "=") {
      console.log("wooow");
    }
  };

  //########## Handle Deleting
  const handleDelete = () => {
    setMathOperation(mathOperation.slice(0, mathOperation.length - 1));
    if (Number(localLastInput) && !Number(localPrevLastInput)) {
      setMathResult(eval(mathOperation.slice(0, mathOperation.length - 2)));
    } else if (Number(localLastInput) && Number(localPrevLastInput)) {
      setMathResult(eval(mathOperation.slice(0, mathOperation.length - 1)));
    } else if (
      localLastInput === "0" &&
      !Number(localPrevLastInput) &&
      localPrevLastInput !== "0"
    ) {
      setMathResult(eval(mathOperation.slice(0, mathOperation.length - 2)));
    } else if (localLastInput === "0") {
      setMathResult(eval(mathOperation.slice(0, mathOperation.length - 1)));
    }
  };
  //################# Handle Clearing
  const handleClear = () => {
    setMathOperation("");
    setMathResult("");
  };

  //***************************************JSX************************************************/
  return (
    <div className="calculatorProject flex">
      {/* <InputControl /> */}
      <div className="calculator">
        <div className="results">
          <div className="history">{historyList}</div>
          <div className="Show">
            <input
              className="current"
              onChange={handleChange}
              onPaste={handlePatse}
              value={mathOperation}
            />
            <div className="result">
              <span className="MathResult">
                {mathResult !== "" ? "= " : ""}
                {mathResult}
              </span>
            </div>
          </div>
        </div>

        <div className="operations">
          <button className="del" onClick={handleClear} name={"clear"}>
            Clear
          </button>
          <button className="del" onClick={handleDelete}>
            del
          </button>
          <button className="del" onClick={handleKeyPress} value={"%"}>
            %
          </button>
          <button
            onClick={handleKeyPress}
            value={"/"}
            className="orange"
            style={{ color: "#800080b3" }}
          >
            /
          </button>
          <button onClick={handleKeyPress} value={7}>
            7
          </button>
          <button onClick={handleKeyPress} value={8}>
            8
          </button>
          <button onClick={handleKeyPress} value={9}>
            9
          </button>
          <button
            onClick={handleKeyPress}
            value={"*"}
            className="orange"
            style={{ color: "#ff0000bd" }}
          >
            x
          </button>
          <button onClick={handleKeyPress} value={4}>
            4
          </button>
          <button onClick={handleKeyPress} value={5}>
            5
          </button>
          <button onClick={handleKeyPress} value={6}>
            6
          </button>
          <button
            onClick={handleKeyPress}
            value={"-"}
            className="orange"
            style={{ color: "#0000ffb5" }}
          >
            -
          </button>
          <button onClick={handleKeyPress} value={1}>
            1
          </button>
          <button onClick={handleKeyPress} value={2}>
            2
          </button>
          <button onClick={handleKeyPress} value={3}>
            3
          </button>
          <button
            onClick={handleKeyPress}
            value={"+"}
            className="orange"
            style={{ color: "#008000d4" }}
          >
            +
          </button>
        </div>
        <div className="three">
          <button onClick={handleKeyPress} value={"0"} className="zero">
            0
          </button>
          <button onClick={handleKeyPress} value={"."} className="dot">
            .
          </button>
          <button
            onClick={handleEqualOperator}
            value={"="}
            className="orange equal"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
