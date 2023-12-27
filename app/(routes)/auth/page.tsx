"use client";

import { Auth } from "@/app/features/auth/components/authScreen";
import { withPublic } from "@/app/hooks/usePublicRoutes";

function Authpage() {
  return <Auth />;
}

export default withPublic(Authpage);
