return {
  {
    "braxtons12/blame_line.nvim",
    config = function()
      require("blame_line").setup({
        show_in_visual = true,
        show_in_insert = true,
        prefix = " ",
        template = "<author> • <author-time> • <summary>",
        date = {
          relative = true,
          format = "%d-%m-%y",
        },
        hl_group = "BlameLineNvim",
        delay = 0,
      })
    end,
  },
}
