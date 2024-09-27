import React from 'react';
import CustomButtonProps from './interface';

function CustomButton({ className, handleOnClick, text, lineClass }: CustomButtonProps) {
  return (
    <div className="flex flex-col w-full ">
      <button type="button" className={className} onClick={handleOnClick}>
        {text}
      </button>
      <div className={lineClass} />
    </div>
  );
}

export default CustomButton;
