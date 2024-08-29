'use client';

import * as React from 'react';

const colors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'teal', label: 'Teal' },
];

export type ColorPickerColor = {
  value: string;
  label: string;
};

export const ColorPicker: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] =
    React.useState<ColorPickerColor | null>(null);

  return (
    <div className="relative w-[200px]">
      <button
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedColor ? (
          <div className="flex items-center">
            <div
              className="w-4 h-4 mr-2 rounded-full"
              style={{ backgroundColor: selectedColor.value }}
            />
            {selectedColor.label}
          </div>
        ) : (
          'Select color...'
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {colors.map((color) => (
              <button
                key={color.value}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => {
                  setSelectedColor(color);
                  setIsOpen(false);
                }}
              >
                <div
                  className="w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                {color.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
