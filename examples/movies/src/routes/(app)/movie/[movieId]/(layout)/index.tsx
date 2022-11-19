import { Show } from "solid-js";
import { createRouteData, RouteDataArgs, useRouteData } from "solid-start";
import { getMovie } from "~/services/tmdbAPI";
import { Credits } from "./Credits";
import { MovieInfo } from "./MovieInfo";

export default function MoviePage() {
  const data = useRouteData<typeof routeData>();
  return (
    <Show when={data()}>
      <MovieInfo item={data()?.item} />
      <Show when={data()?.item?.credits?.cast?.length}>
        <Credits people={data()?.item?.credits?.cast} />
      </Show>
    </Show>
  );
}

export function routeData(route: RouteDataArgs) {
  const movieId = route.params.movieId;
  return createRouteData(
    async id => {
      try {
        const item = await getMovie(id);

        if (item.adult) {
          throw new Error("Data not available");
        } else {
          return { item };
        }
      } catch {
        throw new Error("Data not available");
      }
    },
    {
      key: () => movieId
    }
  );
}
