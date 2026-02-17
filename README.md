# 💤 Mati's LazyVim Configuration

[![Documentation](https://img.shields.io/badge/📖_Vim_Ninja_Guide-blue?style=for-the-badge)](https://mlopezgez.github.io/my-lazyvim)

This is a personalized Neovim configuration built on top of [LazyVim](https://github.com/LazyVim/LazyVim). It is optimized for Python, Rust, and DevOps workflows, featuring AI integration and customized clipboard behavior.

## ✨ Features

- **AI-Powered Development**: Integrated with [claudecode.nvim](https://github.com/coder/claudecode.nvim) and [opencode.nvim](https://github.com/NickvanDyke/opencode.nvim) for AI-native coding assistance.
- **Enhanced Python Environment**:
  - Uses `ty` as the primary LSP server.
  - Automatic virtual environment selection and LSP switching via `venv-selector.nvim`.
  - Supports Poetry and local `.venv` structures.
- **First-class Rust Support**: Configured with `rustaceanvim` for a robust Rust development experience.
- **UI & UX**: Powered by `snacks.nvim` for a fast file explorer, pickers, and smooth animations.
- **Colorscheme**: [Gruvbox Material](https://github.com/sainnhe/gruvbox-material) (hard/dark).

## 🛠️ Custom Keymaps

### AI (Claude Code)
| Binding | Description |
| --- | --- |
| `<leader>ac` | Toggle Claude terminal |
| `<leader>ar` | Resume previous Claude session |
| `<leader>as` | Send visual selection to Claude |
| `<leader>aa` | Accept Claude's diff changes |

### AI (OpenCode)
| Binding | Description |
| --- | --- |
| `<leader>ot` | Toggle OpenCode |
| `<leader>oa` | Ask OpenCode |
| `<leader>ox` | Execute OpenCode action |
| `go` | Add range to OpenCode (operator) |
| `goo` | Add line to OpenCode |
| `<leader>ou` | OpenCode half page up |
| `<leader>od` | OpenCode half page down |

### Diagnostics & Clipboard
| Binding | Description |
| --- | --- |
| `<leader>cy` | Copy diagnostic under cursor to system clipboard |
| `<leader>cY` | Copy all diagnostics on the current line |
| `<F13>` | Yank to system clipboard (Visual mode) |
| `<F14>` | Paste from system clipboard (Normal/Insert/Visual) |

### Navigation & Files
| Binding | Description |
| --- | --- |
| `<leader>e` | Open Snacks File Explorer |
| `<leader><space>` | Smart file finder |
| `<leader>cv` | Select Python Virtual Environment |
| `gd` / `gr` | LSP Definitions / References (via Snacks Picker) |

## ⚙️ Configuration Details

- **Clipboard**: Uses default LazyVim clipboard behavior. Additional `<F13>`/`<F14>` mappings are available for explicit system clipboard operations.
- **Formatting**: Autoformatting on save is **disabled** by default (`vim.g.autoformat = false`).
- **LSP Servers**: 
  - Python: `ty` (Pyright is disabled).
  - Infrastructure: Terraform, Docker, Helm, and YAML are pre-configured via LazyVim extras.

## 🚀 Installation

1. Back up your current Neovim config:
   ```bash
   mv ~/.config/nvim ~/.config/nvim.bak
   ```
2. Clone this repository:
   ```bash
   git clone https://github.com/mlopezgez/my-lazyvim.git ~/.config/nvim
   ```
3. Open Neovim:
   ```bash
   nvim
   ```
   *Lazy.nvim will automatically install all defined plugins.*

## 📂 Structure

- `lua/config/`: Core settings (options, autocmds, keymaps).
- `lua/plugins/`: Individual plugin specifications and overrides.
- `lazyvim.json`: Enabled LazyVim extras (Languages, DAP, etc.).
