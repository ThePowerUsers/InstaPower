# Contributing to InstaPower

Thanks for your interest in contributing to InstaPower.

## Before you start

- Check existing issues and pull requests before opening a new one.
- For security vulnerabilities, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
- Keep changes focused and explain the reason for non-obvious changes.

## Development

1. Fork the repository and create a branch for your change.
2. Install dependencies with `npm ci`.
3. Run the project with `npm start`.
4. Make and test your changes.
5. Run `npm run package` or `npm run build:windows` when packaging changes.
6. Open a pull request with a clear description of the change.

## Project guidelines

- Keep the application focused on providing a desktop experience for Instagram.
- Do not add private, reverse-engineered, or unauthorized Instagram APIs.
- Do not store Instagram passwords or session credentials outside the browser session managed by Electron.
- Preserve Electron security settings such as context isolation, sandboxing, and disabled Node integration for remote content.
- Avoid unnecessary dependencies and keep Windows packaging reliable.

## Pull requests

Please include what changed, why it changed, how you tested it, and any packaging or Windows-specific considerations.

By contributing, you agree that your contributions will be licensed under the project's MIT License.
