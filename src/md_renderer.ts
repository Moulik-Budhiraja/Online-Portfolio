import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
// @ts-ignore
import tm from "markdown-it-texmath";

function getImageFromLink(link: string) {
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

const md = new MarkdownIt({
  html: true,
  typographer: true,

  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
});

md.use(tm, {
  engine: require("katex"),
  delimiters: "dollars",
  katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
});

// Open links in new tab
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const aIndex = tokens[idx].attrIndex("target");

  if (aIndex < 0) {
    const attrs = tokens[idx].attrs;
    const href = attrs?.find(([name]) => name === "href");

    if (href && !href[1].startsWith("#")) {
      tokens[idx].attrPush(["target", "_blank"]);
    }
  } else {
    const attrs = tokens[idx].attrs;

    if (attrs) {
      // Check if the link points to an id
      const href = attrs.find(([name]) => name === "href");

      if (href && !href[1].startsWith("#")) {
        attrs[aIndex][1] = "_blank";
      }
    }
  }

  return self.renderToken(tokens, idx, options);
};

md.inline.ruler.push("contact_popover", (state, silent) => {
  const src = state.src;
  const pos = state.pos;

  // If the next 3 characters are [[@ then we have a contact popover
  if (src.slice(pos, pos + 3) === "[[@") {
    // Find the end of the contact popover
    const end = src.indexOf("]]", pos + 3);

    if (end === -1) return false;

    // Split the contact popover into its parts
    const [name, ...links] = src.slice(pos + 3, end).split("|");

    if (!silent) {
      const contactOpen = state.push("contact_popover_open", "span", 1);
      contactOpen.attrPush(["class", "pop-over inline-pop-over"]);
      contactOpen.attrPush(["tabindex", "0"]);

      state.push("text", "", 0).content = name;

      state.push("contact_popover_open", "span", 1);

      links.forEach((link) => {
        const imageSrc = getImageFromLink(link);

        const imgLinkOpen = state.push("link_open", "a", 1);
        imgLinkOpen.attrPush(["href", link]);
        imgLinkOpen.attrPush(["target", "_blank"]);

        const img = state.push("image", "img", 0);
        img.attrPush(["src", imageSrc]);
        img.attrPush(["alt", ""]);
        img.children = [{ type: "text", content: "" } as any];

        state.push("link_close", "a", -1);
      });

      state.push("contact_popover_close", "span", -1);

      state.pos = end + 2;

      return true;
    }
  }

  return false;
});

md.renderer.rules.contact_popover_open = function (tokens, idx) {
  const token = tokens[idx];
  if (!token.attrs) token.attrs = [];
  const attrs = token.attrs
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");
  return `<span ${attrs}>`;
};

md.renderer.rules.contact_popover_close = function () {
  return "</span></span>";
};

// For all header, add an id
md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const level = token.tag.slice(1);

  const title = tokens[idx + 1].content;

  const slug = title.toLowerCase().replace(/ /g, "-");

  token.attrPush(["id", slug]);

  return self.renderToken(tokens, idx, options);
};

export default md;
