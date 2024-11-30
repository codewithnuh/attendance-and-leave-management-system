"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession } from "@/lib/session";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await deleteSession();
  return res.redirect("/login");
}
