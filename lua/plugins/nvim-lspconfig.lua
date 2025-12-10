return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        -- Set the tflint server to not be automatically set up by Mason/lspconfig
        tflint = {
          mason = false, -- Prevent Mason from managing/installing it
          enabled = false, -- Explicitly disable the server
        },
      },
    },
  },
}

