export const QueryToString = (obj: Record<string, any>): string => {
  let newObj: any = {};

  if (!obj) return "";

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });

  let searchParams = new URLSearchParams(newObj);
  return searchParams.toString();
};

export const QueryToObject = (): any => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};
