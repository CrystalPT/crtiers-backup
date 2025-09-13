import { getAllPlayers } from '../../../lib/firestore';
import PlayerClient from './PlayerClient';

// Generate static params for all players
export async function generateStaticParams(): Promise<{ username: string }[]> {
  try {
    const players = await getAllPlayers();
    return players.map(player => ({
      username: player.minecraftName
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return some default players as fallback
    return [
      { username: 'CrystalPT' },
      { username: 'admin' },
      { username: 'alex' },
      { username: 'steve' },
      { username: 'test' }
    ];
  }
}

export default async function PlayerProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  
  return <PlayerClient username={decodedUsername} />;
}