export const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Convert the string to a Date object
    return date.toLocaleDateString("en-US"); // Format as MM/DD/YYYY
  };