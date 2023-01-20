const useUser = async () => {
  const result = await fetch('/api/authenticate', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {});
  console.log(result);
  return result;
};

export default useUser;
