import MeetupDetails from "@/components/MeetupDetails";
import { Meetup } from "@/components/MeetupList";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Blog = (props: { meetup: Meetup }) => {
  const router = useRouter();

  const blogNumber: string =
    typeof router.query.blogsId === "string" ? router.query.blogsId : "";

  console.log(blogNumber);

  return (
    <div>
      <MeetupDetails meetup={props.meetup} />
      <Link href={"/"}>Go to home page</Link>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          blogsId: "6426f651f8edbc418e3f88da",
        },
      },
      {
        params: {
          blogsId: "6426f67bf8edbc418e3f88db",
        },
      },
      {
        params: {
          blogsId: "64908e966d2b5074f8d08c47",
        },
      },
    ],
  };
}

export async function getStaticProps() {
  //hello from other side ....

  //
  return {
    props: {
      meetup: {
        title: "this is title",
        desc: "this is desc",
        image: "image pic here",
        address: "this is an address",
      },
    },
  };
}

export default Blog;
