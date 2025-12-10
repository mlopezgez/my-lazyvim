return {
  "yetone/avante.nvim",
  event = "VeryLazy",
  lazy = false,
  version = false,

  build = "make",

  opts = {
    provider = "codeen",
    mode = "agentic",

    providers = {
      codeen = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "claude-sonnet-4-5-latest",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
        context_window = 200000, -- This is input context
      },

      ["codeen-opus"] = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "claude-opus-4-1",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
      },

      ["codeen-sonnet-4"] = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "claude-sonnet-4",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
      },

      ["codeen-gemini-pro"] = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "gemini-2.5-pro",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
      },

      ["codeen-gemini-flash"] = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "gemini-2.5-flash",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
      },

      ["codeen-gpt5"] = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "gpt-5",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
      },

      ["codeen-gpt5-mini"] = {
        __inherited_from = "openai",
        endpoint = "http://127.0.0.1:8150/cosmos/genai-gateway/v1",
        model = "gpt-5-mini",
        api_key_name = "CODEEN_API_KEY",
        timeout = 30000,
      },
    },

    behaviour = {
      auto_suggestions = false,
      auto_set_highlight_group = true,
      auto_set_keymaps = true,
      auto_apply_diff_after_generation = false,
      support_paste_from_clipboard = false,
    },
  },

  dependencies = {
    "stevearc/dressing.nvim",
    "nvim-lua/plenary.nvim",
    "MunifTanjim/nui.nvim",
    "nvim-tree/nvim-web-devicons",
  },
}
