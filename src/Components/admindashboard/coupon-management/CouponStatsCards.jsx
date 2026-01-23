import { ClipLoader } from "react-spinners";

const CouponStatsCards = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <ClipLoader size={40} color="#CC1747" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Coupons",
      value: stats?.total || 0,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Coupons",
      value: stats?.active || 0,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Expired Coupons",
      value: stats?.expired || 0,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Total Usage",
      value: stats?.totalUsage || 0,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-lg border border-gray-200 p-6 ${card.bgColor}`}
        >
          <p className="text-sm font-medium text-gray-600">{card.title}</p>
          <p className={`mt-2 text-3xl font-bold ${card.textColor}`}>
            {card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CouponStatsCards;
