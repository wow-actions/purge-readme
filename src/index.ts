import * as github from '@actions/github'
import * as core from '@actions/core'
import { load } from 'cheerio'
import fetch from 'node-fetch'
import chalk from 'chalk'
import figures from 'figures'
import parseInputs from '@wow-actions/parse-inputs'

async function purge(url: string) {
  core.info(`purging: ${url}`)
  const html = await fetch(url).then((res) => res.text())
  const content = load(html)
  const images = content('img[data-canonical-src]')
  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    const cacheURL = img.attribs.src
    const rawURL = img.attribs['data-canonical-src']
    if (!rawURL) {
      continue;
    }
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(cacheURL, { method: 'PURGE' })
    if (res.ok) {
      core.info(`${chalk.green(figures.tick)} ${rawURL}`)
    } else {
      core.info(`${chalk.red(figures.cross)} ${rawURL}`)
    }
  }
}

export async function run() {
  try {
    const { context } = github
    const inputs = parseInputs({
      repo: {
        type: 'string',
        defaultValue: `${context.repo.owner}/${context.repo.repo}`,
      },
      branch: {
        type: 'string',
        defaultValue: context.ref.split('/').slice(2).join('/'),
      },
      paths: { type: 'stringArray', defaultValue: ['README.md'] },
    })

    core.debug(`inputs: ${JSON.stringify(inputs, null, 2)}`)
    const { repo, branch, paths } = inputs
    if (repo && branch && paths) {
      for (let i = 0; i < paths.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await purge(`https://github.com/${repo}/blob/${branch}/${paths[i]}`)
      }
    }
  } catch (e) {
    core.error(e)
    core.setFailed(e.message)
  }
}

run()
