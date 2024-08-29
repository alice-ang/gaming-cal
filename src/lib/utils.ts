import { type ClassValue, clsx } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
