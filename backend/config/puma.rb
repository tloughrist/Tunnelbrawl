# This configuration file will be evaluated by Puma. The top-level methods that
# are invoked here are part of Puma's configuration DSL. For more examples of
# configuration options, see https://github.com/puma/puma.

# Puma serves each request in a thread from an internal thread pool.
threads_count = ENV.fetch("RAILS_MAX_THREADS", 5)
threads threads_count, threads_count

# Specifies the `worker_timeout` threshold that Puma will use to wait before
# terminating a worker in development environments.
worker_timeout 3600 if ENV.fetch("RAILS_ENV", "development") == "development"

# Specifies the `port` that Puma will listen on to receive requests; default is 3000.
port ENV.fetch("PORT", 3000)

# Allow puma to be restarted by `bin/rails restart` command.
plugin :tmp_restart

# Run the Solid Queue worker supervised inside Puma when SOLID_QUEUE_IN_PUMA is set,
# so a single web service process handles both HTTP requests and background jobs.
plugin :solid_queue if ENV["SOLID_QUEUE_IN_PUMA"]

# Only use a pidfile when requested.
pidfile ENV["PIDFILE"] if ENV["PIDFILE"]
