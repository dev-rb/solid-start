import { Show } from "solid-js";
import { useParams } from "solid-start";
import { useVideos } from "../../useVideos.js";
import VideoSection from "./Videos";
import "./Videos.scss";

export default function Videos() {
  const params = useParams();
  // const data = useMovie(params);
  const data = useVideos(params);
  // const [videoData, { mutate }] = createResource(() => props.videos, getVideos);
  console.log(data()?.item);
  return (
    <Show when={data()}>
      <VideoSection videos={data()?.item} />
    </Show>
  );
}
