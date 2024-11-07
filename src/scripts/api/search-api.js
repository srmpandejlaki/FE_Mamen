import { BASE } from '../globals/api-endpoint';

class SearchDbSource {
  static async search(query) {
    try {
      const response = await fetch(BASE.SEARCH(query));
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      return console.log('Tidak ada hasil!');
    }
  }
}

export default SearchDbSource;
