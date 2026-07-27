# Tunnel Brawl — Backend

Rails 8 (Ruby 3.4), API-only backend for **[Tunnel Brawl](../README.md)**, a real-time 2–4 player
chess variant. It exposes a REST + Action Cable (WebSocket) API, holds the game-rules engine, and
runs real-time messaging and background jobs on PostgreSQL via **Solid Cable** and **Solid Queue**
(no Redis). Authentication is cookie-based sessions with `bcrypt`.

See the [top-level README](../README.md) for the full project overview, architecture, and game rules.

## Run

```bash
bundle install
bin/rails db:create db:migrate
bin/rails server -p 3000
```

Configure the database with `DATABASE_URL` (or `PGHOST` / `PGPORT` — the dev config defaults to port
5433). Run the test suite with `bin/rails test`. Set `SOLID_QUEUE_IN_PUMA=true` to run background jobs
inside the web process (used in production).
