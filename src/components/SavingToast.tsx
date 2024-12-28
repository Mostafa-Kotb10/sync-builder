
import { cn } from "@/lib/utils";

import Spinner from "./ui/spinner";

interface SavingToastProps {
  isSaving: boolean;
}

const SavingToast = ({ isSaving }: SavingToastProps) => {

  return (
    <div className={cn("absolute bottom-2 right-2 opacity-0 transition-opacity", 
        isSaving && "opacity-100"
    )}>
      <div className="rounded-md bg-white px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="dark:text-black">Saving</span>
          <Spinner className="dark:bg-black" />
        </div>
      </div>
    </div>
  );
};

export default SavingToast;
