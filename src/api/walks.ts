import axios from "axios";
import { Walk } from "../features/walks/walksSlice";
import { API_URL } from "./index";

export async function fetchLastWalk() {
  const res = await axios.get(`${API_URL}/walks/last`); 
  return res.data;
}

export async function fetchTopWalker() {
  const res = await axios.get(`${API_URL}/walks/topWalker`);
  return res.data;
}

export async function fetchLastActivity(dogName: string, activity: "pee" | "poop") {
  const res = await axios.get(`${API_URL}/walks/activity/${dogName}/${activity}`);
  return res.data; 
}

export async function fetchWalks() {
  const res = await axios.get(`${API_URL}/walks`); 
  return res.data;
}

export async function createWalk(walk: Omit<Walk, "id">) {
  const res = await axios.post(`${API_URL}/walks`, {
    ...walk,
    date: new Date(walk.date).toISOString() // make sure the backend gets ISO format
  });
  return res.data; // backend should return the created walk (including `id`)
}

export function subscribeToWalks(callback: (walks: Walk[]) => void) {
  const interval = setInterval(async () => {
    const res = await fetch(`${API_URL}/walks`);
    const data = await res.json();
    callback(data);
  }, 5000); // every 5 seconds

  return () => clearInterval(interval); // cleanup
}