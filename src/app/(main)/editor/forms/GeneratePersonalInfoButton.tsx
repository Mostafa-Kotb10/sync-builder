import { generatePersonalInfo } from "@/actions/gemini-actions";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  GeneratePersonalInfoInput,
  generatePersonalInfoSchema,
  PersonalInfoValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface GeneratePersonalInfoButtonProps {
  onPersonalInfoGenerated: (info: PersonalInfoValues) => void;
}

const GeneratePersonalInfoButton = ({
    onPersonalInfoGenerated,
}: GeneratePersonalInfoButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        type="button"
        // TODO: Block for non premium
        onClick={() => setShowDialog(true)}
      >
        <WandSparklesIcon className="size-4" />
        smart fill (AI)
      </Button>
      <InputDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onPersonalInfoGenerated={(workExperience) => {
            onPersonalInfoGenerated(workExperience);
          setShowDialog(false);
        }}
      />
    </>
  );
};

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPersonalInfoGenerated: (info: PersonalInfoValues) => void;
}

const InputDialog = ({
  open,
  onOpenChange,
  onPersonalInfoGenerated,
}: InputDialogProps) => {
  const { toast } = useToast();
  const form = useForm<GeneratePersonalInfoInput>({
    resolver: zodResolver(generatePersonalInfoSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (input: GeneratePersonalInfoInput) => {
    try {
      const response = await generatePersonalInfo(input);
      onPersonalInfoGenerated(response);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Personal Info</DialogTitle>
          <DialogDescription>
            Talk about your self and the AI will fill your form.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "My name is Adam I live in USA nashville."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratePersonalInfoButton;
