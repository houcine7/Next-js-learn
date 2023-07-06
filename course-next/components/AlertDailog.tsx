import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import React from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";

type AlertDialog = {
  mainBtnText: string;
  title: string;
  desc: string;
  btnCancel: string;
  btnContinue: string;
  handleContinue: () => void;
  handleCancel: () => void;
};

const AlertDailogBTN = ({
  mainBtnText,
  title,
  desc,
  btnCancel,
  btnContinue,
  handleContinue,
  handleCancel,
}: AlertDialog) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">{mainBtnText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="absolute  z-50 bg-gray-900 rounded-md text-white p-4  max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-thin text-gray-50">
            {desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant={"destructive"} onClick={handleCancel}>
              {btnCancel}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              variant={"ghost"}
              className="bg-blue-700"
              onClick={handleContinue}
            >
              {btnContinue}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDailogBTN;
