// prism-global must be the first import: it sets globalThis.Prism before the
// language files below are evaluated (ES modules execute imports in source order).
import './prism-global';
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

import { Prism } from 'prism-react-renderer';

// 'text' grammar: tokenizes everything as a plain token so prism-react-renderer
// receives proper Token objects instead of raw strings (which lack a .type field).
Prism.languages.text = { text: /[\s\S]+/ };
