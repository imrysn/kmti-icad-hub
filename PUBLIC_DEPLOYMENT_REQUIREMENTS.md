# KMTI Training Hub — Simple Public Deployment Guide

## Goal

Let external trainees use KMTI Training Hub in a browser.

- Trainees use a browser to learn and submit CAD files.
- Trainers use a browser to download trainee files and upload Excel checkbacks.
- iCAD and Excel stay installed on each trainee's or trainer's own computer.

## What we can use now

Use the current cPanel account for a **small staging test only**.

It already has:

- Setup Python App
- Application Manager
- SSH access
- MySQL tools
- SSL tools
- File Manager and backups

It has limited resources, so it is not recommended for many public users yet.

## What we need before public launch

1. Upgrade the hosting plan.

   Ask Zoom Hosting for a managed VPS with cPanel/WHM, or an equivalent business plan.

2. Ask for these minimum hosting requirements.
 
   - Python 3.11 or newer
   - Setup Python App / Application Manager
   - WebSocket and Socket.IO support
   - SSH access
   - MySQL database
   - At least 2 CPU cores
   - At least 4 GB RAM
   - At least 50 GB SSD storage
   - Private file storage outside `public_html`
   - Daily backups
   - HTTPS / SSL certificate

3. Create a public address.

   Example: `training.kmti.com.ph`

4. Create a testing address first.

   Example: `staging-training.kmti.com.ph`

5. Create a production MySQL database.

   Keep this separate from the staging database.

6. Create a private folder for CAD and Excel files.

   This folder must be outside `public_html` so trainees cannot access other trainees' files.

7. Set up backups.

   Back up the MySQL database and uploaded files every day.

8. Set up the company email sender.

   Use an address such as `training@kmti.com.ph` for password resets and notifications.
   Enable SPF, DKIM, and DMARC, then test delivery to Gmail and Outlook.

## Simple deployment steps

### Step 1 — Finish development

- Complete browser features.
- Fix production build errors.
- Test Japanese lessons, CAD upload/download, and Excel checkbacks.

### Step 2 — Test on the current cPanel account

- Create the staging subdomain.
- Deploy a small Python/WebSocket test app.
- Confirm that browser uploads, downloads, and notifications work.

### Step 3 — Upgrade hosting

- Purchase the approved VPS/business cPanel plan.
- Confirm it supports Python, WebSockets, MySQL, private storage, and backups.

### Step 4 — Deploy staging

- Create the staging database and private upload folder.
- Deploy the frontend and Python backend.
- Use HTTPS.
- Test with a small group of trainees and trainers.

### Step 5 — Deploy production

- Create the production domain, database, and private upload folder.
- Configure backups and company email.
- Deploy the version that passed staging tests.

### Step 6 — Start with a pilot

- Invite a few trainees and trainers first.
- Check CAD submission, Excel feedback, and login flows.
- Fix issues before opening the system to more users.

## Before going public: final checklist

- [ ] The app production build succeeds.
- [ ] Staging tests are complete.
- [ ] HTTPS is active.
- [ ] CAD and Excel files are private.
- [ ] Database and file backups work.
- [ ] Trainee, trainer, and admin permissions work correctly.
- [ ] Password-reset emails arrive successfully.
- [ ] CAD upload/download and Excel checkback work.
- [ ] Privacy policy and terms of use are ready.

## Do not do these

- Do not put trainee CAD files in `public_html`.
- Do not put passwords or secret keys in the source code.
- Do not launch directly without a staging test.
- Do not use the current shared cPanel plan for a large public launch.
