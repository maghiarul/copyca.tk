import { useState } from "react";
import reactLogo from "./assets/react.svg";
import LOGO from "./assets/cat.png";

function App() {
  const [msg, setMsg] = useState("");

  const handleMsg = (event: any) => {
    setMsg(event.target.value);
  };

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  const dateString =
    currentDayOfMonth +
    "-" +
    (currentMonth + 1) +
    "-" +
    currentYear +
    "  ||  " +
    currentHour +
    "-" +
    currentMinutes;

  return (
    <div className="App">
      <div className="smt">
        <div className="logo">
          <img src={LOGO} className="logo" />
          <span>Copyca.tk</span>
        </div>
      </div>
      <div className="paste">
        <textarea placeholder="Paste here..." onChange={handleMsg}></textarea>
        <button
          className="btn"
          onClick={() => {
            const id = makeid(10);
            console.log("msg: " + msg);
            console.log("id: " + id);
            console.log("timestamp: " + dateString);
            // make a post request with msg and id as parameters.
          }}
        >
          Create new paste
        </button>
      </div>
    </div>
  );
}

export default App;
