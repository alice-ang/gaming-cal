'use client';
import { Check, Copy, Send } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogProps } from '@radix-ui/react-dialog';
import { FC, useRef, useState } from 'react';

export const ShareCalendar: FC<DialogProps> = ({ ...props }) => {
  const [copied, setCopied] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (linkInputRef.current) {
      navigator.clipboard
        .writeText(linkInputRef.current.value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Share Calendar <Send className="ml-2" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share calendar link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              ref={linkInputRef}
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button size="sm" className="px-3" onClick={copyToClipboard}>
            {copied ? (
              <div>
                <span className="sr-only">Copied</span>
                <Check className="h-4 w-4 " />
              </div>
            ) : (
              <div>
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
