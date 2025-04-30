export const route = (path, id, title) => {
  if (id && title) {
    return `${path}?id=${id}&title=${title}`;
  }
  return path;
};
