import React from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = "An error occurred. Please try again." }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1 1 0 11-1.414 1.414L10 11.415l-2.935 2.935a1 1 0 01-1.414-1.414l2.935-2.935L5.65 6.485a1 1 0 011.414-1.414L10 8.585l2.935-2.935a1 1 0 111.414 1.414L11.415 10l2.935 2.935z"/>
        </svg>
      </span>
    </div>
  );
};

export default ErrorMessage;
