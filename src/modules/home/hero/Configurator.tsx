/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Slider } from '~/components/Slider';
import { Toggler } from '~/components/Toggler';
import { HERO_LAYOUTS } from './Layouts';
import type { HeroActionType, THeroInitialState } from './Hero';

interface ConfiguratorProps {
  state: THeroInitialState;
  dispatch: React.Dispatch<{
    type: HeroActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }>;
  themes: Record<'primary' | 'secondary' | 'background', string>[];
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  state,
  dispatch,
  themes
}) => (
  <div className="w-full max-w-xs flex-1 md:max-w-none">
    <div className="flex flex-row space-x-2">
      <button
        type="button"
        aria-label="Next track"
        onClick={() => dispatch({ type: 'PREV_TRACK' })}
        className="p-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-primary-300 dark:hover:text-primary-200 md:p-0"
      >
        <ChevronLeft />
      </button>

      <main className="flex w-full flex-col space-y-3 rounded-lg bg-white p-3 dark:bg-primary-800">
        <section>
          <div className="mb-1.5 text-sm font-medium text-black dark:text-primary-100">
            Theme
          </div>
          <div className="mx-1 flex flex-wrap gap-x-3 gap-y-3">
            {themes.map((t, i) => (
              <button
                key={i}
                type="button"
                aria-label="Background"
                onClick={() => dispatch({ type: 'SET_THEME', payload: i })}
                style={{ background: t.primary }}
                className={clsx(
                  'relative h-[1.125rem] w-[1.125rem] rounded-md shadow-md transition active:scale-95',
                  state.theme === i
                    ? 'ring-2 ring-accent-dark ring-offset-2 ring-offset-gray-100 dark:ring-accent dark:ring-offset-primary-900'
                    : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-primary-700'
                )}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-1.5 text-sm font-medium text-black dark:text-primary-100">
            Layout
          </div>

          <div className="flex flex-row flex-wrap space-x-1.5">
            {Object.entries(HERO_LAYOUTS).map(([key, { name }]) => (
              <button
                key={key}
                type="button"
                onClick={() => dispatch({ type: 'SET_LAYOUT', payload: key })}
                className={clsx(
                  'text-xs hover:underline',
                  state.layout === key
                    ? 'text-accent-dark underline dark:text-accent'
                    : 'text-gray-700 dark:text-primary-200'
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-1.5 text-sm font-medium text-black dark:text-primary-100">
            Background
          </div>
          <div className="flex flex-col space-y-1">
            <div className="mb-1 flex flex-row items-center space-x-2.5">
              <Toggler
                size="small"
                isActive={state.isBgImageVisible}
                onChange={() => dispatch({ type: 'TOGGLE_BG_IMG_VISIBILITY' })}
              />
              <span className="text-xs text-gray-700 dark:text-primary-300">
                Background image
              </span>
            </div>

            <div className="flex flex-col">
              <div className="mb-2 flex items-start justify-between text-xs">
                <span className="text-gray-700 dark:text-primary-200">
                  Opacity
                </span>

                <div className="text-gray-600 dark:text-primary-300">
                  {state.bgOpacity}%
                </div>
              </div>

              <Slider
                size="small"
                value={state.bgOpacity}
                onChange={(v) =>
                  dispatch({ type: 'SET_BG_OPACITY', payload: v })
                }
              />
            </div>
          </div>
        </section>
      </main>

      <button
        type="button"
        aria-label="Prev track"
        onClick={() => dispatch({ type: 'NEXT_TRACK' })}
        className="p-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-primary-300 dark:hover:text-primary-200 md:p-0"
      >
        <ChevronRight />
      </button>
    </div>
  </div>
);
