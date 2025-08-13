# CAT Timer - Vercel Deployment

## Deploy

- Push this repo to GitHub
- Import into Vercel and deploy with defaults

## Notes

- API routes: `/api/roadmap` and `/api/progress` run as Edge Functions
- Data is stored in Vercel Blob at `small-data/roadmap.json` and `small-data/user-progress.json`
- Frontend is static: `index.html`, `styles.css`, `script.js`

No server build needed.
