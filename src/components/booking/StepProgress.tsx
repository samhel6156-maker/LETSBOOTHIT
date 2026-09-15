// src/components/booking/StepProgress.tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Event", "Details", "Confirm"];

export function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 flex items-center gap-0">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const active = stepNum === currentStep;
        const done = stepNum < currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                  done && "border-amber-500 bg-amber-500 text-black",
                  active && "border-amber-500 bg-amber-500/10 text-amber-400",
                  !active &&
                    !done &&
                    "border-white/15 bg-transparent text-gray-600",
                )}
              >
                {done ? <Check className="size-3.5" /> : stepNum}
              </div>
              <span
                className={cn(
                  "whitespace-nowrap text-xs font-medium",
                  active
                    ? "text-amber-400"
                    : done
                      ? "text-gray-400"
                      : "text-gray-600",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 mb-5 h-px flex-1 transition-colors",
                  done ? "bg-amber-500/60" : "bg-white/10",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
