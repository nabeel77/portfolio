export const fetchRequest = async (url, headers) => {
  const result = await fetch(url, headers).then((response) =>
    response.json().catch((err) => err.message)
  );
  return result;
};
