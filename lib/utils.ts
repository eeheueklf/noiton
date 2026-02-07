import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ko,
  });
}