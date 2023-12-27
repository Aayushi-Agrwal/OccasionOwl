"use client";

import { LoginForm } from "@/app/features/login/components/loginForm";
import useFirebaseUser from "@/app/hooks/useFirebaseUser";
import { withPublic } from "@/app/hooks/usePublicRoutes";

function Signup() {
  const { signup } = useFirebaseUser();
  return (
    <main className="w-screen h-screen">
      <LoginForm
        title="Create your account"
        buttonTitle="Sign up"
        message="Already have an account?"
        messageAction=" Log in"
        action={signup}
      />
    </main>
  );
}

export default withPublic(Signup);
