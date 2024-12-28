import { generateSummary } from "@/actions/gemini-actions";
import LoadingButton from "@/components/LoadingButton";
import { toast, useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";

import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

const GenerateSummaryButton = ({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) => {
  const {} = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCLick = async () => {
    // TODO: Block for non-premium

    try {
      setIsLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton
      isLoading={isLoading}
      variant="outline"
      type="button"
      onClick={handleCLick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
};

export default GenerateSummaryButton;
