
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
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getInitialCards() {
    return this._customFetch(`${this._options.baseUrl}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  editProfile(name,job) {
    return this._customFetch(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }

  insertNewCard(name,link) {
    return this._customFetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(id) {
    
    return this._customFetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })

  }
  
  changeLikeCardStatus(id,isLiked) {
    if (!isLiked) {
      return this._customFetch(`${this._options.baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
    } else {
      return this._customFetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    }
  }

  editAvatar(link) {
    return this._customFetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       avatar: link
      })
    })
  }
}


 export const api = new Api({
  baseUrl: 'https://sgend.nomoreparties.co',
});


