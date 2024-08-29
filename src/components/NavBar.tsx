import React, { FC } from 'react';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const NavBar: FC = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between px-4 py-6 items-center">
        <h2>Title</h2>
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
