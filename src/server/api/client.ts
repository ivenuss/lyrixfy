import type { RouterOutputs } from '~/lib/api';

export type Tweet = RouterOutputs['twitter']['tweets'][number];

export type QueryTrack = RouterOutputs['spotify']['search'][number];
