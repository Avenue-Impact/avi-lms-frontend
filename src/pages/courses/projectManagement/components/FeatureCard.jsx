export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
    <div className={`${iconBgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
