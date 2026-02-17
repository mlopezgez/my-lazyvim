return {
  {
    "mortepau/codicons.nvim",
    init = function()
      vim.g.codicons_extension_cmp_disable = true
    end,
    config = function()
      require("codicons").setup()
    end,
  },
}
