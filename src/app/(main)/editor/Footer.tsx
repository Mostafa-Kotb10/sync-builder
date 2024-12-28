import Link from "next/link";

import { Button } from "@/components/ui/button";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (key: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
};

const Footer = ({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
}: FooterProps) => {
  const prevStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  );
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  );

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={prevStep ? () => setCurrentStep(prevStep.key) : undefined}
            disabled={!prevStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep.key) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>

        <Button
          className="md:hidden"
          variant="outline"
          size="icon"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
