import { useState, useEffect, useRef } from "react";
import { List, SearchBar, Notice } from "./components";
import axios from "axios";
//다 되면 상세 페이지 적용하기
// import { MovieDetail, Movies } from "./types/Business";
import { Movies } from "./types/Business";
import { useSessionStorage } from "./utils";
import { v4 } from "uuid";
import "./style/style.scss";
import { transition } from "./utils/transition";

function App() {
  const [pages, setPages] = useState<React.ReactElement[]>([]);
  //다 되면 상세 페이지 적용하기
  // const [selectedItem, setSelectedItem] = useState<MovieDetail>();
  const [storedPages, setStoredPages] = useSessionStorage({
    key: "page",
    initialValue: [],
  });
  const [storedCurrentPage, setStoredCurrentPage] = useSessionStorage({
    key: "currentPage",
    initialValue: "",
  });
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef<HTMLElement>(null);
  const currentPage = useRef(0);

  const fetchMovies = async (title: string) => {
    const {
      data: { Search },
    } = await axios.post("/api/movies", { s: title });

    if (!Search) {
      return;
    }

    const handleState = () => {
      const newPage = (
        <List key={v4()} items={Search} onItemClick={fetchMovieDetail}></List>
      );

      currentPage.current++;
      setPages([...pages.slice(0, currentPage.current - 1), newPage]);
      setStoredPages([
        ...storedPages.slice(0, currentPage.current - 1),
        { Search },
      ]);
      setStoredCurrentPage(currentPage.current);
      setInProp(!inProp);
    };

    transition({
      fn: handleState,
      ms: 600,
      node: nodeRef.current,
    });
  };

  const fetchMovieDetail = async (imdbID: string) => {
    try {
      const res = await axios.post("/api/movies/", {
        i: imdbID,
        plot: "full",
      });

      if (res.status !== 200) {
        throw new Error("store api호출 오류");
      }

      // return res.data;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handlePage = (action: string) => {
    if (
      pages.length <= 0 ||
      (action === "forward" && currentPage.current + 1 > pages.length) ||
      (action === "back" && currentPage.current - 1 < 0)
    ) {
      return;
    }

    const handleAction = () => {
      if (action === "forward") {
        setStoredCurrentPage(++currentPage.current);
        setInProp(!inProp);
      } else if (action === "back") {
        setStoredCurrentPage(--currentPage.current);
        setInProp(!inProp);
      } else {
        return;
      }
    };

    transition({
      fn: handleAction,
      ms: 600,
      node: nodeRef.current,
    });
  };

  const notice = {
    title: "기능 설명",
    contents: [
      { content: "영어로 영화 제목 검색" },
      { content: "이전 검색 내용으로 돌아가기" },
      { content: "처음 화면으로 돌아가기" },
    ],
  };

  useEffect(() => {
    if (storedPages.length > 0) {
      const newPages: React.ReactElement[] = [];

      storedPages.forEach(({ Search }: { Search: Movies }) => {
        if (Search) {
          newPages.push(
            <List
              key={v4()}
              items={Search}
              onItemClick={fetchMovieDetail}
            ></List>
          );
        }
      });

      currentPage.current = storedCurrentPage;
      setPages(newPages);
      setInProp(!inProp);
    }
  }, []);

  return (
    <>
      <SearchBar
        onSubmit={fetchMovies}
        onBack={() => handlePage("back")}
        onForward={() => handlePage("forward")}
      />
      <article ref={nodeRef} className="list page">
        {currentPage.current === 0 ? (
          <Notice data={notice}></Notice>
        ) : (
          pages.length > 0 && pages[currentPage.current - 1]
        )}
      </article>
    </>
  );
}

export default App;
