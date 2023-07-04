const SectionTitle = ({ title, paragraph, center, width, mb }) => {
    return (
      <>
        <div
          className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
          data-wow-delay=".1s"
          style={{ maxWidth: width, marginBottom: mb }}
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-blue-300 sm:text-4xl md:text-[45px]">
            {title}
          </h2>
          <p className="text-base font-medium !leading-relaxed text-body-color md:text-lg">
            {paragraph}
          </p>
        </div>
      </>
    );
  };
  
  export default SectionTitle;