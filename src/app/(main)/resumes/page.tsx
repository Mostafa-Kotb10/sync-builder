import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import ResumeItem from "./ResumeItem";

export const metadata: Metadata = {
  title: "Your resumes",
};

const ReusmePage = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authorized");
  }

  // Promise.all allows you to preform two Promises in parallel
  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  //TODO: Check quota for non-premium users.

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
      <div className="space-y-1">
        <h1>Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map(resume => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
};

export default ReusmePage;
