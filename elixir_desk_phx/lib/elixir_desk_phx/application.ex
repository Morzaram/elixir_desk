defmodule ElixirDeskPhx.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      ElixirDeskPhxWeb.Telemetry,
      # Start the Ecto repository
      ElixirDeskPhx.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: ElixirDeskPhx.PubSub},
      # Start Finch
      {Finch, name: ElixirDeskPhx.Finch},
      # Start the Endpoint (http/https)
      ElixirDeskPhxWeb.Endpoint
      # Start a worker by calling: ElixirDeskPhx.Worker.start_link(arg)
      # {ElixirDeskPhx.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ElixirDeskPhx.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ElixirDeskPhxWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
