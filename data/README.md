# Data Storage Policy

Application source code and runtime/user data must be managed separately.

## Versioned data

Only small, sanitized fixtures needed for automated tests or deterministic local setup should be committed. Fixtures must not contain employee/customer identifiers, credentials, proprietary submissions, or production exports.

## External data

The following belong in approved deployment storage or a controlled artifact store rather than normal Git history:

- user submissions and feedback uploads;
- runtime databases, logs, caches, and generated audio;
- production knowledge-base exports;
- proprietary CAD/reference files that are not intentionally released with the application.

`master_units/` is currently versioned and must remain unchanged until its owner decides whether it is approved source data, Git LFS content, or externally managed deployment data.

## Local development

Local runtime folders are created as needed and ignored by Git. Never copy production data into a developer checkout unless it has been explicitly approved and sanitized.

## Backup and restore

Before untracking or relocating existing data, the project owner must confirm the authoritative storage location, encryption and access controls, retention requirements, backup frequency, and a tested restore procedure.

Removing a file from the current Git index does not remove it from Git history. If sensitive data was committed, rotate affected credentials and perform a separately approved history-cleaning procedure.
