import { v4 as uuidv4 } from "uuid";
import { NoticeProps } from "../types/UI";

export default function Notice({ data }: { data: NoticeProps }) {
  return (
    <article className="box">
      <h2 className="box__title">{data.title}</h2>
      <ul className="box__content-list">
        {data.contents.map(({ content }: { content: string }) => (
          <li className="box__content" key={uuidv4()}>
            {content}
          </li>
        ))}
      </ul>
    </article>
  );
}
