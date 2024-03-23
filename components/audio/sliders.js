import { Text } from 'react-native';
import { useAudio } from '../../hooks/audiohook';
import Slider from "react-native-slider";

export function AudioSliders () {
  const { sessions, setAudioLevel } = useAudio();
  return (
    <Sliders sessions={sessions} onChange={setAudioLevel} />

  )
}

function Sliders ({ sessions = [], onChange }) {
  return sessions.map((session) => {
    const volume = session.volume * 100;
    let interval = null;
    return (
      <>
        <Text key={session.id}>{session.title}</Text>
        <Slider
          value={volume}
          style={{ width: 300 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onValueChange={(value) => {
            clearInterval(interval);
            interval = setTimeout(() => {
              onChange({ id: session.id, volume: value / 100 },)
            }, 500)
          }}
        />
      </>
    )
  });
}