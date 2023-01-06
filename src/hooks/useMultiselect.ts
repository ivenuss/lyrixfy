/* eslint-disable @typescript-eslint/no-explicit-any */
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';
import { useCallback, useMemo, useState } from 'react';

export const getNextAndPrevious = <P extends { id: any }>(
  initialArr: Array<P>,
  selectedArr: Array<P>
) => {
  const indices = selectedArr.map((a) =>
    initialArr.findIndex((b) => a.id === b.id)
  );
  const minIndex = Math.min(...indices);

  const firstItem = initialArr[minIndex];
  const indexOfFirst = initialArr.findIndex((i) => i.id === firstItem?.id);

  if (indexOfFirst === -1) return [];

  const previous = initialArr[indexOfFirst - 1];
  const next = initialArr[indexOfFirst + selectedArr.length];

  return compact([previous, next]); // Removes item if it's `undefined`
};

const isOnSideOfArray = <P extends { id: any }>(
  initialArr: Array<P>,
  selectedArr: Array<P>,
  item: P
) => {
  const indices = selectedArr.map((a) =>
    initialArr.findIndex((b) => a.id === b.id)
  );
  const minIndex = Math.min(...indices);
  const maxIndex = Math.max(...indices);

  return (
    item.id === initialArr[minIndex]?.id || item.id === initialArr[maxIndex]?.id
  );
};

const orderArrayByInitial = <P extends { id: any }>(
  initialArr: Array<P>,
  arr: Array<P>
) => {
  const indices = arr.map((a) => initialArr.findIndex((b) => a.id === b.id));

  return indices.sort().map((index) => initialArr[index] as P);
};

interface UseMultiselectProps<P extends { id: any }> {
  initialState: Array<P>;
  defaultState: Array<P>;
  maxSelected?: null | number;
}

export const useMultiselect = <P extends { id: any }>({
  initialState,
  defaultState = [],
  maxSelected = null
}: UseMultiselectProps<P>) => {
  const [selected, setSelected] = useState<P[]>([...defaultState]);

  const getAvailable = useCallback(() => {
    if (selected.length === maxSelected) return [];

    return getNextAndPrevious(initialState, selected);
  }, [initialState, maxSelected, selected]);

  const available = useMemo(() => getAvailable(), [getAvailable]);

  const add = useCallback(
    (item: P) => {
      const startNew = available.findIndex((i) => i.id === item.id);

      if (startNew === -1) setSelected([item]);
      else
        setSelected((oldList) =>
          orderArrayByInitial(initialState, uniq([...oldList, item]))
        );
    },
    [initialState, available, setSelected]
  );

  const remove = useCallback(
    (item: P) => {
      setSelected((oldList) => oldList.filter((i) => i.id !== item.id));
    },
    [setSelected]
  );

  const change = useCallback(
    (item: P) => {
      if (isOnSideOfArray(initialState, selected, item)) {
        remove(item);
      } else {
        add(item);
      }
    },
    [initialState, selected, add, remove]
  );

  const clear = useCallback(() => setSelected([]), [setSelected]);

  return {
    selected,
    available,
    add,
    remove,
    clear,
    change
  };
};
