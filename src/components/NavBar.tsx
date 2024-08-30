import React, { FC } from 'react';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

export const NavBar: FC = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between px-4 py-6 items-center">
        <Link href={'/'}>
          <h2>Title</h2>
        </Link>
        <div className="space-x-4">
          <ThemeToggle />
          <Button size="icon" className="rounded-full">
            <Bell size={22} />
          </Button>
        </div>
      </nav>
    </header>
  );
};
