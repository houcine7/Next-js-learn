import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
export interface Meetup {
  id: string;
  title: string;
  image: string;
  address: string;
  desc: string;
}

const MeetupList = ({ meetups }: { meetups: Meetup[] }) => {
  const router = useRouter();

  const showDetails = (id: string): void => {
    //
    signIn();
    //router.push("/blogs/" + id);
  };

  return (
    <div className="flex justify-center gap-6 mt-10 flex-wrap max-w-5xl mx-auto">
      {meetups?.map((meetup) => {
        return (
          <div className="card" key={meetup?.id}>
            <Image
              src="/images/electronic.png"
              alt="meetup"
              className="h-60 w-full"
              width={1000}
              height={60}
            />
            <div>
              <h1 className="font-bold text-lg">{meetup?.title}</h1>

              <p className="description">{meetup?.address}</p>
            </div>

            <div className="mt-5">
              <button
                className="rounded-md text-sm font-bold px-2 py-2 bg-blue-600"
                onClick={() => showDetails(meetup.id)}
              >
                show details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeetupList;
