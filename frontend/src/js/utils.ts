import _ from "lodash";

export type FileMap = {
  post: Record<string, any>;
  postTitle: string;
  postPath: string;
};
const currentDirectory = "phx-recipies";
export const postFilter = (
  fileMap: FileMap,
  filterString: String,
  currendDirectory: String
) => {
  const filterPathArray = _.compact(filterString.split("/"));
  const postPathAray = _.compact(
    fileMap.post.file.split(currendDirectory)[1].split("/")
  );
  const inclusion = _.difference(filterPathArray, postPathAray);
  return inclusion.length == 0;
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
