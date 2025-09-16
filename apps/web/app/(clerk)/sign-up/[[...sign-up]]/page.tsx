import { SignUp } from "@clerk/nextjs";

export default async function Page(params: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await params.searchParams).token ?? null;
  return <SignUp signInUrl="/sign-in" unsafeMetadata={{ token }} />;
}
