import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

type Price = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const plans = [
  {
    name: "Basic",
    price: 0,
    description:
      "For teachers who want to stay connected with simple messaging and updates.",
    items: [
      "Unlimited messaging",
      "Class wall updates",
      "Student progress snapshots",
      "Secure parent–teacher communication",
    ],
    id: "basic",
    paymentLink: "",
    priceId: "",
  },
  {
    name: "Pro",
    price: 0,
    description:
      "For individual teachers who want advanced tools to manage classes and parent communication.",
    items: [
      "Everything in Basic",
      "Unlimited class groups",
      "File & media sharing",
      "Message translation",
      "Priority support",
    ],
    id: "pro",
    paymentLink: "",
    priceId: "",
  },
];

function PricingCard({
  id,
  name,
  price,
  description,
  items,
  paymentLink,
}: Price) {
  return (
    <div className="max-w-lg hover:scale-105 hover:transition-transform duration-300">
      <div
        className={cn(
          "flex flex-col h-full gap-4 lg:gap-8 p-8 border-1 border-primary/20 rounded-2xl",
          id === "pro" && "border-primary border-2 gap-5"
        )}
      >
        <div>
          <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
          <p className="text-base mt-2">{description}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">R{price}</p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-xs uppercase font-semibold">ZAR</p>
            <p className="text-sm">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed flex-1 text-base">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full text-base py-2 lg:py-3 transition-colors duration-300",
              id === "basic" && "to-accent hover:from-accent"
            )}
          >
            <span>Buy Now</span>
            <span>
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="container py-12 lg:pb-24">
      <div className="flex justify-center w-full">
        <h2 className="uppercase text-primary font-bold mb-8">Pricing</h2>
      </div>
      <div className="flex justify-center items-center flex-col lg:flex-row lg:items-stretch gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}
