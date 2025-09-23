import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-12 bg-muted text-muted-foreground">
      <div className="container py-12 lg:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              Ready to build stronger teacher–parent connections?
            </h2>
            <p className="text-primary md:text-lg/relaxed lg:text-xl/relaxed">
              Stay informed, connected, and in sync with each parent
            </p>
          </div>

          <div>
            <Button
              variant="default"
              className="text-base p-0 transition-colors duration-300"
            >
              <Link
                href="/#pricing"
                className="flex items-center justify-center px-6 py-3 w-full"
              >
                Get Started{" "}
                <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
