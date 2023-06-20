import { Db, Document, MongoClient } from "mongodb";
import MeetupList from "@/components/MeetupList";
import React, { Fragment } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellRing, Check, Terminal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
const BLOGS = [
  { id: "1", address: "adreesss 1 abd ipsum", title: "Title 1", image: ".." },
  { id: "2", address: "adreesss 2 testing", title: "Title 2", image: ".." },
  { id: "3", address: "adreesss 3 testing ", title: "Title 3", image: ".." },
];
const DUMMY_NOTIFICATIONS = [
  {
    id: "1",
    title: "Title 1",
    desc: "some dummy notification desscription: a transaction finished succcessfully",
  },
  {
    id: "2",
    title: "Title 2",
    desc: "user x liked tyour story",
  },
  {
    id: "3",
    title: "Title 3",
    desc: "some dummy information: a transaction finished succcessfully",
  },
];

const Home = ({ meetups }: { meetups: any }) => {
  return (
    <Fragment>
      <MeetupList meetups={meetups} />

      <div className="my-8 bg-gray-800 ">
        <div className="max-w-5xl mx-auto py-8">
          <Alert variant={"destructive"} title="Heads up!">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>

          <Alert variant={"default"} className="mt-2 bggray-500">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>

        <div className="px-8 flex gap-8 justify-center">
          {/*  */}

          <p className="text-red-600 font-bold"> do you want to continue</p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="default">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="absolute  z-50 bg-gray-900 rounded-md text-white p-4  max-w-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold text-xl">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="font-thin text-gray-50">
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Button variant={"destructive"}>Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <Button variant={"ghost"} className="bg-blue-700">
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="my-8 flex justify-center">
          <Card className={"w-[380px]"}>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <BellRing />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Push Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to device.
                  </p>
                </div>
                <Switch />
              </div>
              {DUMMY_NOTIFICATIONS.map((notif) => (
                <div key={notif.id}>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-pink-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notif.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notif.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-pink-900 hover:bg-pink-500">
                <Check className="mr-2 h-4 w-4 text-gray-900" /> Mark all as
                read
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/next-tutorail"
  );

  const db: Db = client.db();
  const nextTutoCollection = db.collection("next-tutorail");

  const blogs: Document[] = await nextTutoCollection.find().toArray();

  return {
    props: {
      meetups: blogs.map((doc) => {
        return {
          title: doc.title,
          address: doc.address,
          image: doc.image,
          id: doc._id.toString(),
        };
      }),
    },
    revalidate: 60,
  };
}

export default Home;
