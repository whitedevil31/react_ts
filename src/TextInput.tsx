import React, { useState, useRef } from "react";
interface Props {
  text: string;
  digits: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface hooks {
  text: string;
  value?: number;
  // ? adds optional value
}
const TextInput: React.FC<Props> = (Props) => {
  const [info, setInfo] = useState<hooks>({ text: "helo" });

  const inputRef = useRef<HTMLInputElement>(null);
  //pro tip to use use ref

  return (
    <div>
      <button>INCREASE</button>
      {/* <input type="text" placeholder="enter your text" /> */}
      <input
        type="text"
        placeholder="enter your ref"
        ref={inputRef}
        onChange={Props.handleChange}
      />
    </div>
  );
};

export default TextInput;
