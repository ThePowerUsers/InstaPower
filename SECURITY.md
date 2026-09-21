# Security Policy

## Supported Versions

Security fixes are provided for the latest published version of InstaPower.

| Version | Supported |
| --- | --- |
| 1.1.x | Yes |
| < 1.1 | No |

If you are using an older release, please update to the latest version before reporting an issue unless the vulnerability prevents you from doing so.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Use GitHub's private security reporting flow:

**[Report a vulnerability privately](https://github.com/ThePowerUsers/InstaPower/security/advisories/new)**

If private vulnerability reporting is unavailable for the repository, use the repository's Security tab to review the currently available private reporting options. Do not post exploit details publicly.

Please include, where possible:

- A clear description of the vulnerability and its security impact.
- The affected InstaPower version(s).
- Windows version and architecture.
- Exact reproduction steps or a minimal proof of concept.
- Relevant logs, screenshots, stack traces, or crash information.
- Any suggested mitigation or patch, if available.
- Whether the issue may expose credentials, session data, cookies, personal information, or other sensitive data.

Please do not include real passwords, authentication tokens, session cookies, private keys, or other secrets in a report. Redact sensitive information before sending it.

## What to Expect

We aim to acknowledge valid security reports as soon as reasonably possible and will work with the reporter to understand, reproduce, remediate, and responsibly disclose confirmed vulnerabilities.

Please allow reasonable time for investigation and remediation before making a vulnerability public.

## Scope

Security reports are relevant to the InstaPower application, its source code, release packaging, build configuration, update/release process, and project-controlled infrastructure.

Issues in Instagram, Meta, Windows, Electron, Chromium, npm packages, or other third-party software should normally be reported to the appropriate upstream security team as well. If an upstream issue materially affects InstaPower, please explain how it affects the application so we can assess mitigations or updates.

## Responsible Disclosure

Please use coordinated disclosure whenever possible. Avoid publicly posting exploit details while a fix is being developed, particularly when the issue could affect users of a current release.

We appreciate responsible security research that helps make InstaPower safer for its users.

## Security Architecture

InstaPower is designed with security boundaries appropriate for an Electron application that displays remote web content. The project uses, among other measures:

- Context isolation for renderer/preload boundaries.
- Node.js integration disabled for remote page content.
- Electron sandboxing.
- A minimal preload/IPC surface.
- A dedicated persistent application session rather than sharing the user's Microsoft Edge profile.
- No custom storage of Instagram passwords.
- No private or reverse-engineered Instagram APIs.
- No intentional collection of Instagram credentials by the application.
- HTTPS-only request enforcement for the remote Instagram session.
- Origin-scoped browser notification permissions.

Security-sensitive changes should preserve these boundaries and should be reviewed carefully before release.

## Dependency and Build Security

The project uses npm dependencies and automated GitHub Actions builds. Security issues may originate in dependencies or the build/release chain, so dependency and workflow changes should be reviewed with the same care as application code.

Where appropriate, maintainers may use GitHub security features, Dependabot alerts, repository security advisories, and private vulnerability reporting to coordinate remediation.

## Project

**Project:** InstaPower  
**Maintainer:** ThePowerUsers  
**Repository:** https://github.com/ThePowerUsers/InstaPower

Thank you for helping keep InstaPower and its users secure.
