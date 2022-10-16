import { QGame } from '@utils/trpc';
import { FC } from 'react';

export interface GameStatsProps {
  game: QGame<'get'> | undefined;
}

export const GameStats: FC<GameStatsProps> = ({ game }) => (
  <div className="flex gap-10 fluid-xl">
    <h2>
      Round <span className="text-gradient">{game?.round ?? '--'}/5</span>
    </h2>
    <h2>
      Score <span className="text-gradient">--</span>
    </h2>
  </div>
);
