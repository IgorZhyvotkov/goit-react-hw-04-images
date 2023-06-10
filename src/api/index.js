const BASE_URL = 'https://pixabay.com/api/';
const KEY = '37067470-11cf8dec766fce25052929d3a';


export const getImages = async ({ searchValue, page ,per_page }) => {

  const params = new URLSearchParams({
    q: searchValue,
    page,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Dont give up! Try again!");
  }
  
  return response.json();
};


