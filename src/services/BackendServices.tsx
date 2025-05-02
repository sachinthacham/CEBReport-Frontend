import axios from "axios";

const BASE_URL = "http://localhost:5131/";

export const fetchProvinceData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/provinces/getall`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchAreaData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/areas/getall`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchCustomerData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}Customers/area/chilaw`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
