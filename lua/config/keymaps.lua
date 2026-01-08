-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

vim.keymap.set("n", "<leader>cy", function()
  local diagnostics = vim.diagnostic.get(0, { lnum = vim.fn.line(".") - 1 })
  if #diagnostics > 0 then
    local msg = diagnostics[1].message
    vim.fn.setreg("+", msg)
    vim.notify("Copied: " .. msg, vim.log.levels.INFO)
  else
    vim.notify("No diagnostic on this line", vim.log.levels.WARN)
  end
end, { desc = "Copy diagnostic message" })

vim.keymap.set("n", "<leader>cY", function()
  local diagnostics = vim.diagnostic.get(0, { lnum = vim.fn.line(".") - 1 })
  if #diagnostics > 0 then
    local msgs = vim.tbl_map(function(d) return d.message end, diagnostics)
    local text = table.concat(msgs, "\n")
    vim.fn.setreg("+", text)
    vim.notify("Copied " .. #diagnostics .. " diagnostic(s)", vim.log.levels.INFO)
  else
    vim.notify("No diagnostics on this line", vim.log.levels.WARN)
  end
end, { desc = "Copy all diagnostics" })

vim.keymap.set("v", "<F13>", '"+y', { desc = "Copy to system clipboard" })

vim.keymap.set({ "n", "v" }, "<F14>", '"+p', { desc = "Paste from system clipboard" })
vim.keymap.set("i", "<F14>", "<C-r>+", { desc = "Paste from system clipboard" })
