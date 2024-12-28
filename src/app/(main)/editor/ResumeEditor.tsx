"use client";

import Footer from "./Footer";
import EditorBody from "./EditorBody";
import EditorHeader from "./EditorHeader";
import { steps } from "./steps";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null
}

const ResumeEditor = ({resumeToEdit}: ResumeEditorProps) => {
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );
  
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex grow flex-col">
      <EditorHeader />
      <EditorBody
        resumeData={resumeData}
        setResumeData={setResumeData}
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
      />
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
      />
    </div>
  );
};

export default ResumeEditor;
