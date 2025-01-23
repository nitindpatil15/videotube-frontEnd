import React, { useState } from "react";

const TruncateText = ({ text, maxWords }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(" ");
  const shouldTruncate = words.length > maxWords;

  const displayedText = shouldTruncate && !isExpanded
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;

  return (
    <div className="font-bold text-base text-white">
      {displayedText}
      {shouldTruncate && !isExpanded && (
        <span
          onClick={() => setIsExpanded(true)}
          className="text-blue-500 cursor-pointer"
        >
          {" "}
        </span>
      )}
      {isExpanded && (
        <span
          onClick={() => setIsExpanded(false)}
          className="text-blue-500 cursor-pointer"
        >
          {" "}
          Show less
        </span>
      )}
    </div>
  );
};

export default TruncateText;
