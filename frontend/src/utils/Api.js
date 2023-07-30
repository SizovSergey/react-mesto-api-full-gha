
const jwt = localStorage.getItem('token');

class Api {
  constructor(options) {
    this._options = options;

  }

  _customFetch(url, options = {}) {
    return fetch(url, options)
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  getUserinfo() {
    return this._customFetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    });
  }

  getInitialCards() {
    return this._customFetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    });
  }

  editProfile(name,job) {
    return this._customFetch(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }

  insertNewCard(name,link) {
    return this._customFetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(id) {
    
    return this._customFetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    })

  }
  
  changeLikeCardStatus(id,isLiked) {
    if (!isLiked) {
      return this._customFetch(`${this._options.baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._options.headers
      })
    } else {
      return this._customFetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    })
    }
  }

  editAvatar(link) {
    return this._customFetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
       avatar: link
      })
    })
  }
}


 export const api = new Api({
  baseUrl: 'http://158.160.78.208:3000',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }
});


