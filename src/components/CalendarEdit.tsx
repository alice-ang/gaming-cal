'use client';
import { Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from '@radix-ui/react-select';
import { DatePickerRange } from './DatePickerRange';

export const CalendarEdit: FC<DialogProps> = ({ ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Edit className="mr-2" size={18} />
          Edit calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit current calendar</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div>
          <DatePickerRange />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
