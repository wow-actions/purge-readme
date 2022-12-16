<h1 align="center">Purge README</h1>

<p align="center">
  <a href="/wow-actions/purge-readme/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/wow-actions/purge-readme?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/wow-actions/purge-readme/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/purge-readme" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=Marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>
  <a href="https://github.com/wow-actions/purge-readme/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/wow-actions/purge-readme/Release/master?logo=github&style=flat-square" ></a>
</p>

<p align="center">
  <strong>Clear the cache of images embeded in GitHub README or markdown files</strong>
</p>

## Usage

Create a `.github/workflows/purge-readme.yml` file in the repository you want to install this action:

```yml
name: Purge README
on: push
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/purge-readme@v1
```

### Inputs

Various inputs are defined to let you configure the action:

> Note: [Workflow command and parameter names are not case-sensitive](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#about-workflow-commands).

| Name | Description | Default |
| --- | --- | --- |
| `repo` | The repo with `[owner]/[repo]` format. | The repo of the action running on |
| `branch` | The branch to purge. | The branch of the action running on |
| `paths` | The markdown file paths to purge. | `README.md` |

```yml
- uses: wow-actions/purge-readme@v1
  with:
    repo: wow-actions/purge-readme
    branch: master
    paths: |
      README.md
      images.md
```

## License

The application code and associated documentation is under the [MIT License](LICENSE)
