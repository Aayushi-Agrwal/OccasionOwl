import { LinkButton } from "@/app/components/Button";

export const Auth = () => {
  return (
    <main className="flex">
      <div className="flex flex-col w-3/5 items-center justify-center h-screen bg-gradient-to-r from-sky-700 to-indigo-800">
        <div className="fixed top-4 left-12 text-2xl bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-200 inline-block text-transparent bg-clip-text">
          OccasionOwl
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-medium tracking-wide mb-4">
            <div className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white text-white">
              Welcome to OccasionOwl
              <span className="text-sky-400 text-6xl">.</span>
            </div>
          </h1>
          <p className="bg-gradient-to-r from-blue-200 via-sky-400 to-indigo-100 inline-block text-transparent bg-clip-text text-lg">
            The ultimate event planning chat app. Connects users effortlessly,
            enabling seamless collaboration. Simplifies planning for all
            occasions. Enhance your events with OccasionOwl's intuitive
            interface and real-time coordination features. Your perfect party is
            just a chat away.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-2/5">
        <h1 className="text-3xl font-medium tracking-wide pb-6">
          Get started
          <span className="text-sky-400 text-6xl">.</span>
        </h1>

        <div className="flex gap-8">
          <LinkButton name="Log in" href="/auth/login" />
          <LinkButton name="Sign up" href="/auth/signup" />
        </div>
      </div>
    </main>
  );
};
