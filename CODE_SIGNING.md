# Code signing policy

InstaPower is an open-source Windows desktop application maintained by ThePowerUsers.

## Code signing

**Free code signing provided by SignPath.io, certificate by SignPath Foundation.**

When the project is accepted into the SignPath Foundation program, published Windows release binaries are intended to be signed through SignPath's trusted GitHub Actions integration. SignPath origin verification is used to link signed artifacts to this repository and the GitHub build that produced them.

The signing workflow is designed for release artifacts built from this repository's source code and build configuration. Signing requests for published releases require the approval process configured by SignPath.

## Team roles

- **Committers and reviewers:** repository maintainers and trusted contributors with write access to ThePowerUsers/InstaPower. Changes from contributors without direct write access should be reviewed before merging.
- **Approvers:** the project maintainer(s) designated in the SignPath project as release-signing approvers.

The exact SignPath users and permissions are managed in SignPath and may change as the project team changes.

## Privacy

InstaPower does not intentionally collect or send Instagram credentials to ThePowerUsers. Instagram content and authentication are handled by Instagram in the application's dedicated browser session. InstaPower may contact external services when the user uses features that require them, such as loading Instagram or checking GitHub release information for updates.

This program will not intentionally transfer information to other networked systems unless specifically requested by the user or required by an application feature described in the project's documentation.

## What is signed

The SignPath workflow is intended to sign the two public Windows release executables:

- InstaPower-<version>-Setup-x64.exe
- InstaPower-<version>-portable-x64.exe

Unsigned build artifacts are never intended to be presented as SignPath-signed releases.

## Source and build integrity

The GitHub Actions workflow, build configuration, packaging configuration, and source code are part of the reviewable project source. Release signing should only be performed from the project's trusted GitHub build workflow.

The project does not use SignPath to sign third-party software independently of InstaPower. Third-party components may be included as dependencies of the application as permitted by their respective licenses and distribution terms.

## Fallback

If SignPath Foundation does not accept the project, or if the service is temporarily unavailable, the project can continue to produce unsigned Windows builds. The repository retains a pre-SignPath backup branch so the SignPath integration can be reverted without losing the existing release configuration.
