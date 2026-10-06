const esbuild = require('/home/claude/.npm-global/lib/node_modules/tsx/node_modules/esbuild/lib/main.js');
const fs = require('fs');
const path = require('path');

async function build() {
  const result = await esbuild.build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    minify: true,
    format: 'iife',
    target: 'es2020',
    write: false,
    absWorkingDir: __dirname,
  });

  const bundleCode = result.outputFiles[0].text;

  const template = fs.readFileSync('index_template.html', 'utf8');
  const finalHtml = template.replace('/*BUNDLE_JS*/', () => bundleCode);
  fs.writeFileSync('index.html', finalHtml);
  console.log('Built index.html —', finalHtml.length, 'bytes');
}

build().catch(e => { console.error(e); process.exit(1); });
