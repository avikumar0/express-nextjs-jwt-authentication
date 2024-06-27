import axios from "axios";

const publicRequest = async (url, method = "GET", body = null, headers = {}) => {
  const config = {
    method,
    url,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    data: body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error occurred during request:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export default publicRequest;
