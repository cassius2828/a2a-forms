export const formatDate = (dateString: string) => {
  const date = new Date(dateString); // Convert the string to a Date object
  return date.toLocaleDateString("en-US"); // Format as MM/DD/YYYY
};

export const getStatusClass = (status: "pending" | "approved" | "rejected") => {
  switch (status) {
    case "approved":
      return "bg-green-600 text-white";
    case "rejected":
      return "bg-red-600 text-white";
    case "pending":
      return "bg-yellow-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isTokenExpired(token: string, expTimeValue: number) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const expTime = decoded.iat + expTimeValue * 60;
  return currentTime > expTime;
}
