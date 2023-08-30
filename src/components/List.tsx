import { Movie, Movies } from "../types/Business";

export default function List({
  items,
  onItemClick,
}: {
  items: Movies;
  onItemClick: (id: string) => void;
}) {
  return (
    <ul className="list__container">
      {items &&
        items.map((item: Movie) => (
          <li
            key={item.imdbID}
            className="card"
            onClick={() => onItemClick(item.imdbID)}
          >
            <img
              className="card__img"
              src={item.Poster === "N/A" ? undefined : item.Poster}
              alt={item.Title}
            />
            <span className="card__title">{item.Title}</span>
          </li>
        ))}
    </ul>
  );
}
