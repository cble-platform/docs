# CBLE Documentation

[![Deploy Docs](https://github.com/cble-platform/docs/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/cble-platform/docs/actions/workflows/deploy-docs.yml)

This documentation is built with `mkdocs` and uses [Poetry](https://python-poetry.org/) for dependency management.

## Prerequisites

- [Poetry](https://python-poetry.org/docs/#installation)
- Python `^3.11`

## Building

To build the site locally, just run `mkdocs build` and the static site will be generated in the `site` folder.

## Deployment

The site is automatically built and deployed via GitHub actions.

## Development

Ensure you have the [prerequisites](#prerequisites) installed and then run the dev server using `mkdocs serve`.
