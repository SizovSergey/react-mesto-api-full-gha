const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
const BASEURL = `http://sgend.nomoreparties.co`

const request = (endpoint, options) => {
  const url = `${BASEURL}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}

export const register = (email, password) => {
  return request('/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    },
    body: JSON.stringify({ email, password}),
  })
};

export const authorize = (email, password) => {
    return request('/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

  };

  export const getContent = (token) => {
    return request('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  };
  