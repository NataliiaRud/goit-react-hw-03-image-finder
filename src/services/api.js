// import axios from 'axios';
// export const USER_KEY = '34470534-ede093f1b3dde51cd75181a95';
// export const BASE_URL = 'https://pixabay.com/api';

// export async function getImages(page, value) {
//   const res = await axios.get(
//     `${BASE_URL}/?q=${value}&page=${page}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return res.data;
// }

import axios from 'axios';

const KEY_API = '34470534-ede093f1b3dde51cd75181a95';
const BASE_URL = 'https://pixabay.com/api/';
const PARAMETERS = 'image_type=photo&orientation=horizontal&safesearch=true';
export const PER_PAGE = 12;

export async function getImages(searchValue, page) {
  try {
    const images = await axios.get(
      `${BASE_URL}?key=${KEY_API}&q=${searchValue}&${PARAMETERS}&page=${page}&per_page=${PER_PAGE}`
    );
    return images;
  } catch (error) {
    console.log(error.name);
  }
}
