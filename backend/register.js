/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const tsNode = require('ts-node')

tsNode.register({
  files: true,
  project: './test/tsconfig.json',
})
