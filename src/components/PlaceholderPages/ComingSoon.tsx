import React from "react";
import { ComingSoonProps } from "../../lib/types";

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  text = "We're working hard to bring this page to life. Stay tuned!",
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-950">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-100">{title}</h1>
        <p className="text-lg text-gray-100">{text}</p>
        <button className="px-6 py-3 bg-green-500 text-gray-100 font-medium rounded-md hover:bg-green-600 transition-colors">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
