import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";
import useAutoSaveResume from "@/hooks/useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import SavingToast from "@/components/SavingToast";

interface EditorBodyProps {
  currentStep: string;
  setCurrentStep: (key: string) => void;
  showSmResumePreview: boolean;
  resumeData: ResumeValues;
  setResumeData: (values: ResumeValues) => void;
}

const EditorBody = ({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  resumeData,
  setResumeData,
}: EditorBodyProps) => {
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges)

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 grid w-full grid-cols-1 divide-x md:grid-cols-2">
          <div
            className={cn(
              "space-y-6 overflow-y-auto p-3 md:block",
              showSmResumePreview && "hidden",
            )}
          >
            <BreadCrumbs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>

        <SavingToast isSaving={isSaving} />
      </main>
    </>
  );
};

export default EditorBody;
