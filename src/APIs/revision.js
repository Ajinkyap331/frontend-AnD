import axios from "axios";

export const getRevision = async (data) => {
  try {
    const response = await axios.post(
      "inverntoryManagment/api/v1/public/revision/getOne",
      data
    );

    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};

export const updateRevision = async (data, id) => {
  try {
    const response = await axios.put(
      `inverntoryManagment/api/v1/public/revision/update/${id}`,
      data
    );
    return {
      type: "success",
      data: response.data,
    };
  } catch (err) {
    return {
      type: "error",
      message: "Network Error",
    };
  }
};
