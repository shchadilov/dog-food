class Api {
  constructor(token) {
    this.path = 'https://api.react-learning.ru';
    this.group = 'group-8';
    this.token = token;    
  }

  signUp(body) {
    body.group = this.group;

    return fetch(`${this.path}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  signIn(body) {
    return fetch(`${this.path}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  passwordChangeRequest(body) {
    return fetch(`${this.path}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }); 
  }

  passwordChangeConfirm(id, emailedToken, body) {
    return fetch(`${this.path}/password-reset/${id}/${emailedToken}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }); 
  }

  getProducts() {
    return fetch(`${this.path}/products`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  searchProduct(query) {
    return fetch(`${this.path}/products/search?query=${query}`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  getProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  
  addProduct(body) {
    return fetch(`${this.path}/products`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    });
  }

  updateProduct(id, body) {
    return fetch(`${this.path}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    });
  }

  deleteProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  setLike(id) {
    return fetch(`${this.path}/products/likes/${id}`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  unsetLike(id) {
    return fetch(`${this.path}/products/likes/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  addReview(id, body) {
    return fetch(`${this.path}/products/review/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    });
  }

  deleteReview(productId, reviewId) {
    return fetch(`${this.path}/products/review/${productId}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  getAllReviews() {
    return fetch(`${this.path}/products/review`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  getReviews(id) {
    return fetch(`${this.path}/products/review/${id}`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  getUsers() {
    return fetch(`${this.path}/v2/${this.group}/users`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  getMe() {
    return fetch(`${this.path}/v2/${this.group}/users/me`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  getUser(id) {
    return fetch(`${this.path}/v2/${this.group}/users/${id}`, {
      headers: {
        'authorization': `Bearer ${this.token}`,
      }
    });
  }

  updateMyInfo(body) {
    return fetch(`${this.path}/v2/${this.group}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(body)
    });
  }

  updateMyAvatar(body) {
    return fetch(`${this.path}/v2/${this.group}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(body)
    });
  }  
}

export default Api;