import {Form, useNavigation} from 'react-router';
import type {SubscriptionTierId} from '~/lib/homepage/content';
import type {SubscriptionFrequencyId} from '~/lib/subscription/types';

type SubscribeButtonProps = {
  tierId: SubscriptionTierId;
  frequency: SubscriptionFrequencyId;
  label: string;
  highlighted?: boolean;
  disabled?: boolean;
  disabledReason?: string;
};

export function SubscribeButton({
  tierId,
  frequency,
  label,
  highlighted,
  disabled,
  disabledReason,
}: SubscribeButtonProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state !== 'idle' &&
    navigation.formAction?.includes('/cart/subscribe');

  const className = highlighted
    ? 'homepage-subscription-card__cta homepage-subscription-card__cta--highlighted'
    : 'homepage-subscription-card__cta';

  return (
    <Form method="post" action="/cart/subscribe">
      <input type="hidden" name="tierId" value={tierId} />
      <input type="hidden" name="frequency" value={frequency} />
      <button
        className={className}
        type="submit"
        disabled={disabled || isSubmitting}
        title={disabled ? disabledReason : undefined}
      >
        {isSubmitting ? 'Starting checkout…' : label}
      </button>
    </Form>
  );
}
