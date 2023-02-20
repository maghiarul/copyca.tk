import { useEffect, useState, useRef } from "react";
import LOGO from "./assets/cat.png";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");

  const handleMsg = (event: any) => {
    setMsg(event.target.value);
  };
  const [pasteId, setPasteId] = useState("");

  const handlePasteId = (event: any) => {
    setPasteId(event.target.value);
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
  const [id, setID] = useState("");

  function AddPaste() {
    const id = makeid(10);
    setID(id);
    const date = Date.now();
    const data = JSON.stringify({
      id: id,
      msg: msg,
      timestamp: date,
    });
    axios.post("http://localhost:4000/addPaste", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const [paste, setPaste] = useState("");

  const data2 = JSON.stringify({
    pasteId: pasteId,
  });

  function getPaste() {
    axios
      .post("http://localhost:4000/getPaste", data2, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data[0].paste);
        setPaste(res.data[0].paste);
      });
  }

  useEffect(() => {
    setPaste(paste);
  }, [paste]);

  const inputRef = useRef(null);
  const onButtonClick = () => {
    // @ts-ignore (us this comment if typescript raises an error)
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <div className="smt">
        <div className="logo">
          <img src={LOGO} className="logo" />
          <span>Copyca.tk</span>
        </div>
      </div>
      <div className="paste">
        <textarea
          ref={inputRef}
          placeholder="Paste here..."
          onChange={handleMsg}
        ></textarea>
        <button
          className="btn"
          onClick={() => {
            AddPaste();
            onButtonClick();
            setMsg("");
          }}
        >
          Create new paste
        </button>
        <span className="idd">Your paste ID: {id}</span>
      </div>
      <div className="check_paste">
        <input
          onChange={handlePasteId}
          className="inpt"
          placeholder="Paste ID..."
        />
        <button className="ok" onClick={getPaste}>
          Check
        </button>
        <span className="paste1">{paste}</span>
      </div>
    </div>
  );
}

export default App;
