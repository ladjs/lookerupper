
//     lookerupper
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// Copy to your clipboard a package's name and use
// `CmdOrCtrl+Shift+L` to lookup its documentation on GitHub

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source: <https://github.com/niftylettuce/lookerupper>

// # lookerupper

import 'babel-polyfill';

import util from 'util';
import RegClient from 'npm-registry-client';
import AutoLaunch from 'auto-launch';
import GhReleases from 'electron-gh-releases';
import {
  app,
  globalShortcut,
  clipboard,
  shell,
  dialog
} from 'electron';

const options = {
  repo: 'niftylettuce/lookerupper',
  currentVersion: app.getVersion()
};
const updater = new GhReleases(options)
const gitHubSearchUrl = 'https://github.com/search?q=%s&type=Repositories';
const npmUrl = 'https://registry.npmjs.org/%s/latest';
const client = new RegClient();
const params = { timeout: 1000 };
const autoStart = new AutoLaunch({ name: 'LookerUpper' });

// check once for updates on boot
updater.check(checkUpdate);

// check every 4 hours
setInterval(() => {
  updater.check(checkUpdate);
}, 1000 * 60 * 60 * 4);

function checkUpdate(err, status) {
  // download the update
  if (!err && status)
    updater.download()
}

// when an update has been downloaded
// restart the app and install the update
updater.on('update-downloaded', (info) => {
  updater.install();
})

// hide the dock icon asap
app.dock.hide();

// enable auto-start if we can
autoStart.isEnabled((enabled) => {
	if (enabled) return;
  autoStart.enable((err) => {
    if (err)
      return dialog.showErrorBox('Auto start issue', err.message);
  });
});

async function getSelection() {

  let selection = clipboard.readText('selection');
  clipboard.clear('selection');

  // trim, remove quotes and parens, replace spaces with dash, toLowerCase()
  // <https://docs.npmjs.com/files/package.json#name>
  selection = selection
    .trim()
    .replace(/[;\(\)"']{1}/gi,'')
    .replace(/\s+/g, '-')
    .toLowerCase();

  // remove first period or underscore
  // (npm packages cannot start with dot or underscore)
  if (selection.substring(0, 1).includes(['.', '_']))
    selection = selection.substring(1);

  // remove trailing period
  if (selection.substring(selection.length - 1) === '.')
    selection = selection.substring(0, selection.length - 1);

  if (!selection) return;

  client.get(util.format(npmUrl, selection), params, (err, data, raw, res) => {
    if (err)
      return openGitHub(selection);
    try {
      raw = JSON.parse(raw);
      if (!raw.homepage)
        return openGitHub(selection);
      if (raw.homepage.indexOf('github.com') !== -1
          && raw.homepage.indexOf('#readme') === -1)
        raw.homepage += '#readme';
      shell.openExternal(raw.homepage);
    } catch (err) {
      openGitHub(selection);
    }
  });

}

function openGitHub(selection) {
  shell.openExternal(util.format(gitHubSearchUrl, selection));
}

app.on('ready', () => {
  globalShortcut.register('CmdOrCtrl+Shift+L', getSelection);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
