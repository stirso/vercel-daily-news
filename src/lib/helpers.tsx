import type { ContentBlock } from "../types/types";
import Image from "next/image";

export function RenderArticleContent({ blocks }: { blocks: ContentBlock[] }) {

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i} dangerouslySetInnerHTML={{
                __html: convertLinksToHtml(block.text as string)
              }}
            />
          case "heading":
            return block.level === 2
              ? <h2 key={i}>{block.text}</h2>
              : <h3 key={i}>{block.text}</h3>
          case "blockquote":
            return <blockquote key={i}>{block.text}</blockquote>
          case "unordered-list":
            return (
              <ul key={i}>
                {block?.items?.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{
                      __html: convertLinksToHtml(item as string)
                    }}
                  />
                ))}
              </ul>
            )
          case "ordered-list":
            return (
              <ol key={i}>
                {block?.items?.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{
                      __html: convertLinksToHtml(item as string)
                    }}
                  />
                ))}
              </ol>
            )
          case "image":
            return (
              block?.src && 
                <figure key={i}>
                  <Image
                    alt={block?.alt || "Article image"}
                    src={block?.src}
                    width={600}
                    height={400}
                  />
                </figure>
            )
        }
      })}
    </>
  )
}

function convertLinksToHtml(text: string) {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    ' <a href="$2" target="_blank" rel="noopener noreferrer">$1</a> '
  );
}
 