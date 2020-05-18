const fetch = require("node-fetch");

module.exports = {
  async getData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error);
    }
  }
}