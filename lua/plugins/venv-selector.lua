return {
  {
    "linux-cultist/venv-selector.nvim",
    dependencies = {
      "neovim/nvim-lspconfig",
      "nvim-telescope/telescope.nvim",
    },
    ft = "python",
    keys = {
      { "<leader>cv", "<cmd>VenvSelect<cr>", desc = "Select Python venv" },
      { "<leader>cV", "<cmd>VenvSelectCached<cr>", desc = "Use cached venv" },
    },
    opts = {
      options = {
        set_environment_variables = true, -- Sets VIRTUAL_ENV automatically
        activate_venv_in_terminal = true, -- Activates in terminal too
        notify_user_on_venv_activation = true,
        -- Restart ty when venv changes
        on_venv_activate_callback = function()
          -- Restart ty to pick up new venv
          local clients = vim.lsp.get_clients({ name = "ty" })
          if #clients > 0 then
            vim.defer_fn(function()
              vim.cmd("LspRestart ty")
            end, 100)
          end
        end,
      },
      search = {
        cwd = {
          command = "fd 'python$' .venv --full-path --color never -a",
        },
        poetry = {
          command = "fd 'python$' ~/Library/Caches/pypoetry/virtualenvs --full-path --color never -a",
        },
      },
    },
  },
}
