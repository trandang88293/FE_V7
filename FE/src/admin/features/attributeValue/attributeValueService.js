import axios from "axios"
import { base_url } from "../../utils/base_url"

const getAllAttributeValues = async (attributeId) => {
  const response = await axios.get(`${base_url}admin/attribute/${attributeId}/values`)
  return response.data
}

const attributeService = {
  getAllAttributeValues
  };
  
  export default attributeService;