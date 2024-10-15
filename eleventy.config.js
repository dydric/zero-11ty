import "dotenv/config";
import htmlmin from "html-minifier-terser";
import readableDate from './src/lib/filters/readableDate.js';

export default function(eleventyConfig) {

  const isProd = process.env.NODE_ENV === "production";

  // Ssst!
  eleventyConfig.setQuietMode(true);

  // Watch
  eleventyConfig.addWatchTarget('src/js/');
  eleventyConfig.addWatchTarget('src/css/');

  // Pass-through
  eleventyConfig.addPassthroughCopy({
    "src/assets/": "/assets/"
  });

  // Filters
  eleventyConfig.addFilter('readableDate', readableDate);

  // Minify HTML
  if (isProd) {
    eleventyConfig.addTransform("htmlmin", function (content) {
      if ((this.page.outputPath || "").endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          // // Alpine.js:
          // ignoreCustomFragments: [/\s+x-[\w\-.:]+/g],
          // minifyJS: false,
        });
        return minified;
      }
      return content;
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "/includes/layouts",
      includes: "/includes/partials",
      data: "/includes/data"
    }
  };
};
