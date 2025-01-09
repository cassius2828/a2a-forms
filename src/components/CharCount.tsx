const CharCount = ({
  length,
  maxCharCount,
}: {
  length: number;
  maxCharCount: number;
}) => {
  const nearCharLimit: number = maxCharCount * 0.9;
  return (
    <span
      className={`${
        length > nearCharLimit
          ? "text-red-500"
          : "text-neutral-100"
      } text-sm`}
    >
      {length}/{maxCharCount}
    </span>
  );
};

export default CharCount;
