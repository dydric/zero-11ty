import "dotenv/config";
import htmlmin from "html-minifier-terser";
import readableDate from './src/lib/filters/readableDate.js';

import path from "path";
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import Image from "@11ty/eleventy-img";

export default function(eleventyConfig) {

  const isProd = process.env.NODE_ENV === "production";

  // Ssst!
  eleventyConfig.setQuietMode(true);

  // Watch
  eleventyConfig.addWatchTarget('src/js/');
  eleventyConfig.addWatchTarget('src/css/');

  // Pass-through
  eleventyConfig.addPassthroughCopy({
    "src/assets/": "/assets/",
    "src/media/processed/" : "/media/processed",
    "src/css/tw/tw.build.css" : "/css/tw.css",
  });

  // Filters
  eleventyConfig.addFilter('readableDate', readableDate);

  // Images
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: "html",
		formats: ["webp", "jpeg"],
    // formats: ["auto"],
    // widths: ["auto"],
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

  eleventyConfig.addShortcode("image", async function (src, alt, widths = [300, 600], sizes = "100vw") {
    let metadata = await Image(`${src}`, {
      widths,
      formats: ["avif", "jpeg"],
      urlPath: "/media/processed",
      outputDir: "./src/media/processed",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

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
