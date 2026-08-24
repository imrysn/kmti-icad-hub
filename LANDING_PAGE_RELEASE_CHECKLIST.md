# KMTI Training Hub — Landing Page Release Checklist

## Content and plans

- [ ] Confirm the public names, descriptions, prices, currencies, and billing intervals in Admin → Organization → Access plans.
- [ ] Replace any temporary marketing copy with approved KMTI wording.
- [ ] Confirm the plan comparison matches the entitlements actually assigned by the backend.
- [ ] Verify the Terms of Service and Privacy Policy with the responsible KMTI reviewer.

## Registration journey

- [ ] Test each landing-page plan button and confirm the requested plan is selected on registration.
- [ ] Test email verification, administrator approval, approval email, and first sign-in.
- [ ] Confirm rejected and duplicate applications show clear messages.

## Responsive and accessible UI

- [ ] Review desktop, tablet, and mobile layouts in light and dark mode.
- [ ] Test the mobile navigation with touch, keyboard, and screen-reader labels.
- [ ] Confirm focus indicators, skip navigation, FAQ controls, and reduced-motion behavior.
- [ ] Check text contrast and zoom the page to 200% without losing controls or content.

## Production configuration

- [ ] Configure the production frontend and API origins, HTTPS, CORS, and trusted hosts.
- [ ] Configure the production email provider and remove development-only verification links.
- [ ] Apply database migrations and confirm the three canonical public access plans.
- [ ] Configure backups, monitoring, error reporting, and log retention.
- [ ] Replace local fallback storage with the approved production database and storage services.

## Verification and launch

- [ ] Run the landing-page automated tests and frontend type check.
- [ ] Run backend access-plan and registration tests against the release configuration.
- [ ] Test the public page with an empty cache and a throttled connection.
- [ ] Verify search metadata and structured course/offer data in the deployed page.
- [ ] Complete a final registration-to-course-access smoke test before publishing the company website link.
