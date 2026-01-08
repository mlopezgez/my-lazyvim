-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here

vim.g.lazyvim_python_lsp = "ty"
vim.g.lazyvim_python_ruff = "ruff"
vim.g.autoformat = false

-- Keep system clipboard separate from Neovim registers
-- This makes y, d, c, etc. use Neovim's internal registers only
vim.opt.clipboard = ""
