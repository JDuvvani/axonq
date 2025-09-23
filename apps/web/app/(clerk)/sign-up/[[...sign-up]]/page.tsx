import { SignUp } from "@clerk/nextjs";

export default async function Page(params: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await params.searchParams).token ?? null;
  return (
    <section className="container flex justify-center py-16 lg:py-28">
      <SignUp signInUrl="/sign-in" unsafeMetadata={{ token }} />
    </section>
  );
}
