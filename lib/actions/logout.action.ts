"use server";

// import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function logout() {
  await deleteSession();
  redirect("/");
}
