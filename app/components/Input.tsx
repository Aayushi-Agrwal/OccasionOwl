"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ChangeEventHandler, useState } from "react";

interface IInput {
  label: string;
  id?: string;
  name?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export const InputField: React.FC<IInput> = ({
  id,
  name,
  label,
  type,
  onChange,
}) => {
  return (
    <>
      <div className="relative">
        <input
          name={name}
          type={type}
          id={id}
          required
          className="block bg-inherit border-2 h-12 rounded-md w-[20rem] px-4 text-sm peer"
          placeholder=" "
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export const InputFieldPassword: React.FC<IInput> = ({ label, onChange }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        required
        className="block bg-inherit border-2 h-12 rounded-md w-[20rem] pl-4 pr-12 text-sm peer"
        placeholder=" "
        onChange={onChange}
      />
      <button
        className="bg-black red-500 absolute h-10 hover:scale-110 flex justify-center items-center px-2 py-1 right-1 top-1"
        onClick={(e) => {
          e.preventDefault(), setShowPassword(!showPassword);
        }}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
      <label
        htmlFor="password"
        className="absolute text-md text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-black px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
};
