import { getAllHiddenPlayers } from '../../../lib/firestore';
import HiddenPlayerClient from './HiddenPlayerClient';

// Generate static params for all hidden players
export async function generateStaticParams(): Promise<{ username: string }[]> {
  try {
    const players = await getAllHiddenPlayers();
    return players.map(player => ({
      username: player.minecraftName
    }));
  } catch (error) {
    console.error('Error generating static params for hidden players:', error);
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

export default async function HiddenPlayerProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  
  return <HiddenPlayerClient username={decodedUsername} />;
}