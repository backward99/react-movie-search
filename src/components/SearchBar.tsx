import { useRef } from "react";
import Icon from "./Icon";
import { SearchBarProps } from "../types/UI";

export default function SearchBar({
  onSubmit,
  onBack,
  onForward,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const title = inputRef.current?.value;

    if (title) {
      onSubmit(title);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ("key" in event && event.key !== "Enter") {
      return;
    }
    handleSubmit();
  };

  return (
    <article className="search">
      <section className="search__container">
        <Icon className="search__button" onClick={onBack}>
          Arrow_Back
        </Icon>
        <Icon className="search__button" onClick={onForward}>
          Arrow_Forward
        </Icon>
        <input
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="search__title"
          type="search"
          name="title"
        ></input>
        <Icon
          className="search__button search__button--right"
          onClick={handleSubmit}
        >
          Search
        </Icon>
      </section>
    </article>
  );
}
