"use client";

import Authpage from "@/app/(routes)/auth/page";
import useFirebaseUser from "./hooks/useFirebaseUser";
import { usePathname } from "next/navigation";

const dotenv = require("dotenv");
dotenv.config();

export default function Home() {
  return <Authpage />;
}
