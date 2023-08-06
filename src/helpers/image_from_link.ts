export function getImageFromLink(link: string) {
  if (link.includes("mailto:")) {
    return "/images/mail.svg";
  }
  if (link.includes("linkedin.com")) {
    return "/images/linkedin.svg";
  }
  if (link.includes("github.com")) {
    return "/images/github.svg";
  }
  if (link.includes("instagram.com")) {
    return "/images/instagram.svg";
  }
  return "";
}
