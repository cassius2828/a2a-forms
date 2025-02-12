import { ClassesRestOp, StatusType } from "./types";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Convert the string to a Date object
  return date.toLocaleDateString("en-US"); // Format as MM/DD/YYYY
};

export const getStatusClass = (status: StatusType) => {
  switch (status) {
    case "approved":
      return "bg-green-500 text-white";
    case "rejected":
      return "bg-red-500 text-white";
    case "pending":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export function classNames(...classes: ClassesRestOp) {
  return classes.filter(Boolean).join(" ");
}

export function isTokenExpired(token: string, expTimeValue: number) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const expTime = decoded.iat + expTimeValue * 60;
  return currentTime > expTime;
}
