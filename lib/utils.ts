export const getYoutubeImage = (link: string) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = link.match(regExp);
  const id = match && match[7].length == 11 ? match[7] : false;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
