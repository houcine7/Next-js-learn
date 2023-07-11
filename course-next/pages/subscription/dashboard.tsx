import CardSubscriptionDashBoard, {
  PropCardType,
} from "@/components/CardSubscriptionDashBoard";
import CustomerDetails from "@/components/CustomerDetails";
import CustomerDetailsGridRow from "@/components/CustomerDetailsGridRow";
import InvoicesTable from "@/components/InvoicesTable";
import Image from "next/image";

const cardItems: PropCardType[] = [
  {
    title: "Subscription",
    briefDesc: "Pro plan",
    count: 2,
    countType: "Mounths",
    widthICon: 35,
    heightIcon: 35,
    color: "green",
    imageUrl: "/images/schedule.png",
  },
  {
    title: "Total spent",
    briefDesc: "Spendings",
    count: 22,
    countType: "£",
    widthICon: 40,
    heightIcon: 40,
    color: "red",
    imageUrl: "/images/remuneration.png",
  },
  {
    title: "Total storage",
    briefDesc: "100 mb is free",
    count: 100,
    countType: "Mb",
    widthICon: 40,
    heightIcon: 40,
    color: "green",
    imageUrl: "/images/database-storage.png",
  },
  {
    title: "Total partners",
    briefDesc: "1 free member",
    count: 3,
    countType: "Members",
    widthICon: 40,
    heightIcon: 40,
    color: "green",
    imageUrl: "/images/partners.png",
  },
];

const dashboard = () => {
  return (
    <section className="max-w-4xl py-8 px-4 my-10 mx-auto bg-gray-100">
      <div className="mb-8">
        <h1 className="font-bold text-xl tracking-wider text-gray-900 text-center">
          Welcome to your subscription dashboard for project prj_1111111
        </h1>
      </div>

      <div className="dash-header flex items-stretch gap-10 justify-between mb-20">
        {cardItems.map((item) => (
          <CardSubscriptionDashBoard
            key={item.title}
            count={item.count}
            briefDesc={item.briefDesc}
            countType={item.countType}
            title={item.title}
            widthICon={item.widthICon}
            heightIcon={item.heightIcon}
            color={item.color}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>

      <div className="">
        <InvoicesTable />
        <CustomerDetails />
      </div>
    </section>
  );
};

export default dashboard;
