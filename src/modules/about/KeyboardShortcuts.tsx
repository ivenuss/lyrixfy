import React from 'react';
import { ShortcutLabel } from '~/modules/about/ShortcutLabel';
import { useActionKey } from '~/hooks/useActionKey';

export const KeyboardShortcuts: React.FC = () => {
  const actionKey = useActionKey();

  const ctrlKey = actionKey.ctrl[0];
  const altKey = actionKey.alt[0];

  return (
    <section>
      <h3 className="mb-4 text-lg font-bold dark:text-primary-100">
        Keyboard Shortcuts
      </h3>
      <div className="flex max-w-sm flex-col space-y-2.5">
        <ShortcutLabel label="Open search menu" keys={['Ctrl', 'K']} />
        <ShortcutLabel
          label="Paste image from clipboard"
          keys={[ctrlKey, 'V']}
        />
        <ShortcutLabel label="Toggle theme" keys={['Ctrl', altKey, 'D']} />
        <ShortcutLabel
          label="Copy image to clipboard"
          keys={[ctrlKey, 'Shift', 'C']}
        />
        <ShortcutLabel label="Export as PNG" keys={[ctrlKey, 'Shift', 'E']} />
        <ShortcutLabel label="Export as JPG" keys={[ctrlKey, 'Shift', 'X']} />
        <ShortcutLabel label="Export as SVG" keys={[ctrlKey, 'Shift', 'S']} />
      </div>
    </section>
  );
};
