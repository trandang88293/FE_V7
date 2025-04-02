import axios from "axios"
import { base_url } from "../../utils/base_url"

const getAllAttributes = async () => {
  const response = await axios.get(`${base_url}admin/attribute/get-all`)
  return response.data
}

const attributeService = {
  getAllAttributes
  };
  
  export default attributeService;