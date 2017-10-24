const fs = require('fs');
const path = require('path');

const wrapAsyncComponent = `import progress from 'nprogress';
import 'nprogress/nprogress.css';

function wrapAsyncComponent(component) {
  return function (r) {
    progress.start();
    component(r).then(() => {
      progress.done();
    }).catch(() => {
      progress.done();
    });
  }
}
`;

module.exports = function({ nav: navConfig, src, dist }) {
  const docs = [];
  const demos = [];

  Object.keys(navConfig).forEach(lang => {
    const nav = navConfig[lang].nav || [];
    nav.forEach(nav => {
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => addComponent(nav, lang));
        });
      } else if (nav.children) {
        nav.children.forEach(nav => addComponent(nav, lang));
      } else {
        addComponent(nav, lang);
      }
    });

    function addComponent(nav, lang) {
      if (!nav.path) {
        return;
      }
      const name = nav.path.replace('/', '');
      const docPath = fs.existsSync(path.resolve(src, `./${lang}/${name}.md`)) ? `./${lang}/${name}.md` : `./${lang}/${name}/index.md`;
      if (!nav.noDocument) {
        docs.push(`'${lang}/${name}': wrapAsyncComponent(r => require.ensure([], () => r(require('${path.resolve(src, docPath).replace(/\\/g, '\\\\')}')), '${lang}/${name}.md'))`);
      }
      if (!nav.noExample) {
        demos.push(`'${lang}/${name}': r => require.ensure([], () => r(require('./${lang}/${name}.vue')), '${lang}/${name}.vue')`);
      }
    }
  });

  const entryDocs = path.resolve(dist, './entry-docs.js');
  const entryDemos = path.resolve(dist, './entry-demos.js');

  if (!fs.existsSync(entryDocs)) {
    fs.closeSync(fs.openSync(entryDocs, 'w'));
  }
  if (!fs.existsSync(entryDemos)) {
    fs.closeSync(fs.openSync(entryDemos, 'w'));
  }

  fs.writeFileSync(entryDocs, `${wrapAsyncComponent}\nexport default {\n  ${docs.join(',\n  ')}\n};\n`, { encoding: 'utf8' });
  fs.writeFileSync(entryDemos, `export default {\n  ${demos.join(',\n  ')}\n};\n`, { encoding: 'utf8' });
}
