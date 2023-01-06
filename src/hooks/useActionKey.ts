import { useState, useEffect } from 'react';

const ACTION_KEY_DEFAULT = {
  alt: ['Alt', 'Alt'],
  ctrl: ['Ctrl ', 'Control']
} as const;

const ACTION_KEY_APPLE = {
  alt: ['⌥', 'Option'],
  ctrl: ['⌘', 'Command']
} as const;

type ActionKey = typeof ACTION_KEY_DEFAULT | typeof ACTION_KEY_APPLE;

export function useActionKey() {
  const [actionKey, setActionKey] = useState<ActionKey>(ACTION_KEY_DEFAULT);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE);
      } else {
        setActionKey(ACTION_KEY_DEFAULT);
      }
    }
  }, []);

  return actionKey;
}
