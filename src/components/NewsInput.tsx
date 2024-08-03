"use client"
import { useState } from "react";

interface NewsInputProps {
  buttonText: string;
}

const NewsInput = ({ buttonText }: NewsInputProps): JSX.Element => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex self-center items-center w-fit justify-center bg-blue-600 rounded-full mx-4 my-2 ">
        <input
            type="email"
            placeholder=""
            className="outline-none bg-transparent px-4 py-2"
            value={email}
            onChange={handleInputChange}
        />
        <button className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold">
            {buttonText}
        </button>
    </div>
  );
};

export default NewsInput;
