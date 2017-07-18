/*!
 * strip-tags <https://github.com/jonschlinkert/strip-tags>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

const cheerio = require('cheerio');

module.exports = function(str, tags) {
  const $ = cheerio.load(str, {decodeEntities: false});

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  let len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }

  return $.html();
};

