import { Link } from "react-router-dom";

const FormDescriptionCard = ({
  title,
  text,
  link,
  btnText,
}: {
  title: string;
  text: string;
  link: string;
  btnText: string;
}) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-base sm:text-lg">{text}</p>
      </div>
      <Link to={link}>
        <button className="px-8 py-3 mt-4 bg-green-600 text-white text-lg font-semibold rounded-full transition duration-300 hover:bg-green-700 focus:outline-none">
          {btnText}
        </button>
      </Link>
    </div>
  );
};
export default FormDescriptionCard;
