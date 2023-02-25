defmodule ElixirDeskPhx.Repo do
  use Ecto.Repo,
    otp_app: :elixir_desk_phx,
    adapter: Ecto.Adapters.Postgres
end
