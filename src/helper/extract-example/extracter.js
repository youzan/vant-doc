const fs = require('fs');
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
    'example-block': $.html('example-block')
  };

  $('style').remove();
  $('script').remove();

  let script = '';
  if (output.script) {
    script = output.script.replace('<script>', `
      <script>
        import Vue from "vue";
        import ExampleBlock from "../components/example-block";
        Vue.component("example-block", ExampleBlock);
    `);
  } else {
    script = `
      <script>
        import Vue from "vue";
        import ExampleBlock from "../components/example-block";
        Vue.component("example-block", ExampleBlock);
      </script>`;
  }

  const componentName = decamelize(componentTitle.split(' ')[0], '-');
  return `
    <template>
      <section class="demo-${componentName}">
        <h1 class="demo-title">${componentTitle}</h1>
        ${output['example-block']}
      </section>
    </template>
    ${output.style}
    ${script}
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
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      const description = (m && m.length > 1) ? m[1] : '';
      const content = tokens[idx + 1].content;
      const html = convert(stripTags(content, ['script', 'style']));
      return `<example-block title="${description}">${html}</example-block>\n`;
    }
    return '';
  }
});

module.exports = function extracter(config) {
  const { src, dist, nav } = config;
  const docsDir = path.resolve(__dirname, '../docs');
  let components = [];

  for (let i = 0; i < nav.length; i++) {
    const navItem = nav[i];

    if (!navItem.showInMobile) continue;

    if (!navItem.groups) {
      components.push(nav[i]);
    } else {
      for (let j = 0; j < navItem.groups.length; j++) {
        components = components.concat(navItem.groups[j].list);
      }
    }
  }

  for (let i = 0; i < components.length; i++) {
    const item = components[i];
    const itemMdFile = path.resolve(src, `./${item.path}/index.md`);

    if (!fs.existsSync(itemMdFile)) {
      continue;
    }

    const itemMd = fs.readFileSync(itemMdFile).toString();
    const content = parser.render(itemMd);
    const result = renderVueTemplate(content, item.title);
    const exampleVueName = path.resolve(dist, `./${item.path}.vue`);

    // 检查文件夹及文件是否存在
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
    if (!fs.existsSync(exampleVueName)) {
      fs.closeSync(fs.openSync(exampleVueName, 'w'));
    }

    fs.writeFileSync(exampleVueName, result, { encoding: 'utf8' });
  }

  buildEntry(config);
}