import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container flex flex-col lg:flex-row items-center lg:items-start justify-center py-16 lg:py-28 transition-all animate-in">
      <div className="flex flex-col items-center">
        <h1 className="font-bold pb-6 text-center">
          Stay <span className="text-primary">Connected</span>. Empower Students
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
          A simple platform for teachers and parents to communicate, share
          updates, and support student growth in real-time
        </h2>

        <Link
          href="/#pricing"
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex gap-2 items-center mt-6 text-base sm:text-lg lg:text-xl sm:py-4 px-8 sm:px-10 lg:px-12 lg:mt-16 shadow-lg transition-colors duration-300"
          )}
        >
          <span>Try AxonQ</span>
          <span>
            <ArrowRight className="animate-pulse" />
          </span>
        </Link>
      </div>
      <div className="relative w-md lg:w-2xl h-[500px] mt-12 lg:mt-0 lg:ml-10 border-1"></div>
    </section>
  );
}
