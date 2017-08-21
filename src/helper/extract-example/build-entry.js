const fs = require('fs');
const path = require('path');

const wrapAsyncComponent = `import progress from 'nprogress';
import 'nprogress/nprogress.css';

function wrapAsyncComponent(component) {
  return function (r) {
    progress.start();
    component(r).then(() => {
      window.scrollTo(0, 0);
      progress.done();
    }).catch(() => {
      progress.done();
    });
  }
}
`;

module.exports = function({ nav, src, dist }) {
  const docs = [];
  const demos = [];

  nav.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(addComponent);
      });
    } else if (nav.children) {
      nav.children.forEach(addComponent);
    } else {
      addComponent(nav);
    }
  });

  function addComponent(nav) {
    if (!nav.path) {
      return;
    }
    const name = nav.path.replace('/', '');
    const docPath = fs.existsSync(path.resolve(src, `./${name}.md`)) ? `./${name}.md` : `./${name}/index.md`;
    docs.push(`'${name}': wrapAsyncComponent(r => require.ensure([], () => r(require('${path.resolve(src, docPath)}')), '${name}.md'))`);
    if (!nav.noExample) {
      demos.push(`'${name}': r => require.ensure([], () => r(require('./${name}.vue')), '${name}.vue')`);      
    }
  }

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
