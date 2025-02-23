import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // State variables for password length, inclusion of numbers and special characters
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // Ref hook to reference the password input field
  const passwordRef = useRef(null);

  /**
   * Generates a random password based on the selected options.
   * Includes uppercase, lowercase, numbers, and special characters based on user preferences.
   */
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@$#%^&*(){}[]~";
    
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, setPassword, charAllowed]);

  /**
   * Copies the generated password to the clipboard.
   */
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  // useEffect to regenerate the password whenever settings change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="max-w-md w-full mx-auto shadow-md rounded-lg my-8 bg-gray-800 p-4">
      <h1 className="text-white text-center text-lg font-bold mb-4">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden bg-white mb-4 text-black">
        {/* Password display input field */}
        <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        {/* Copy button to copy password to clipboard */}
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-500 text-white px-3 py-1 shrink-0 rounded-md"
          style={{ backgroundColor: "blue" }}
        >
          Copy
        </button>
      </div>

      {/* Controls for password settings */}
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          {/* Password length slider */}
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label> Length: {length}</label>
        </div>

        {/* Checkbox to include numbers in password */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        {/* Checkbox to include special characters in password */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
