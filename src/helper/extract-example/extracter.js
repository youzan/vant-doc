const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const decamelize = require('decamelize');
const stripTags = require('./strip-tags');
const buildEntry = require('./build-entry');
const markdownIt = require('markdown-it');
const markdownItContainer = require('markdown-it-container');
const parser = markdownIt('default', { html: true });

const renderVueTemplate = function(html, componentTitle) {
  const $ = cheerio.load(html, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false
  });

  const output = {
    style: $.html('style'),
    script: $.html('script'),
    demo: $.html('van-doc-demo-block')
  };

  const componentName = decamelize(componentTitle.split(' ')[0], '-');
  return `
    <template>
      <van-doc-demo-section class="demo-${componentName}" title="${componentTitle}">
        ${output.demo}
      </van-doc-demo-section>
    </template>
    ${output.style}
    ${output.script}
  `;
};

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

parser.use(markdownItContainer, 'demo', {
  validate: function(params) {
    return params.trim().match(/^demo\s*(.*)$/);
  },

  render: function(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      const description = (m && m.length > 1) ? m[1] : '';
      const content = tokens[idx + 1].content;
      const html = convert(stripTags(content, ['script', 'style']));
      return `<van-doc-demo-block title="${description}">${html}</van-doc-demo-block>\n`;
    }
    return '';
  }
});

module.exports = function extracter(config) {
  const { src, dist, nav: navConig } = config;
  let components = [];

  Object.keys(navConig).forEach(lang => {
    const nav = navConig[lang].nav || [];

    nav.forEach((navItem, i) => {
      if (!navItem.showInMobile) return;

      if (!navItem.groups) {
        components.push({ navItem, lang });
      } else {
        navItem.groups.forEach(navGroup => {
          const list = navGroup.list.map(item => ({ item, lang }));
          components = components.concat(list);
        });
      }
    });
  });

  for (let i = 0; i < components.length; i++) {
    const { item, lang } = components[i];
    const itemMdFile = path.resolve(src, `./${lang}/${item.path}.md`);
    const itemMdFileInside = path.resolve(src, `./${lang}/${item.path}/index.md`);
    let itemMd;

    if (fs.existsSync(itemMdFile)) {
      itemMd = fs.readFileSync(itemMdFile).toString();
    } else if (fs.existsSync(itemMdFileInside)) {
      itemMd = fs.readFileSync(itemMdFileInside).toString();
    }
    if (!itemMd) {
      continue;
    }

    const content = parser.render(itemMd);
    const result = renderVueTemplate(content, item.title);
    const exampleDir = path.resolve(dist, lang);
    const exampleVueName = path.resolve(exampleDir, `./${item.path}.vue`);

    // 检查文件夹及文件是否存在
    if (!fs.existsSync(exampleDir)) {
      fs.ensureDirSync(exampleDir);
    }
    if (!fs.existsSync(exampleVueName)) {
      fs.closeSync(fs.openSync(exampleVueName, 'w'));
    }

    fs.writeFileSync(exampleVueName, result, { encoding: 'utf8' });
  }

  buildEntry(config);
};
