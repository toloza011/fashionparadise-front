import React from "react";

const Input = () => {
  return (
    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
      <input
        type="text"
        name="username"
        id="username"
        autocomplete="username"
        className="block flex-1 border-0 bg-transparent py-1.5 pl-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        placeholder="janesmith"
      />
    </div>
  );
};

export default Input;
