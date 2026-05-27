import type {SubscriptionFrequencyId} from '~/lib/subscription/types';

type SubscriptionFrequencySelectorProps = {
  frequencies: Array<{id: SubscriptionFrequencyId; label: string}>;
  selected: SubscriptionFrequencyId;
  onChange: (frequency: SubscriptionFrequencyId) => void;
};

export function SubscriptionFrequencySelector({
  frequencies,
  selected,
  onChange,
}: SubscriptionFrequencySelectorProps) {
  return (
    <section className="section ee-subscription__freq-section">
      <div className="flex flex-col items-center">
        <span className="font-label text-label-caps text-espresso mb-4 tracking-widest">
          Select your delivery cadence
        </span>
        <div
          className="ee-subscription__freq inline-flex rounded-lg bg-surface-container p-1"
          role="radiogroup"
          aria-label="Delivery frequency"
        >
          {frequencies.map((frequency) => {
            const isSelected = selected === frequency.id;
            return (
              <label
                key={frequency.id}
                className={`ee-subscription__freq-option cursor-pointer rounded px-6 py-2 font-label text-label-caps tracking-widest transition-all duration-300 ${
                  isSelected
                    ? 'bg-espresso text-cream-silk'
                    : 'text-espresso hover:opacity-80'
                }`}
              >
                <input
                  checked={isSelected}
                  className="sr-only"
                  name="frequency"
                  onChange={() => onChange(frequency.id)}
                  type="radio"
                  value={frequency.id}
                />
                {frequency.label}
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
}
