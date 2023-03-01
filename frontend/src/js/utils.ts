import { string } from "astro/zod";
import _ from "lodash";

export type FileMap = {
  post: Record<string, any>;
  postTitle: string;
  postPath: string;
};
// const currentDirectory = "recipies";
export const postFilter = (
  fileMap: FileMap,
  filterString: String,
  currentDirectory: String
) => {
  console.log(fileMap.post.file);

  // const filterPathArray = _.compact(filterString.split("/"));
  // const postPathAray = _.compact(
  //   fileMap.post.file.split(currentDirectory)[1].split("/")
  // );
  // const inclusion = _.difference(filterPathArray, postPathAray);
  return false;
};

export const makeFileMap = (post: Record<string, any>) => {
  const postPath = post.file.split("pages")[1].split(".")[0];
  const directory = postPath.split("/");
  const fileRouteArray = postPath.split("/");
  const fileName = fileRouteArray[fileRouteArray.length - 1].split(".")[0];
  const postTitle = post.frontmatter.title ?? _.startCase(fileName);

  return {
    post,
    postTitle,
    postPath,
  };
};

export function processSubgroup(
  acc,
  posts
): Record<string, String[] | Record<string, String[]>> {
  if (posts.length === 0) {
    return acc;
  }
  const [firstPost, ...remainingPosts] = posts;
  const [firstFolder, ...rest] = firstPost.slug.split("/");

  if (rest.length > 0) {
    const newMap = arrayToNestedKeys(rest);
    if (acc[firstFolder]) {
      acc[firstFolder].push(newMap);
    } else {
      acc[firstFolder] = [newMap];
    }
  }

  return processSubgroup(acc, remainingPosts);
}

function arrayToNestedKeys(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  const [head, ...tail] = arr;
  const nestedObject = arrayToNestedKeys(tail);
  return {
    [head]: nestedObject,
  };
}
