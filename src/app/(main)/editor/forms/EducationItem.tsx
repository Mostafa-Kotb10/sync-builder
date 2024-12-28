import DateField from "@/components/DateField";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CSS } from "@dnd-kit/utilities";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EducationValues } from "@/lib/validation";
import { useSortable } from "@dnd-kit/sortable";
import { GripHorizontal } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EductionItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ id, form, index, remove }: EductionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className={cn(
        "space-y-3 rounded-md border bg-background p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span>Education {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground"
          {...attributes}
          {...listeners}
        />
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <DateField
          control={form.control}
          name={`educations.${index}.startDate`}
          index={index}
          label="Start date"
        />
        <DateField
          control={form.control}
          name={`educations.${index}.endDate`}
          index={index}
          label="End date"
        />
      </div>
      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};

export default EducationItem;
