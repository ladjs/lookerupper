
# :sparkles: :octocat: LookerUpper

[![MIT License][license-image]][license-url]

> Copy to your clipboard a package's name and use `CmdOrCtrl+Shift+L` to lookup its documentation on GitHub

![Demo][demo]


## Index

* [Download](#download)
* [Support](#support)
* [Updates](#updates)
* [Contributors](#contributors)
* [Credits](#credits)
* [License](#license)


## Download

**How do I install LookerUpper?**

The latest release can be found on the [release page][release-page].

We do not currently support Windows or Linux, but this package should work fine for those platforms if you build it yourself.

**Why do you only publish an OS X version?**

We welcome contributors to help with other platforms.  We can't publish a version for Linux right now, since we would need to submit it to the PPA (don't have the time at the moment; because [electron][electron] does not support Linux auto-updating).

Also, I can't get Windows builds to work due to `wine`, because on OS X Yosemite (my platform) I can't install `wine` using `brew`.

If anyone has insight into why I get [this error][error], please advise.


## Support

> Unfortunately due to limitations with [electron][electron], we can't completely use your [clipboard's selection][selection] right now.  I'm not 100% sure why yet; maybe someone can help here?

If you have questions or find a bug, please report it under [Issues][issues].

**[Donate Now][donate-now]**


## Updates

Updates will be automatically downloaded and installed for you from releases on GitHub.

Here's how we publish a new version (after bumping `version` in `package.json`).

```bash
npm install -g electron-release
npm run dist
electron-release --app LookerUpper-darwin-x64/LookerUpper.app --token <githubtoken>
```

## Contributors

* Nick Baugh <niftylettuce@gmail.com>


## Credits

* [Ghost][ghost-icon] by Andres Flores from the Noun Project


## License

[MIT][license-url]


[demo]: https://raw.githubusercontent.com/niftylettuce/lookerupper/master/images/demo.gif
[donate-now]: https://www.paypal.me/niftylettuce
[issues]: https://github.com/niftylettuce/lookerupper/issues
[release-page]: https://github.com/niftylettuce/lookerupper/releases
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[ghost-icon]: https://thenounproject.com/term/ghost/120588/
[electron]: http://electron.atom.io/
[error]: https://i.imgur.com/aSwgAwG.png
[this]: https://github.com/jenslind/electron-gh-releases/blob/master/docs/2.x/how-to.md#publishing-a-new-release-on-github
[selection]: https://github.com/atom/electron/blob/master/docs/api/clipboard.md
