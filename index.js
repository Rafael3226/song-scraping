import axios from "axios";
import * as cheerio from "cheerio";

function LoadHTML() {
  axios.get("https://www.beatport.com/").then(({ data }) => {
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(data);

    const dropdownMenu = $("#dropdown_menu");
    console.log(dropdownMenu);
  });
}
