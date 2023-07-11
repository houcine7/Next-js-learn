import Image from "next/image";
import { useState } from "react";

type CustomSelectProps = {
  optionsList: string[];
  setSelectValue: (value: string) => void;
};

const CustomSelect = ({ optionsList, setSelectValue }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Selected item");

  const handleOptionSelection = (option: string) => {
    setIsOpen(false);
    setSelectValue(option);
    setSelectedOption(option);
  };

  return (
    <div
      className={`flex flex-col justify-center relative text-gray-900 px-4 h-10 rounded-md ${
        isOpen ? " border-blue-700 " : " border-gray-500 "
      } bg-gray-100 border `}
    >
      <div>
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="cursor-pointer">{selectedOption}</p>
          <Image
            className="cursor-pointer"
            src={"/images/arrow-down.png"}
            alt="arrow-down"
            width={15}
            height={15}
          />
        </div>

        {isOpen && (
          <div className="absolute w-full right-0 left-0 overflow-x-auto max-h-40 p-3 transition-all ease-in duration-500 bg-gray-300 rounded top-11">
            <ul>
              {optionsList.map((option: string) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelection(option)}
                  className="w-full py-1 px-2 hover:bg-blue-400 cursor-pointer transition-all duration-500"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
