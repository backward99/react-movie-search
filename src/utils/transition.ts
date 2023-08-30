import { CustomTransitionProps } from "../types/UI";

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function transition({ node, fn, ms }: CustomTransitionProps) {
  if (node) {
    node.classList.remove("page");
  }

  await delay(ms);

  if (node) {
    node.classList.add("page");
  }

  fn();
}
