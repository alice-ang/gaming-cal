import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { SelectProps } from '@radix-ui/react-select';

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'teal', label: 'Teal' },
];

export const ColorPicker: FC<SelectProps> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        {!value && (
          <div className="w-4 h-4 rounded-full border bg-background mr-2" />
        )}
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {colorOptions.map((color) => (
          <SelectItem key={color.value} value={color.value}>
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: color.value }}
              />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
