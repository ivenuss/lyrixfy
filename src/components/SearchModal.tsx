import React, { useCallback, useEffect, useRef } from 'react';
import create from 'zustand';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence, motion } from 'framer-motion';
import { combine } from 'zustand/middleware';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import { SHORTCUTS } from '~/lib/constants';
import { SearchTrack } from './SearchTrack';

const useSearchModalStore = create(
  combine({ isOpen: false }, (set) => ({
    set,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen }))
  }))
);

export const toggleModal = () => {
  useSearchModalStore.getState().toggleModal();
};

const SearchModal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    isOpen,
    setIsOpen,
    toggleModal: _toggleModal
  } = useSearchModalStore();

  useHotkeys('escape', () => setIsOpen(false), { enableOnFormTags: ['INPUT'] });

  useHotkeys(
    SHORTCUTS.SEARCH,
    (e) => {
      e.preventDefault();
      _toggleModal();
    },
    { preventDefault: true, enableOnFormTags: ['INPUT'] }
  );

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const handleOnSearch = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="fixed top-0 left-0 z-[200] flex h-screen w-screen bg-black/90 pt-[5vh] dark:bg-black/90 md:p-[12vh]"
        >
          <div className="mx-auto flex w-full max-w-screen-xs flex-col px-4">
            <motion.div
              ref={ref}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
            >
              <SearchTrack autoFocus onSearch={handleOnSearch} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
