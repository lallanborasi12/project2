import API_BASE_URL from "../../config/constants";

// Function that returns an array of emails
export const getFreeEmails = async () => {
  const freeemail_api_url = API_BASE_URL + "/pre/prouseremail";
  const get_body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(freeemail_api_url, get_body);
    const result = await res.json();
    return result; // This is now returning the data after awaiting fetch
  } catch (error) {
    return []; // If there's an error, return an empty array
  }
};

// Now we can assign freeEmails asynchronously
export const freeEmails = (await getFreeEmails()) || [];
