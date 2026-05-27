import {QuizEntrance, QuizEntranceItem} from '~/components/motion/QuizEntrance';

type QuizProgressProps = {
  stepLabel: string;
  trailingLabel: string;
  progressPct: number;
  useEntrance: boolean;
};

export function QuizProgress({
  stepLabel,
  trailingLabel,
  progressPct,
  useEntrance,
}: QuizProgressProps) {
  const progressHeader = (
    <div className="flex justify-between items-end">
      <span className="font-label text-label-caps text-espresso tracking-widest">
        {stepLabel}
      </span>
      <span className="font-label text-label-caps text-ink-subtle">
        {trailingLabel}
      </span>
    </div>
  );

  const progressBar = (
    <div className="w-full h-[1px] bg-espresso/15 relative">
      <div
        className="ee-quiz__progress-line absolute top-0 left-0 h-[1px] bg-espresso"
        style={{width: `${progressPct}%`}}
      />
    </div>
  );

  if (useEntrance) {
    return (
      <QuizEntrance className="flex flex-col">
        <QuizEntranceItem>{progressHeader}</QuizEntranceItem>
        <QuizEntranceItem>{progressBar}</QuizEntranceItem>
      </QuizEntrance>
    );
  }

  return (
    <div className="flex flex-col">
      {progressHeader}
      {progressBar}
    </div>
  );
}
