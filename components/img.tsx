import sizeOf from "image-size";
import { visit } from "unist-util-visit";

function rehypeImageSize() {
  return (tree: any, _file: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        // \![alt](/images/asdf.png) -> src="/images/asdf.png"
        const src = node.properties.src;
        const { width, height } = sizeOf("public" + node.properties.src);
        node.properties.width = width;
        node.properties.height = height;
      }
    });
  };
}

export default rehypeImageSize;