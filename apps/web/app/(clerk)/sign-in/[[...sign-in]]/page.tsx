import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="container flex justify-center py-16 lg:py-28">
      <SignIn signUpUrl="/sign-up" />
    </section>
  );
}
