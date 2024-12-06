import { Movie } from '../types/movie';

export const getSampleRecommendations = (query: string): Movie[] => {
  // This would be replaced with actual API calls to the Flask backend
  return [
    {
      id: '1',
      title: 'Inception',
      year: 2010,
      posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      rating: '8.8/10',
      genre: 'Sci-Fi'
    },
    {
      id: '2',
      title: 'The Matrix',
      year: 1999,
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500',
      description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
      rating: '8.7/10',
      genre: 'Action'
    },
    {
      id: '3',
      title: 'Interstellar',
      year: 2014,
      posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=500',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      rating: '8.6/10',
      genre: 'Sci-Fi'
    },
    {
      id: '4',
      title: 'Blade Runner 2049',
      year: 2017,
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500',
      description: 'A young blade runner\'s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.',
      rating: '8.0/10',
      genre: 'Sci-Fi'
    },
    {
      id: '5',
      title: 'Dune',
      year: 2021,
      posterUrl: 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&w=500',
      description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
      rating: '8.0/10',
      genre: 'Sci-Fi'
    },
  ];
};