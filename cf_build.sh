#!/bin/bash

# Build script for deploying to Cloudflare Pages (https://community.cloudflare.com/t/different-build-commands-for-build-previews/266084)

if [ "$CF_PAGES_BRANCH" == "gh-pages" ]; then
  # Just copy the output into the site/ dir on gh-pages (already built by mike)
  mkdir site/
  ls | grep -v "site" | xargs -n1 mv -t site
else
  # Else run mkdocs build to compile
  mkdocs build
fi
