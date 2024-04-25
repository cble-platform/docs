# CBLE Documentation

[![Build Docs](https://github.com/cble-platform/docs/actions/workflows/build-docs.yml/badge.svg)](https://github.com/cble-platform/docs/actions/workflows/build-docs.yml)

This documentation is built with `mkdocs` and uses [Poetry](https://python-poetry.org/) for dependency management.

## Prerequisites

- [Poetry](https://python-poetry.org/docs/#installation)
- Python `^3.11`

## Building

To build the site locally, just run `mkdocs build` and the static site will be generated in the `site` folder.

## Deployment

This site is using versioned documentation with [mike](https://github.com/jimporter/mike).

> ⚠️ To deploy a new version, **merge all changes into `main` first**

```shell
git switch main

mike deploy -t "x.x (latest)" x.x latest

mike serve

# Check to ensure generated site is good to go

git switch gh-pages

git push

git switch main
```

## Development

Ensure you have the [prerequisites](#prerequisites) installed and then run the dev server using `mkdocs serve`.
