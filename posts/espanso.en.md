---
title: "Let's Use Espanso!"
date: "2024-10-31"
subtitle: "Free and open-source text expander for Windows, macOS, and Linux"
tags: [Snippets]
---

## [Espanso](https://espanso.org/)
Espanso is a free, open-source, cross-platform text expander. With Espanso, you can instantly input long text by typing short keywords. This makes it easy to input text that you need to repeat frequently. It's faster and more feature-rich than Mac's built-in text replacement.

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png)

Espanso works on Windows, macOS, and Linux, supporting advanced features like regular expressions and shell scripts.

![ezgif-1-5219cff875.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/c93e4c1d-18ef-9f17-0db9-9f4e5eff6e08.gif)

![ezgif-1-6d58091dfc.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/833f40ee-47d5-74e9-5bfd-df46d212664e.gif)




## Installation
:::linkcard
https://espanso.org/docs/install/mac/
:::

After installation, open the app. Verify it's running by executing `espanso status` in the terminal.

## Configuration
:::linkcard
https://espanso.org/docs/get-started/
:::

Espanso's configuration primarily uses two files:

```sh
espanso/
  config/
    default.yml
  match/
    base.yml
```

The `espanso` directory location varies by OS and can be found using `espanso path`:

- Linux: `$XDG_CONFIG_HOME/espanso` (e.g. `/home/user/.config/espanso`)
- MacOS: `$HOME/Library/Application Support/espanso`
- Windows: `{FOLDERID_RoamingAppData}\espanso`

Initially, `config/default.yml` doesn't need configuration.
To hide the menubar icon, add `show_icon: false`.


## Usage
Configure snippets in `match/base.yml`.

Basic syntax:
```yml
matches: 
  - trigger: ":hello"
    replace: "world"

# Multiple lines
  - trigger: ":hello"
    replace: "line1\nline2"

# Multiple lines (preserved formatting)
  - trigger: ":include newlines"
    replace: |
              exactly as you see
              will appear these three
              lines of poetry

# Single line (folded newlines)
  - trigger: ":fold newlines"
    replace: >
              this is really a
              single line of text
              despite appearances
```

After modifying `match/base.yml`, click `Reload` in the menubar or run `espanso restart`.

:::warning
- Use prefixes like `:` or `;` to prevent unwanted triggers
- Avoid short triggers like `:a` as they prevent longer triggers (`:as`, `:ad`) from working
:::

:::note
All `.yml` files in the `match` directory are loaded, allowing organization by purpose.
:::

## Dynamic Matches
Example: `:now` outputs current time like `It's 11:29`:

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
Use `word: true` to prevent unwanted replacements:

```yml
  - trigger: "ther"
    replace: there
    word: true
```

## Cursor Hints
Set cursor position after replacement using `$|$`:

```yml
  - trigger: ":div"
    replace: <div>$|$</div>
```

## Multiple Replacements for One Trigger
```yml
  - trigger: ":quote"
    replace: "Every moment is a fresh beginning."
  - trigger: ":quote"
    replace: "Everything you can imagine is real."
  - trigger: ":quote"
    replace: "Whatever you do, do it well."
```

## Multiple Triggers for One Replacement
```yml
  - triggers: [":hello", ":hi"]
    replace: "world"
```

## Multiple Triggers for Multiple Replacements
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

## Shell Extension
Execute shell commands and output results:

```yml
  - trigger: ":shell"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "echo 'Hello from your shell'"
```

Example getting public IP from ipify:
```yml
  - trigger: ":ip"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "curl 'https://api.ipify.org'"
```

## Global Variables
Set commonly used variables globally:

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

You can import global variables from other files:

```yml
imports:
  - "/path/to/other/matchsets.yml"

matches:
  - trigger: ":hello"
    replace: "{{greet}} Jon"
```

## Script Extension
Execute external scripts:

```python[title=script.py]
print("Hello from python")
```

```yml[title=match/base.yml]
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
Generate forms from triggers:

```yml
  - trigger: ":greet"
    form: |
      Hey [[name]],
      Happy Birthday!
```

![screenshot.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/0d085e75-b23a-70af-604d-834d64d961d5.png)


Example email template form:
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



Complex form example - Todo item creation:
```yml
global_vars:
  - name: "today"
    type: date
    params:
      format: "%Y/%m/%d"
  - name: "day1"
    type: shell
    params:
      cmd: "date -v+1d '+%Y/%m/%d'"
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


