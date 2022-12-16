import * as github from '@actions/github'
import * as core from '@actions/core'
import { load } from 'cheerio'
import fetch from 'node-fetch'
import chalk from 'chalk'
import figures from 'figures'
import parseInputs from '@wow-actions/parse-inputs'

async function purge(url: string, file: string) {
  core.info(`purging: ${file}`)
  const html = await fetch(url).then((res) => res.text())
  const content = load(html)
  const arr = content('img[data-canonical-src]').map(async (i, elem) => {
    const cacheURL = elem.attribs.src
    const rawURL = elem.attribs['data-canonical-src']
    const res = await fetch(cacheURL, { method: 'PURGE' })
    if (res.ok) {
      core.info(`${chalk.green(figures.tick)} ${rawURL}`)
    } else {
      core.info(`${chalk.red(figures.cross)} ${rawURL}`)
    }

    return res
  })

  return Promise.all(arr)
}

export async function run() {
  try {
    const { context } = github
    const inputs = parseInputs({
      owner: { type: 'string', defaultValue: context.repo.owner },
      repo: { type: 'string', defaultValue: context.repo.repo },
      branch: {
        type: 'string',
        defaultValue: context.ref.split('/').slice(2).join('/'),
      },
      paths: { type: 'stringArray', defaultValue: ['README.md'] },
    })

    core.debug(`inputs: ${JSON.stringify(inputs, null, 2)}`)
    const { owner, repo, branch, paths } = inputs
    if (owner && repo && branch && paths) {
      return Promise.all(
        paths.map(async (file) => {
          const url = `https://github.com/${repo}/blob/${branch}/${file}`
          return purge(url, file)
        }),
      )
    }
  } catch (e) {
    core.error(e)
    core.setFailed(e.message)
  }
}

run()
