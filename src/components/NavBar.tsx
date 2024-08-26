import React, { FC } from "react";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

export const NavBar: FC = () => {
  return (
    <header>
      <nav className="flex flex-row justify-between px-4 py-6 items-center">
        <h3>Hello Alice</h3>
        <Button size="icon" className="rounded-full">
          <Bell size={22} />
        </Button>
      </nav>
    </header>
  );
};
