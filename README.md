
# Cortano Landing

Landing page for Cortano Project (https://cortano.app)


## Run Locally

Clone the project

```bash
  git clone git@github.com:CortanoAPP/landing.git
```

Go to the project directory

```bash
  cd landing
```

Install dependencies

```bash
  bun install
```

Start the server

```bash
  bun dev
```

## Deployment

This project is configured for automatic deployment to Cloudflare Workers using GitHub Actions.

### Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account with Workers enabled
2. **Domain Configuration**: Set up your domain in Cloudflare (optional for preview deployments)

### GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

#### Required Secrets:
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Workers permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

#### Optional Secrets (for PostHog analytics):
- `NEXT_PUBLIC_POSTHOG_KEY`: Your PostHog project key
- `NEXT_PUBLIC_POSTHOG_HOST`: Your PostHog host URL

### Getting Cloudflare Credentials

1. **API Token**: 
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template or create custom token with:
     - Zone:Zone:Read
     - Zone:Zone Settings:Read  
     - User:User Details:Read
     - Account:Cloudflare Workers:Edit

2. **Account ID**:
   - Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Copy the Account ID from the right sidebar

### Deployment Environments

- **Preview**: Automatically deploys on Pull Requests to a preview environment
- **Production**: Automatically deploys when code is pushed to `main` or `production` branches

### Manual Deployment

You can also deploy manually using:

```bash
# Preview deployment
bun run preview

# Production deployment  
bun run deploy
```

### Wrangler Configuration

The project uses `wrangler.jsonc` for Cloudflare Workers configuration. Update the `name` field to match your desired worker name.


## Screenshots

![App Screenshot](https://upload.cortano.app/ctr.png)


## Authors

- [@stripsior](https://www.github.com/stripsior)


## License

[MIT](https://choosealicense.com/licenses/mit/)

