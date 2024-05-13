import { useEffect, useState } from "react";
import { TbLoaderQuarter } from "react-icons/tb";

export default function GetAudioDuration({ audioUrl }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    const handleLoadedMetadata = () => {
      const minute = Math.floor(audio.duration / 60);
      const secund = Math.floor(audio.duration % 60);
      setDuration(`${minute}:${secund < 10 ? "0" + secund : secund}`);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioUrl]);

  return <>{duration !== null ? duration : <TbLoaderQuarter />}</>;
}
