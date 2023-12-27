"use client";

import { LoginForm } from "@/app/features/login/components/loginForm";
import useFirebaseUser from "@/app/hooks/useFirebaseUser";
import { withPublic } from "@/app/hooks/usePublicRoutes";

function Login() {
  const { login } = useFirebaseUser();
  return (
    <main className="w-screen h-screen">
      <LoginForm
        title="Welcome back"
        buttonTitle="Log in"
        message="Don't have an account?"
        messageAction=" Sign up"
        action={login}
      />
    </main>
  );
}

export default withPublic(Login);
