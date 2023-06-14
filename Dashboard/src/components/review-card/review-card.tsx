import { ReviewCartComponents } from '@lyttledev-dashboard/components/review-card/components';
import { ChangeObject } from '@lyttledev-dashboard/contexts/app-hooks';

export interface ReviewCardProps {
  changeKey: string;
  change: ChangeObject;
}

export function ReviewCard({ changeKey, change }: ReviewCardProps) {
  const props = { changeKey, change };

  // If the type is a string, render the text review card.
  if (
    typeof change.current === 'string' &&
    typeof change.original === 'string' &&
    !change.store
  ) {
    return <ReviewCartComponents.StringReviewCard {...props} />;
  }

  // If the type is a string, render the text review card.
  if (
    typeof change.current === 'string' &&
    typeof change.original === 'string' &&
    change.store
  ) {
    return <ReviewCartComponents.SelectReviewCard {...props} />;
  }

  // If the type is a string, render the text review card.
  if (
    typeof change.current === 'boolean' &&
    typeof change.original === 'boolean'
  ) {
    return <ReviewCartComponents.BooleanReviewCard {...props} />;
  }

  return null;
}
