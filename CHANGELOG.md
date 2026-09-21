# Changelog

## Unreleased

### Desktop experience

- Added a native settings panel for Windows integration, tray behavior, notifications, and update checks.
- Added system tray controls and optional launch-at-login/minimize-to-tray behavior.
- Added native notifications for completed downloads and available releases.
- Added app-local keyboard shortcuts for settings, reload, and minimize.
- Added native download save handling with completion notifications.

### Reliability and security

- Added periodic and manual GitHub release update checks.
- Added automated smoke tests covering branding, Electron isolation, and release security configuration.
- Added HTTPS-only request enforcement for the remote Instagram session.
- Added permission gating so browser notifications are only granted to the Instagram origin.

### Release infrastructure

- Added CycloneDX dependency SBOM generation.
- Added GitHub artifact provenance attestations for Windows executables.
- Added optional Windows signing credential wiring through GitHub Actions secrets; no credentials are stored in the repository.

## InstaPower v1.0.0

Initial Windows release.

### Included

- Dedicated Instagram desktop window
- Persistent isolated Instagram session
- Windows setup wizard with selectable installation directory
- Start Menu and Desktop shortcuts
- Portable Windows executable
- Electron security hardening
- MIT-licensed open-source project

### Packaging

- Windows installer and portable builds use maximum compression.
- Production packaging excludes unnecessary package metadata.
- Release assets include SHA-256 checksums for Windows executables.
