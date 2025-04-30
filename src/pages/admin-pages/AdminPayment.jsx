import { AdminGraph } from "@/Components/admin-payment/admin-graph";
import EmptyPayment from "@/Components/admin-payment/EmptyPayment";
import PaymentTable from "@/Components/admin-payment/PaymentTable";
import { Skeleton } from "@/Components/ui/skeleton";
import { useFetchIncome } from "@/hooks/admin-payment/use-fetch-total-income";
import { useGetPayment } from "@/hooks/admin-payment/use-get-all-payment";
import AdminNav from "../../Components/admindashboard/AdminNav";
import { Card, CardContent, CardHeader } from "../../Components/ui/card";

function AdminPayment() {
  const timeFrame = [
    "Today",
    "Yesterday",
    "Last Week",
    "This week",
    "Last Month",
    "This Month ",
    "This Year",
  ];
  return (
    <div className="">
      <AdminNav />
      <main className="mt-3 px-6 py-7">
        <h1 className="text-2xl font-medium text-[#344054]">Dashboard</h1>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <TotalIncome />
              <div className="flex items-center gap-5">
                {timeFrame.map((time) => (
                  <span
                    key={time}
                    className="cursor-pointer rounded-[8.39px] px-3 py-1 text-sm capitalize text-[#1D2739] shadow-md hover:bg-[#CD0000] hover:text-white"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* <div className="flex h-[251px] items-center justify-center">
              graph
            </div> */}

            <AdminGraph />
          </CardContent>
        </Card>
        <div className="py-7">
          <PaymentDetails />
        </div>
      </main>
    </div>
  );
}

function PaymentDetails() {
  const { data, error, isLoading } = useGetPayment();

  if (isLoading) return <p>Loading..</p>;

  if (error)
    return <p>{error?.response?.data?.message ?? "Something went wrong"}</p>;

  if (data?.data?.data.length < 1)
    return (
      <>
        <EmptyPayment />
      </>
    );

  return <PaymentTable data={data} />;
}

function TotalIncome() {
  const { data, isLoading, error } = useFetchIncome();

  if (isLoading) return <Skeleton className={"w-10"} />;

  if (error) return <p>{error?.response?.data?.message ?? 0}</p>;

  return (
    <p className="text-3xl font-medium text-[#101928]"> £{data?.data?.data}</p>
  );
}

export default AdminPayment;
