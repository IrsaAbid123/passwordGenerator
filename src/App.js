import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += ',./;[]-=|<>?:"|}{_+!@#$%^&*()';
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    console.log(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  const passwordCopied = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numbersAllowed, passwordGenerator]);

  return (
    <div className="shadow-md bg-slate-500 my-4 mx-auto max-w-lg w-full rounded-md text-xl">
      <h1 className="text-white text-center">Password generator</h1>
      <div className="flex items-center justify-center overflow-hidden my-2 mx-4">
        <input
          type="text"
          placeholder="Password"
          value={password}
          readOnly
          ref={passwordRef}
          className="pl-1 py-2 outline-none rounded-l-md text-orange-400 w-full "
        />
        <button 
        onClick={passwordCopied}
        className=" text-white rounded-r-md bg-blue-600 py-2 px-2">
          Copy
        </button>
      </div>
      <div className="py-2 px-1 text-white gap-x-2 text-md flex items-center justify-center">
        <div className="gap-x-2 flex items-center">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(parseInt(e.target.value));
            }}
          />
          <label>length: {length}</label>
        </div>
        <div className="gap-x-2 flex items-center">
          <label>Character</label> 
          <input
            type="checkbox"
            checked={charAllowed} 
            onChange={(e) => setCharAllowed(e.target.checked)} 
            className="cursor-pointer"
          />
        </div>
        <div className="gap-x-2 flex items-center">
          <label>Numbers</label>
          <input
            type="checkbox"
            checked={numbersAllowed} 
            onChange={(e) => setNumberAllowed(e.target.checked)} 
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
