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