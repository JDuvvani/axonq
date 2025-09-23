import React from "react";
import {
  BellRing,
  Library,
  MessageSquareMore,
  ShieldCheck,
} from "lucide-react";

type Feature = {
  label: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    label: "Direct Messaging",
    description: "Teachers and parents can chat instantly",
    icon: <MessageSquareMore size={64} strokeWidth={1.5} />,
  },
  {
    label: "Class Updates",
    description: "Teachers post announcements, parents stay in the loop",
    icon: <BellRing size={64} strokeWidth={1.5} />,
  },
  {
    label: "Student Progress",
    description: "Share milestones, grades, and achievements",
    icon: <Library size={64} strokeWidth={1.5} />,
  },
  {
    label: "Safe & Secure",
    description: "Encrypted communication, role-based access",
    icon: <ShieldCheck size={64} strokeWidth={1.5} />,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="container flex flex-col z-0 items-center justify-center py-16 lg:py-28 transition-all animate-in"
    >
      <h2 className="font-bold text-primary uppercase mb-8">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto">
        {features.map((feature) => (
          <FeatureItem key={feature.label} {...feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureItem({ icon, label, description }: Feature) {
  return (
    <div className="relative p-6 rounded-2xl border-3 border-background/10 hover:border-primary/5 transition-colors group w-full cursor-context-menu">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center mx-auto w-24 h-24 rounded-full bg-linear-to-br from-primary/10 to-transparent group-hover:from-primary/20 transition-colors">
          <div className="text-primary">{icon}</div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl text-center font-bold">{label}</h3>
          <p className="text-center text-foreground/60 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
