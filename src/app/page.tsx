import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex min-h-screen items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:gap-12 md:text-start">
      <div className="max-w-prose space-y-3">
        <Image
          src={logo}
          className="mx-auto md:ms-0"
          width={150}
          height={150}
          alt="Logo"
        />

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create a{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in Minutes
        </h1>
        <p className="text-lg text-gray-500">
          Our <span className="font-bold">AI resume builder</span> helps you design a profesional resume even if you&apos;r not very smart.
        </p>
        <Button size="lg" variant="premium" asChild>
          <Link href="/resumes">
          Get Started</Link>
        </Button>
        {/* <AnimatedButton /> */}
      </div>
    </main>
  );
};

export default page;
