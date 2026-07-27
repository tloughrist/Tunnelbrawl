# syntax=docker/dockerfile:1
# Production image for the Tunnel Brawl Rails 8 API.
# Build:  docker build -t tunnelbrawl-api .
# Run:    docker run -p 3000:3000 -e RAILS_MASTER_KEY=... -e DATABASE_URL=... tunnelbrawl-api

ARG RUBY_VERSION=3.4.10
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails

# Runtime deps: libpq5 for the pg gem, curl for the container health check.
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libpq5 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test" \
    RAILS_LOG_TO_STDOUT="1"

# --- build stage: install gems, precompile bootsnap ---
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

COPY . .
RUN bundle exec bootsnap precompile app/ lib/

# --- final image ---
FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

# Run as an unprivileged user.
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails log tmp
USER 1000:1000

EXPOSE 3000
# SOLID_QUEUE_IN_PUMA is set in the task definition so jobs run inside Puma.
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
