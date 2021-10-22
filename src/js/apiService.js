export default function fetchData(searchQuery) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=23984198-d5ba81eacae48fb09d6c38179`
  )
    .then((response) => response.json())
    .then();
}
