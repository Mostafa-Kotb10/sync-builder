import { ResumeSectionProps } from "@/lib/types";
import React from "react";

const SummarySection = ({ resumeData }: ResumeSectionProps) => {
  const { summary, colorHex, borderStyle } = resumeData;
  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional Profile
        </p>

        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
};

// break-inside-avoid makes sure that when we print this resume it will not break this div. So there will be no headlien in One page and Summary into another page.

export default SummarySection;
