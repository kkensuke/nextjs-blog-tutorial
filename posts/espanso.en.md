---
title: "Let's Use Espanso!"
date: "2024-10-31"
subtitle: "Free and open-source text expander for Windows, macOS, and Linux"
tags: [Snippets]
---


## [Espanso](https://espanso.org/)
Espanso is an open-source, free-to-use, cross-platform snippet app. With Espanso, you can instantly input long text by simply typing short keywords. This makes it easy to enter text that you need to type repeatedly. It's faster and more feature-rich than the standard Mac text replacement feature.

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png)

Espanso works on Windows, macOS, and Linux, and supports advanced features like regular expressions and shell scripts.

![ezgif-1-5219cff875.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/c93e4c1d-18ef-9f17-0db9-9f4e5eff6e08.gif)

![ezgif-1-6d58091dfc.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/833f40ee-47d5-74e9-5bfd-df46d212664e.gif)

## Installation
:::linkcard
https://espanso.org/docs/install/mac/
:::

After installation, open the app. Then, open your terminal and run the command `espanso status` to check if it's running.

## Configuration
:::linkcard
https://espanso.org/docs/get-started/
:::

Espanso's configuration is mainly done in two files:

```sh
espanso/
  config/
    default.yml
  match/
    base.yml
```

The location of the `espanso` directory varies by OS and can be found using the command `espanso path`:

-   Linux: `$XDG_CONFIG_HOME/espanso` (e.g. `/home/user/.config/espanso`)
-   MacOS: `$HOME/Library/Application Support/espanso` (e.g. `/Users/user/Library/Application Support/espanso`)
-   Windows: `{FOLDERID_RoamingAppData}\espanso` (e.g. `C:\Users\user\AppData\Roaming\espanso`)

Initially, you usually don't need to configure anything in the `config/default.yml` file.
If you want to hide the menu bar icon, you can write `show_icon: false`.

## Usage
Snippet settings are written in the `match/base.yml` file.

Basically, you write them using the following syntax:
```yml
matches:
  - trigger: ":hello"
    replace: "world"

# Multi-line
  - trigger: ":hello"
    replace: "line1\nline2"

# Multi-line
  - trigger: ":include newlines"
    replace: |
              exactly as you see
              will appear these three
              lines of poetry

# No newlines (folded)
  - trigger: ":fold newlines"
    replace: >
              this is really a
              single line of text
              despite appearances
```

After changing `match/base.yml`, either select `Reload` from the menu bar or run the command `espanso restart` in the terminal to apply the changes.

:::warning
To prevent unwanted snippet activation, it's a good idea to use symbols you don't normally use, like `:` or `;`, as prefixes.
:::

:::warning
If you register `:a`, triggers like `:as` or `:ad` will no longer work. This is because typing `:a` will immediately replace it with other text. To prevent this, it's best to avoid setting triggers that are too short.
:::

:::tip
All `.yml` files in the `match` directory are loaded, so you can also split files into smaller ones according to their purpose.
:::

## Dynamic Matches
With the following setting, typing `:now` will convert it to the current time, like `It's 11:29`.

```yml
  - trigger: ":now"
    replace: It's {{mytime}}
    vars:
      - name: mytime
        type: date
        params:
          format: "%H:%M"
```

## Word Matches
With the basic `trigger` and `match` setup, unwanted expansions can occur. For example, if you want the trigger `ther` to expand to `there`, typing `other` would also trigger the expansion, resulting in `othere`. To prevent this, add the `word: true` option as shown below.

```yml
  - trigger: "ther"
    replace: there
    word: true
```

## Cursor Hint
After the text is expanded, you can specify the cursor position using `$|$`.

```yml
  - trigger: ":div"
    replace: <div>$|$</div>
```

## One Trigger, Multiple Replacements

```yml
  - trigger: ":quote"
    replace: "Every moment is a fresh beginning."
  - trigger: ":quote"
    replace: "Everything you can imagine is real."
  - trigger: ":quote"
    replace: "Whatever you do, do it well."
```

## Multiple Triggers, One Replacement
```yml
  - triggers: [":hello", ":hi"]
    replace: "world"
```

