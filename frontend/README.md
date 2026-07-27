# Tunnel Brawl — Frontend

Vite + React 18 single-page app for **[Tunnel Brawl](../README.md)**, a real-time 2–4 player chess
variant. It renders the board and lobby, talks to the Rails API over REST (cookie sessions), and
subscribes to Action Cable via `@rails/actioncable` for live board updates.

See the [top-level README](../README.md) for the full project overview, architecture, and game rules.

## Run

```bash
npm install
npm run dev        # serves on http://localhost:4000
```

The API base URL is read from `VITE_API_URL` (see `.env.development`, which defaults to
`http://localhost:3000`). Build for production with `npm run build`.
