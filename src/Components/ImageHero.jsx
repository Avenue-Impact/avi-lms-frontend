import React from "react";

const ImageHero = ({ children, imageSrc }) => {
  const style = {
    background: ` linear-gradient(45deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),  url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  return (
    <>
      <div
        className="footer min-h-screen px-6 py-8 text-left lg:px-12"
        style={style}
      >
        <div className="flex w-full items-center justify-center *:w-full">
          {children}
        </div>
      </div>
      {/*<div className="relative min-h-screen bg-white/80 text-center">
			<div className="absolute left-0 top-0 h-full w-full bg-black/70"></div>
			<div>
				<img src={imageSrc} className="min-h-screen w-full object-cover" />
				</div>
		</div> */}
    </>
  );
};

export default ImageHero;