## Multiple Triggers, Multiple Replacements
```yml
  - triggers: [":ok",":emoji"]
    replace: "👍"
  - triggers: [":ok",":emoji"]
    replace: "✅"
  - triggers: [":up",":emoji"]
    replace: "⬆️"
  - triggers: [":down",":emoji"]
    replace: "⬇️"
```

## Image Matches

```yml
  - trigger: ":cat"
    image_path: "$CONFIG/images/cat.png"
```

## Global Variables
If you have variables that are commonly used across `match`es, setting them as global variables is convenient for making changes.

```yml
global_vars:
  - name: myname
    type: echo
    params:
      echo: "John"

matches:
  - trigger: ":greet"
    replace: "Hello {{myname}}"

  - trigger: ":sig"
    replace: "Best regards, {{myname}}"
```

```yml
global_vars:
  - name: three
    type: shell
    params:
      cmd: "echo three"

matches:
  - trigger: ":myecho"
    replace: "{{three}}"
```

If you want to manage your espanso directory with Git (e.g., on GitHub) but it contains some private parameters, you can put them in `params.yml` and add `params.yml` to your `.gitignore` file. ;traAll `*.yml` files in the `match` directory will be loaded. Otherwise, you can import files by specifying the path directly.


```sh
espanso/
  config/
    default.yml
  match/
    base.yml
    params.yml
```


```yml
# base.yml
imports:
  - "path/to/your.yml"

matches:
  - trigger: ":hello"
    replace: "{{greet}} Jon"
```

## Clipboard Extension
You can include the content of the clipboard in the expanded output. This eliminates the need for a separate paste operation.

For example, if you want to create an HTML `<a>` tag using a link you just copied, define the trigger as follows:
```yml
  - trigger: ":aref"
    replace: "<a href='{{clip}}' />$|$</a>"
    vars:
      - name: "clip"
        type: "clipboard"
```

Markdown trigger example:
```yml
  - trigger: ";mdlink"
    replace: "[$|$]({{clip}})"
    vars:
      - name: "clip"
        type: "clipboard"

  - trigger: ";mdcode"
    replace: |
          ```
          {{clip}}
          ```
    vars:
      - name: "clip"
        type: "clipboard"
```

:::tip
If defining the clipboard variable for each trigger is cumbersome, it's a good idea to define it in `global_vars`.
:::

## Shell Extension
You can also execute shell commands and output their results.

```yml
  - trigger: ":shell"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "echo 'Hello from your shell'"
```

The following example is a trigger that gets your public IP from ipify.
```yml
  - trigger: ":ip"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "curl 'https://api.ipify.org'"
```

The following example is a trigger that generates a UUID (Universally Unique Identifier).
```yml
  - trigger: ";uuid"
    replace: "{{output}}"
    vars:
    - name: output
      type: shell
      params:
        # macOS,Linux:
        cmd: "uuidgen"
        # Windows (requires PowerShell):
        # cmd: "powershell -command \"[guid]::NewGuid().ToString()\""
```

The following multiple examples deviate from the app's original purpose but are triggers for opening apps, websites, or files.

First, triggers to open a terminal or a specific folder.
```yml
  - trigger: ";term"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "open -a Terminal.app"

  - trigger: ";dotfile"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "open ~/github/dotfiles/"
```

A trigger to open the `espanso` directory in VSCode via the terminal. The terminal will open, and `code ~/github/dotfiles/espanso/` will be typed, so pressing Enter will open it.
```yml
  - trigger: ";espanso"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "open -a Terminal.app; echo 'code ~/github/dotfiles/espanso/'"
```

:::warning
You can also write it to call directly as shown below, but there's a possibility that part of the currently open file might be erased.
```yml
  - trigger: ";espanso"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "code ~/github/dotfiles/espanso/"
```
:::

A trigger to create a new file with `CotEditor.app` and open it.
```yml
  - trigger: ";newfile"
    replace: "{{output}}"
    vars:
      - name: uuid
        type: shell
        params:
          cmd: "uuidgen"
      - name: output
        type: shell
        params:
          cmd: "cd ~/Desktop; touch {{uuid}}.md; open /Applications/CotEditor.app {{uuid}}.md"
```

A trigger to open YouTube. It opens in the default browser.
```yml
  - trigger: ";you"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "open 'https://www.youtube.com/'"
```

