import React from "react";

const InfoGrid = ({ title, description, items, showDividers = false }) => {
  return (
    <div className="py-16 px-4 md:px-8 lg:px-14 max-w-[1440px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]">
          {title}
        </h2>
        {description && (
          <p className="text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${showDividers ? 'gap-x-16' : 'gap-x-12 gap-y-12'}`}>
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className={`flex gap-6 ${showDividers ? 'border-b border-gray-100 py-8 items-start' : 'items-start'}`}
            >
              {Icon && (
                <div className="shrink-0 mt-1">
                  <Icon className="w-8 h-8 text-[#1a365d]" strokeWidth={1.5} />
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoGrid;
