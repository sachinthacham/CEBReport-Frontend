interface Props {
  topic: string;
  image: string;
}

const LandingPageCard = ({ topic, image }: Props) => {
  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-xl overflow-hidden mx-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className=" h-40 sm:h-48 md:h-56 lg:h-40 overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-100 py-4">
        <button className="w-full px-4 font-bold text-[#800000] rounded-md">
          {topic}
        </button>
      </div>
    </div>
  );
};

export default LandingPageCard;