## Example
```yml[title=match/base.yml]
imports:
  - "params.yml"


matches:

# Espanso
  - trigger: ";trg"
    replace: "  - trigger: \"\"\n  replace: \"\"$|$"


# Private
  - trigger: ";name"
    replace: "{{name}}"
  - trigger: ";Name"
    replace: "{{Name}}"

  - trigger: ";m1"
    replace: "{{email1}}"
  - trigger: ";m2"
    replace: "{{email2}}"

  - trigger: ";tonai"
    replace: "{{address1}}"
  - trigger: ";jikka"
    replace: "{{address2}}"


# Business
  - trigger: ";contact"
    replace: |
            Phone:   03-1234-5678
            Email: example@example.com


# Symbols
  - trigger: ";ctrl"
    replace: "⌃"
  - trigger: ";cmd"
    replace: "⌘"
  - trigger: ";shift"
    replace: "⇧"
  - trigger: ";opt"
    replace: "⌥"
  - trigger: ";kall"
    replace: "⌃⌥⇧⌘"


# Emoji
  - triggers: [";ok",";emoji"]
    replace: "👍"
  - triggers: [";ok",";emoji"]
    replace: "✅"
  - triggers: [";up",";emoji"]
    replace: "⬆️"
  - triggers: [";down",";emoji"]
    replace: "⬇️"
  - triggers: [";pc",";emoji"]
    replace: "🧑‍💻"
  - triggers: [";pc",";emoji"]
    replace: "💻"
  - triggers: [";bow",";emoji"]
    replace: "🙇"
  - triggers: [";bow",";emoji"]
    replace: "🙇‍♂️"
  - triggers: [";smile",";emoji"]
    replace: "😊"
  - triggers: [";sw",";emoji"]
    replace: "😅"
  - triggers: [";sw",";emoji"]
    replace: "💦"
  - triggers: [";ll",";emoji"]
    replace: "😂"
  - triggers: [";tear",";emoji"]
    replace: "🥲"
  - triggers: [";glass",";emoji"]
    replace: "😎"
  - triggers: [":think",":emoji"]
    replace: "🤔"
  - triggers: [";cry",";emoji"]
    replace: "😭"
  - triggers: [";exp",";emoji"]
    replace: "🤯"
  - triggers: [";sleep",";emoji"]
    replace: "😪"
  - triggers: [";sleep",";emoji"]
    replace: "😴"
  - triggers: [";sheep",";emoji"]
    replace: "🐑"


## ChatGPT
  - trigger: ";summ"
    replace: "Please summarize the following text: "
  - trigger: ";how"
    replace: "Please explain how to $|$"
  - trigger: ";mail"
    replace: "Please write an email about the following topic politely: "


# math
# Multiplication. Usage: ;mul(43,533)
  - regex: ";mul\\((?P<num1>.*),(?P<num2>.*)\\)"
    replace: "{{result}}"
    vars:
      - name: result
        type: shell
        params:
          cmd: "expr $ESPANSO_NUM1 '*' $ESPANSO_NUM2"
# Division. Usage: ;div(533,43)
  - regex: ";div\\((?P<num1>.*),(?P<num2>.*)\\)"
    replace: "{{result}}"
    vars:
      - name: result
        type: shell
        params:
          cmd: "expr $ESPANSO_NUM1 / $ESPANSO_NUM2"
# Power. Usage: ;pow(5,9)
  - regex: ";pow\\((?P<num1>.*),(?P<num2>.*)\\)"
    replace: "{{result}}"
    vars:
      - name: result
        type: shell
        params:
          cmd: "echo $[$ESPANSO_NUM1 ** $ESPANSO_NUM2]"
# Square Root. Usage: ;sqrt(643459)
  - regex: ";sqrt\\((?P<num>.*)\\)"
    replace: "{{result}}"
    vars:
      - name: result
        type: shell
        params:
          cmd: "echo $[$ESPANSO_NUM ** 0.5]"



# programming
  - trigger: ";local"
    replace: "localhost:3000/"

  - trigger: ";lorem"
    replace: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Donec sed odio operae, eu vulputate felis rhoncus. Salutantibus vitae elit libero, a pharetra augue. Nihil hic munitissimus habendi senatus locus, nihil horum? A communi observantia non est recedendum."


# markdown
  - trigger: "-["
    replace: "- [ ] "

  - trigger: ";["
    replace: "[$|$]()"

  - trigger: ";br"
    replace: "<br/>"

  - trigger: "``js"
    replace: "```javascript\n$|$\n```"

  - trigger: "``pt"
    replace: "```plaintext\n$|$\n```"

  - trigger: "``sh"
    replace: "```shell\n$|$\n```"

  - trigger: "``ts"
    replace: "```typescript\n$|$\n```"

  - trigger: "``y"
    replace: "```yaml\n$|$\n```"


# Latex
  - trigger: ";fr"
    replace: "\\frac{$|$}{}"

  - trigger: ";sq"
    replace: "\\sqrt{$|$}"

  - trigger: ";cd"
    replace: "\\cdot"

  - trigger: ";align"
    replace: |
            \begin{align}
            #    $|$
            #    &= \\
            #    &= 
            \end{align}

  - trigger: ";lfig"
    replace: |
            \begin{figure}[H]
                \centering
                \includegraphics[width=10cm]{$|$.pdf}
                \caption{}
                \label{fig:}
            \end{figure}

  - trigger: ";lth"
    replace: |
            \begin{theorem}
                $|$
                \begin{align}
                \end{align}
            \end{theorem}

  - regex: ";lit"
    replace: |
            \begin{itemize}
            %    \item $|$
            \end{itemize}


# Python
  - trigger: ";np"
    replace: "import numpy as np"

  - trigger: ";mat"
    replace: "import matplotlib.pyplot as plt"

  - trigger: ";class"
    replace: |
            class Name:
                def __init__(self, , ):
                    self. = 
                    self. = 
            
                def method(self):
                    pass

  - trigger: ";open"
    replace: |
            with open('example.txt', 'r') as file:
                content = file.read()
                print(content)
            
            with open('example.txt', 'w') as file:
                file.write('New content')

  - trigger: ";pkl"
    replace: |
            import pickle
            
            # Function to save data to a file using pickle
            def save_data(data, filename):
                try:
                    with open(filename, 'wb') as f:
                        pickle.dump(data, f)
                    print(f"Data saved to {filename} successfully.")
                except IOError:
                    print(f"Error saving data to {filename}.")
            
            # Function to load data from a file using pickle
            def load_data(filename):
                try:
                    with open(filename, 'rb') as f:
                        data = pickle.load(f)
                    print(f"Data loaded from {filename} successfully.")
                    return data
                except IOError:
                    print(f"Error loading data from {filename}.")
                    return None
            
            # Save data
            save_data(example_data, 'example_data.pkl')
            
            # Load data
            loaded_data = load_data('example_data.pkl')

  - trigger: ";plot"
    replace: |
            plt.plot(, , color="black", linestyle='dashed', marker="o")
            plt.xlabel("", fontsize=18)
            plt.ylabel("$\partial_{\\theta} C$", fontsize=18)
            plt.xticks(fontsize=18)
            plt.yticks(fontsize=18)
            # plt.ylim([1e-7, 1e-0])
            plt.legend(bbox_to_anchor=(1.01, 1), loc="upper left", fontsize=18)
            plt.title(f"", fontsize=18)
            # plt.savefig(f"{}", bbox_inches="tight")
            plt.show()


# date
  - trigger: ";today"
    replace: "{{today}}"
    vars:
      - name: today
        type: date
        params:
          format: "%Y/%m/%d"

  - trigger: ";tomorrow"
    replace: "{{tomorrow}}"
    vars:
      - name: tomorrow
        type: shell
        params:
          cmd: "date -v+1d '+%Y/%m/%d'"

  - trigger: ";time"
    replace: "{{time}}"
    vars:
      - name: time
        type: date
        params:
          format: "%H:%M"


# Print the output of a shell command
  - trigger: ";shell"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "echo 'Hello from your shell'"


# Lookup word definition using Free Dictionary API. Use like ;def(word)
  - regex: ";def\\((?P<word>.*)\\)"
    replace: "{{definition}}"
    vars:
      - name: definition
        type: shell
        params:
          cmd: "curl -s https://api.dictionaryapi.dev/api/v2/entries/en/$ESPANSO_WORD | grep -o '\"definition\":\"[^\"]*\"' | head -n 1 | sed 's/\"definition\":\"\\([^\"]*\\)\"/\\1/'"


# Outputs public IP address
  - trigger: ";ip"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "curl 'https://api.ipify.org'"
```

## Using Packages
Install packages using commands like `espanso install html-utils-package`. Packages are simple and easy to create. Find useful packages at 
:::linkcard
https://hub.espanso.org/html-utils-package
:::

## Conclusion
There are many more features not covered here - check the [documentation](https://espanso.org/docs/matches/basics/) for more information.