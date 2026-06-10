import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import { quizService } from '@/services/quizService';

interface LeaderboardEntry {
  username: string;
  score: number;
  rank: number;
}

const QuizLeaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRankColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-700';
      default:
        return 'text-bible-text';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl font-semibold text-bible-text'>
          <Trophy className='w-5 h-5 text-bible-accent' />
          Ranking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex justify-center items-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-bible-accent'></div>
          </div>
        ) : leaderboard.length > 0 ? (
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-16'>#</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead className='text-right'>Pontuação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry) => (
                  <TableRow key={entry.rank}>
                    <TableCell
                      className={`font-medium ${getRankColor(entry.rank)}`}
                    >
                      {entry.rank}
                    </TableCell>
                    <TableCell>{entry.username}</TableCell>
                    <TableCell className='text-right'>{entry.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='text-center py-4 text-bible-text/70'>
            Nenhuma pontuação registrada ainda.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizLeaderboard;
