const path = require('path');
const shelljs = require('shelljs');

function changelog() {
  const basepath = process.cwd();
  const dist = process.argv.pop();

  shelljs.exec(`
    basepath=${basepath}

    github_changelog_generator \
      --header-label "## 更新日志" \
      --bugs-label "**Bug Fixes**" \
      --enhancement-label "**Breaking changes**" \
      --issues-label "**Issue**" \
      --pr-label "**Improvements**" \
      --no-unreleased \
      --max-issues 200 \
      --since-tag v1.0.0 \
      -o ${path.join(basepath, dist)}
    `
  );
}

module.exports = changelog;
