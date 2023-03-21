import { useState } from "react"

const data = [
  ["C", "+/-", "%", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

const App = () => {
  const [isNum, setIsNum] = useState(true)
  const [panel, setPanel] = useState("")
  const [result, setResult] = useState("")

  const handleClick = (value) => {
    let newResult
    if (typeof value === "number") {
      setIsNum(true)
    } else {
      if (value === "+/-" || value === "%") {
        setIsNum(true)
      } else setIsNum(false)
    }

    if (value === "=") {
      newResult = eval(result).toString()
      setPanel(newResult)
      setIsNum(true)
    } else if (value === "×" || value === "÷") {
      if (value === "×") newResult = result.concat("*")
      else newResult = result.concat("/")
      setPanel(panel.concat(value))
      setResult(newResult)
    } else if (value === "C") {
      setPanel("")
      setResult("")
    } else if (value === "+/-") {
      newResult = (eval(result) * -1).toString()
      setPanel(newResult)
      setResult(newResult)
    } else if (value === "%") {
      newResult = (eval(result) / 100).toString()
      setPanel(newResult)
      setResult(newResult)
    } else {
      setPanel(panel.concat(value))
      setResult(result.concat(value))
    }
  }

  return (
    <div className="calculator">
      <div className="panel">{panel ? panel : 0}</div>
      {data.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={`row ${rowIndex === 4 && "last"}`}>
            {row.map((value, colIndex) => {
              return (
                <button
                  key={colIndex}
                  className={`btn ${
                    colIndex === row.length - 1
                      ? "orange"
                      : rowIndex === 0
                      ? "gray"
                      : "darkGray"
                  } ${
                    !isNum &&
                    isNaN(value) &&
                    value !== "." &&
                    value !== "C" &&
                    "disable"
                  }`}
                  onClick={() => handleClick(value)}
                >
                  {value}
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default App
