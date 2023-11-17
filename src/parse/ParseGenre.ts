import { SCRAPPING_URL } from "../config";
import { Genre } from "../main";

export class ParseGenre {
  static list(genreElements: HTMLCollectionOf<Element>): Genre[] {
    const genreList: Genre[] = [];
    for (const element of genreElements) {
      genreList.push(this.element(element));
    }
    return genreList;
  }

  static element(element: Element): Genre {
    const id = this.parseId(element);
    const name = element.innerHTML;
    const url = this.parseUrl({ id, name });
    return {
      id,
      name,
      url
    };
  }

  private static parseId(element: Element): string {
    return element.outerHTML
      .split("header-subnav-link-genre-")[1]
      .split('">')[0];
  }
  private static parseUrl({ id, name }: { id: string; name: string }): string {
    return `${SCRAPPING_URL}/genre/${this.normalizeUrlName(name)}/${id}`;
  }

  private static normalizeUrlName(name: string): string {
    const charsToRemove = ["(", ")", "&", "/"];
    let normalizedName = name.trim();

    for (const char of charsToRemove) {
      normalizedName = normalizedName.replace(new RegExp(char, "g"), "");
    }
    normalizedName = normalizedName.replace(" ", "-");
    return normalizedName;
  }
}
