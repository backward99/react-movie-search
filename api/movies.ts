import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const { API_END_POINT, API_KEY } = process.env;

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  params: { apikey: API_KEY },
});

export default async function (req: VercelRequest, res: VercelResponse) {
  const { data } = await axiosInstance({ params: { ...req.body } });

  res.status(200).json(data);
}
