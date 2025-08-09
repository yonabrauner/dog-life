import axios from "axios";
import { API_URL } from ".";

export async function fetchdogs() {
  const res = await axios.get(`${API_URL}/dogs`); 
  return res.data;
}