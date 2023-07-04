const SingleFeature = ({ feature }) => {
    return (
      <div className="w-full mt-6">
        <div className="wow fadeInUp" data-wow-delay=".15s">
         
          <h3 className=" flex mb-5 text-xl font-bold text-blue-500 sm:text-2xl lg:text-xl xl:text-2xl gap-3">
          {feature.icon} {feature.title}
          </h3>
          <p className="pr-[10px] text-base font-medium leading-relaxed text-gray-500">
            {feature.paragraph}
          </p>
        </div>
      </div>
    );
  };
  
  export default SingleFeature;