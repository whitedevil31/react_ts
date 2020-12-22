import React from "react";
import TextInput from "./TextInput";
import { Counter } from "./Counter";

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello !</h1>
      <Counter>
        {(count, setCount) => (
          <div>
            {count}
            <button onClick={() => setCount(count + 1)}>INCREMENT</button>
          </div>
        )}
      </Counter>
      <TextInput
        digits={5}
        text="nanda"
        handleChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

export default App;
