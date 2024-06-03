

import { execSync } from "child_process";




/**
 * pnpm输出：/Users/lokep/pnpm-global/5/node_modules/.pnpm/pnpm@7.9.0/node_modules/pnpm/bin/pnpm.cjs
 * npm输出：/Users/lokep/.nvm/versions/node/v14.18.1/lib/node_modules/npm/bin/npm-cli.js
 */
// console.log('managerChecker.mjs', process.env.npm_execpath)

/**
 * 输出package.json中的字段
 */
// console.log('managerChecker.mjs', process.env.npm_package_engines_node)

/**
 * 输出npmrc文件中的字段
 */
// console.log('managerChecker.mjs', process.env.npm_config_use_node_version)

const cwd = process.cwd()

console.log('[cwd]: ', cwd)

if (process.env.npm_execpath.includes('npm-cli')) {

  if (process.env.npm_config_use_node_version) {

    console.log('[expected version]: ', process.env.npm_config_use_node_version)
    try {
      execSync(`source ~/.nvm/nvm.sh && nvm use ${process.env.npm_config_use_node_version}`, { cwd })
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  } else {
    console.warn('未指定node版本，请在.npmrc文件中配置npm_config_use_node_version字段')
    process.exit(1)
  }
}
