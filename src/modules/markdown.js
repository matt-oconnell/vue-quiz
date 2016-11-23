import Markdown from 'markdown-it';
import hljs from 'highlight.js';
import '../../static/darcula.css';

export default new Markdown(({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (e) {
        //
      }
    }
    return ''; // use external default escaping
  }
}));
