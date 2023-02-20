export const fetchRequest = async (url, headers) => {
  const result = await fetch(url, headers)
    .then((response) => response.json())
    .catch((err) => err.message);
  return result;
};

export const authenticateUser = async () => {
  const result = await fetchRequest('/api/user/authenticate', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const changeItemPosition = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

export const validateEmail = () => {
  const emailValidation = (props) => {
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegEx.test(String(props).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  return { emailValidation: emailValidation };
};
