const ParseGenres = () => {
  let genres = [];
  const menuList = document.querySelectorAll(".dropdown_menu");
  menuList.forEach((menu) => {
    menu.querySelectorAll("a").forEach((a) => {
      genres.push({ genre: a.innerHTML, url: a.href });
    });
  });

  return genres;
};

const ParseTop100 = () => {
  let top100 = [];

  const list = document.querySelector(".row");
  const tracks = list.children;
  for (let track of tracks) {
    const trackInfo = track.innerText.split("\n");
    top100.push({
      position: trackInfo[0],
      title: trackInfo[1],
      artist: trackInfo[2],
      label: trackInfo[3],
    });
  }
  return top100;
};

exports.ParseGenres = ParseGenres;
exports.ParseTop100 = ParseTop100;
