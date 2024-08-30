import { LoginForm } from '@/components';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="constraints">
      <LoginForm />
      {searchParams.message && (
        <div className="text-sm font-medium text-destructive">
          {searchParams.message}
        </div>
      )}
    </div>
  );
}
