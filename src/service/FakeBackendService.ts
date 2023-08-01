import { useMemo } from 'react';
import axios from '../api-client/index';
import {
  CollectionInterface,
  ImageInterface,
  UpdateUserInterface
} from '../interface/Interfaces';
import { CLIENT_ID } from '../utils/AppConstants';

export default class FakeBackendService {
  static authenticate = async (code: string): Promise<string> => {
    return await axios({
      method: 'POST',
      url: 'https://unsplash.com/oauth/token',
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        client_secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
        redirect_uri: 'http://localhost:3000/auth',
        code: code,
        grant_type: 'authorization_code'
      }
    })
      .then(async (response) => {
        console.log(response.data);
        const accessToken = response.data.access_token;
        return accessToken;
      })
      .catch((error) => {
        return error;
      });
  };

  static searchImages = async (image: string): Promise<ImageInterface[]> => {
    return await axios({
      method: 'GET',
      url: 'https://api.unsplash.com/search/photos',
      params: {
        client_id: CLIENT_ID,
        query: image
      }
    })
      .then((response) => {
        const data = response.data.results;
        console.log(data[0]);
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static createCollection = async (
    collectionName: string,
    description: string
  ): Promise<CollectionInterface> => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'POST',
      url: 'https://api.unsplash.com/collections',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
        title: collectionName,
        description: description
      }
    })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static addPhotoToACollection = async (
    selectedImageId: number,
    selectedImage: ImageInterface,
    collectionId: string
  ) => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'POST',
      url: `https://api.unsplash.com/collections/${collectionId}/add`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
        photo_id: selectedImageId
      },
      data: {
        selectedImage
      }
    })
      .then(async (response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static getUserPhotos = async (
    username: string
  ): Promise<ImageInterface[]> => {
    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/users/${username}/photos`,
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
      }
    })
      .then(async (response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static getUserCollections = async (
    username: string
  ): Promise<CollectionInterface[]> => {
    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/users/${username}/collections`,
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY
      }
    })
      .then(async (response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static getUserData = async () => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'GET',
      url: 'https://api.unsplash.com/me',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then(async (response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static loadUserPhotos = async (photoId: number): Promise<ImageInterface> => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/photos/${photoId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then(async (response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static loadUserCollections = async (collectionId: string) => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/collections/${collectionId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then(async (response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static updateUserProfile = async (updatedUserData: UpdateUserInterface) => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'PUT',
      url: 'https://api.unsplash.com/me',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        updatedUserData
      }
    })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static loadCollectionData = async (collectionId: string) => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/collections/${collectionId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static loadCollectionImages = async (
    collectionId: string
  ): Promise<ImageInterface[]> => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/collections/${collectionId}/photos`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  static loadImage = async (photoId: string): Promise<ImageInterface> => {
    const TOKEN = localStorage.getItem('token');

    return await axios({
      method: 'GET',
      url: `https://api.unsplash.com/photos/${photoId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        return error;
      });
  };
}
