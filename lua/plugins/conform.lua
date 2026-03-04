return {
  {
    "stevearc/conform.nvim",
    opts = {
      default_format_opts = {
        timeout_ms = 10000,
      },
      formatters_by_ft = {
        jinja = { "djlint" },
      },
    },
  },
  {
    "mason-org/mason.nvim",
    opts = { ensure_installed = { "djlint" } },
  },
}
