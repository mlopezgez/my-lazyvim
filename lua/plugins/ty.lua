return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        pyright = {
          enabled = false,
        },
        ty = {
          settings = {
            ty = {
              -- ty configuration options go here
              -- See: https://docs.astral.sh/ty/reference/editor-settings/
              inlayHints = {
                variableTypes = false,
                callArgumentNames = false,
              },
              completions = {
                autoImport = true,
              },
            },
          },
        },
      },
    },
  },
}
