/* eslint-disable simple-import-sort/imports */
// prismjs must be imported first: in the browser it sets window.Prism so language
// components below can use it as their global Prism reference.
import { Prism } from 'prism-react-renderer';
import prismjs from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-hcl';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-toml';

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
