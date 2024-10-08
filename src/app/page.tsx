import { Dashboard } from '@/components';
import { supabase } from '@/lib/supabase/client';

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Dashboard />
    </div>
  );
}
