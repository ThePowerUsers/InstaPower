const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('project branding is consistently InstaPower', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  assert.equal(packageJson.name, 'instapower');
  assert.equal(packageJson.productName, 'InstaPower');
  assert.match(packageJson.main, /^\.webpack\/main$/);
});

test('main process keeps remote Instagram content isolated', () => {
  const source = fs.readFileSync(path.join(root, 'src/main.js'), 'utf8');
  assert.match(source, /contextIsolation:\s*true/);
  assert.match(source, /nodeIntegration:\s*false/);
  assert.match(source, /sandbox:\s*true/);
  assert.match(source, /partition:\s*['"]persist:instagram['"]/);
  assert.match(source, /https:\/\/www\.instagram\.com\//);
});

test('Windows release workflow verifies and attests release binaries', () => {
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/build-windows.yml'), 'utf8');
  assert.match(workflow, /SHA256SUMS\.txt/);
  assert.match(workflow, /actions\/attest@v4/);
  assert.match(workflow, /attestations:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
});

test('release configuration does not hard-code signing credentials', () => {
  const builder = fs.readFileSync(path.join(root, 'electron-builder.yml'), 'utf8');
  assert.doesNotMatch(builder, /CSC_LINK\s*:/);
  assert.doesNotMatch(builder, /WIN_CSC_KEY_PASSWORD\s*:/);
});
