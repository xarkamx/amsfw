import { useMutation, useQuery } from 'react-query';
import { REACT_APP_AUDIO_IP } from '@env';
export function useAudio () {
  const ip = REACT_APP_AUDIO_IP;
  const queryForWindowsAudio = useQuery('windowsAudio', async () => {
    const response = await fetch(`${ip}/audio`);
    const content = await response.json();
    return content;
  });

  const setAudioLevel = useMutation(async ({ id, volume }) => {
    const response = await fetch(`${ip}/audio/${id}?volume=${volume}`, {
      method: 'POST'
    });
    return response.json();
  }, {
    onSuccess: () => {
      queryForWindowsAudio.refetch();
    }
  })

  return {
    sessions: queryForWindowsAudio.data || [],
    setAudioLevel: setAudioLevel.mutate
  }
}