A trigger to search for the content copied to the clipboard.
```yml
  - trigger: ";ggl"
    replace: "{{output}}"
    vars:
      - name: "clip"
        type: "clipboard"
      - name: output
        type: shell
        params:
          cmd: "open 'https://www.google.com/search?q={{clip}}'"
```

A trigger to translate the content copied to the clipboard using Google Gemini. Please define `GEMINI_API_KEY` in `global_vars` before using.
```yml
  - trigger: ";transen"
    replace: "{{translation}}"
    vars:
      - name: translation
        type: shell
        params:
          cmd: >
            curl -s \
              "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={{GEMINI_API_KEY}}" \
              -H 'Content-Type: application/json' \
              -X POST \
              -d '{
                    "contents": [{
                      "parts": [{"text": "Translate the following to English. Provide ONLY the translated text, no explanations or markdown: {{clipboard}}"}]
                    }]
                  }' \
            | jq -r '.candidates[0].content.parts[0].text | split("\n")[0]'
```

:::tip
By changing the command, you can create various kinds of triggers!
:::

## Script Extension
You can also execute external scripts and receive their results.

`script.py`
```py
print("Hello from python")
```

`base.yml`
```yml
  - trigger: ":pyscript"
    replace: "{{output}}"
    vars:
      - name: output
        type: script
        params:
          args:
            - python
            - /path/to/your/script.py
```

## Form Extension
You can also generate a form from a trigger and create text based on a template.

```yml
  - trigger: ":greet"
    form: |
      Hey [[name]],
      Happy Birthday!
```

![screenshot.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/0d085e75-b23a-70af-604d-834d64d961d5.png)

The following setting creates the expanded text from an email template form.
```yml
matches:
  - trigger: ";reply"
    form: |
        Hi, [[name]]
        
        Thank you for your email and for bringing this to our attention.
        I am sorry that you're disappointed with our product.
        
        [[choices]]

        Looking forward to hearing from you
        
        All the best,
        ABC Support Team
    form_fields:
      choices:
        type: choice
        values:
          - Could you please let me know what specific issues you've encountered?
          - sentence 2
          - sentence 3
          - sentence 4
```

![screenshot.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/adbd6d0e-377d-4072-8148-6904f2580930.png)

As a more complex example of using forms, you can create a Todo item like this:
```yml
global_vars:
  - name: "today"
    type: date
    params:
      format: "%Y/%m/%d"
  - name: "day1"
    type: shell
    params:
      # For macOS/Linux (BSD date)
      cmd: "date -v+1d '+%Y/%m/%d'"
      # For GNU date (common on Linux)
      # cmd: "date -d '+1 day' '+%Y/%m/%d'"
  - name: "day2"
    type: shell
    params:
      cmd: "date -v+2d '+%Y/%m/%d'"
  - name: "day3"
    type: shell
    params:
      cmd: "date -v+3d '+%Y/%m/%d'"
  - name: "day4"
    type: shell
    params:
      cmd: "date -v+4d '+%Y/%m/%d'"
  - name: "day5"
    type: shell
    params:
      cmd: "date -v+5d '+%Y/%m/%d'"
  - name: "day6"
    type: shell
    params:
      cmd: "date -v+6d '+%Y/%m/%d'"

matches:
  - trigger: ";todo"
    form: "Task: [[task]], Due Date: [[day]] [[time]]"
    form_fields:
      day:
        type: choice
        values: |
                {{today}}
                {{day1}}
                {{day2}}
                {{day3}}
                {{day4}}
                {{day5}}
                {{day6}}
      time:
        type: choice
        values:
          - "9:00"
          - "10:00"
          - "11:00"
          - "12:00"
          - "13:00"
          - "14:00"
          - "15:00"
          - "16:00"
          - "17:00"
          - "18:00"
          - "19:00"
          - "20:00"
```

![SCR-20240618-qyki.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/932694e0-8a4f-5c6d-8f57-d7bb38eca3de.png)

## Examples

Examples of triggers that couldn't be included here can be found in the following repository:
:::linkcard
https://github.com/kkensuke/dotfiles/tree/main/espanso/match
:::

Alternatively, the following site is also helpful:
:::linkcard
https://ee.qqv.com.au/usage/cookbook/
:::