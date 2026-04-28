/* eslint-disable simple-import-sort/imports */
// prismjs must be imported first: in the browser it sets window.Prism so language
// components below can use it as their global Prism reference.
import { Prism } from 'prism-react-renderer';
import prismjs from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-csharp.js';
import 'prismjs/components/prism-docker.js';
import 'prismjs/components/prism-hcl.js';
import 'prismjs/components/prism-http.js';
import 'prismjs/components/prism-ini.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-powershell.js';
import 'prismjs/components/prism-protobuf.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-scala.js';
import 'prismjs/components/prism-shell-session.js';
import 'prismjs/components/prism-toml.js';

// Copy newly registered grammars from prismjs into prism-react-renderer's Prism.
// Language component IIFEs register on prismjs's window.Prism, not on PrismRR.
for (const [key, value] of Object.entries(prismjs.languages)) {
  if (typeof value !== 'function' && !(key in Prism.languages)) {
    (Prism.languages as Record<string, unknown>)[key] = value;
  }
}

// 'text' grammar: tokenizes everything as a plain token so prism-react-renderer
// receives proper Token objects instead of raw strings (which lack a .type field).
Prism.languages.text = { text: /[\s\S]+/ };

export { Prism };
