---
title: "スニペットアプリ Espanso を使おう！"
date: "2024-10-31"
subtitle: "Free and open-source text expander for Windows, macOS, and Linux"
tags: [Snippets]
---


## [Espanso](https://espanso.org/)
Espanso とは、オープンソースかつ無料で使用できる、クロスプラットフォームのスニペットアプリです。Espanso を使用すると、短いキーワードを入力するだけで、長いテキストを瞬時に入力できます。これにより、繰り返し入力する必要のあるテキストを簡単に入力できるようになります。Mac 標準のテキスト辞書よりも高速で、多機能です。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png)

Espanso は、Windows、macOS、Linux で動作し、正規表現、シェルスクリプトなどの高度な機能をサポートしています。

![ezgif-1-5219cff875.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/c93e4c1d-18ef-9f17-0db9-9f4e5eff6e08.gif)


![ezgif-1-6d58091dfc.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/833f40ee-47d5-74e9-5bfd-df46d212664e.gif)




## インストール
https://espanso.org/docs/install/mac/

インストールしたら、アプリを開きます。コマンドで `espanso status` を実行して動いているか確認しましょう。

## 設定
https://espanso.org/docs/getting-started/

Espanso の設定は主に2つのファイルで行います。

```sh
esnpanso/
  config/
    default.yml
  match/
    base.yml
```

`espanso` のディレクトリの場所は OS によって異なり、`espanso path` によって確かめることができます。

- Linux: `$XDG_CONFIG_HOME/espanso` (e.g. `/home/user/.config/espanso`)
- MacOS: `$HOME/Library/Application Support/espanso` (e.g. `/Users/user/Library/Application Support/espanso`)
- Windows: `{FOLDERID_RoamingAppData}\espanso` (e.g. `C:\Users\user\AppData\Roaming\espanso`)


`config/default.yml` ファイルは、初めは特に設定することはないです。
もし、メニューバーのアイコンを非表示にたい場合は、`show_icon: false` と書き込むと良いです。


## 使い方
スニペットの設定は `match/base.yml` ファイルに書き込みます。

基本的には次のような文法で書きます。
```yml
matches: 
  - trigger: ":hello"
    replace: "world"

# 複数行
  - trigger: ":hello"
    replace: "line1\nline2"

# 複数行
  - trigger: ":include newlines"
    replace: |
              exactly as you see
              will appear these three
              lines of poetry

# 改行なし
  - trigger: ":fold newlines"
    replace: >
              this is really a
              single line of text
              despite appearances
```

`match/base.yml` を変更したら、それを反映させるためにメニューバーで `Reload` をするか、コマンドで `espanso restart` を実行しましょう。

:::warning
- 望まないスニペットの作動を防ぐために、`:` や `;` などの普段は使わない記号を接頭辞に用いると良いです。
- `:a` を登録すると `:as` や `:ad` といったトリガーは使えなくなります。なぜなら、`:a` を入力した段階で別のテキストに置換されるからです。このようなことを防ぐために、短すぎるトリガーの設定は避けた方が良いです。
:::

:::note
`match` ディレクトリにある全ての `.yml` ファイルは読み込まれるので、用途に応じてファイルを細かく分割することもできます。
:::


## 動的マッチ
次の設定では、`:now` と入力すると `It's 11:29` のように現在時刻に変換します。

```yml
  - trigger: ":now"
    replace: It's {{mytime}}
    vars:
      - name: mytime
        type: date
        params:
          format: "%H:%M"
```

## 単語マッチ
基本的な `trigger` と `match` の設定方法では、変換して欲しくない場面で変換が起こる可能性があります。例えば、トリガー `ther` によって `there` としたいとき、`other` と入力しても変換が実行され `othere` となってしまいます。これを防ぐためには、以下のように `word: true` のオプションをつけます。

```yml
  - trigger: "ther"
    replace: there
    word: true
```

## カーソルヒント
テキストを変換した後に、カーソルが来る位置を `$|$` で決めることができます。

```yml
  - trigger: ":div"
    replace: <div>$|$</div>
```


## 一つのトリガーに複数の変換

```yml
  - trigger: ":quote"
    replace: "Every moment is a fresh beginning."
  - trigger: ":quote"
    replace: "Everything you can imagine is real."
  - trigger: ":quote"
    replace: "Whatever you do, do it well."
```

## 複数のトリガーに一つの変換
```yml
  - triggers: [":hello", ":hi"]
    replace: "world"
```

## 複数のトリガーに複数の変換
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

## 画像のマッチ

```yml
  - trigger: ":cat"
    image_path: "$CONFIG/images/cat.png"
```


## Shell Exntension
シェルコマンドを実行して、その結果を出力することもできます。

```yml
  - trigger: ":shell"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "echo 'Hello from your shell'"
```

以下の例では、ipify からパブリック IP を取得しています。
```yml
  - trigger: ":ip"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "curl 'https://api.ipify.org'"
```

## グローバル変数
`match` に共通してよく使う変数がある場合はグローバル変数として設定すると、変更する際に便利です。

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

例えば、ある `.yml` ファイルではよく用いるグローバル変数を定義しておき、他のファイルでインポートして使用することができます。

```yml
imports:
  - "/path/to/other/matchsets.yml"

matches:
  - trigger: ":hello"
    replace: "{{greet}} Jon"
```



## Script Exntension
外部ファイルを実行してその結果を受け取ることもできます。

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
トリガーからフォームを生成し、定型文にそって文章を作成することもできます。

```yml
  - trigger: ":greet"
    form: |
      Hey [[name]],
      Happy Birthday!
```

![screenshot.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/0d085e75-b23a-70af-604d-834d64d961d5.png)



次の設定は、メールの定型文フォームから変換先の文章を作成します。
```yml
matches:
  - trigger: ";reply"
    form: |
        Hi, [[name]]
        
        Thank you for your email and for bringing this to our attention.
        I am sorry that you're disappointed with our product.
        
        [[choices]]

        Looking forward to hearing from you
        
        All the best，
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



より複雑なフォームの使い方として、次のように Todo アイテムを作成できます。
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


## 例
`match/base.yml`
```yml
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


# 仕事
  - trigger: ";osewa"
    replace: "お世話になっております。"

  - trigger: ";ariga"
    replace: "ありがとうございます。"

  - trigger: ";yoro"
    replace: "よろしくお願いいたします。"

  - trigger: ";otuka"
    replace: "お疲れ様です。"

  - trigger: ";itumo"
    replace: |
            いつもお世話になっております。
            OO商事の田中です。
    
  - trigger: ":nanitozo"
    replace: |
            何卒よろしくお願い申し上げます。
            
            田中

  - trigger: ";company"
    replace: |
            〒100-0001
            東京都千代田区千代田1-1

  - trigger: ";contact"
    replace: |
            電話:   03-1234-5678
            メール: example@example.com


# symbol
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
  - trigger: ";efix"
    replace: "Please fix the following English text: "
  - trigger: ";ejt"
    replace: "Please translate the following text into Japanese: "
  - trigger: ";jet"
    replace: "以下のテキストを英語に翻訳してください: "
  - trigger: ";summ"
    replace: "Please summarize the following text: "
  - trigger: ";how"
    replace: "Please explain how to $|$"
  - trigger: ";mail"
    replace: "Please write an email about the following topic politely: "
  - trigger: ";jmail"
    replace: "以下の内容のメールを丁寧に書いてください: "


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


# 日時
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

  - trigger: ";jdate"
    replace: "{{today}}"
    vars:
    - name: today
      type: date
      params:
        format: "%Y年%m月%d日"

  - trigger: ";jtime"
    replace: "{{time}}"
    vars:
    - name: time
      type: date
      params:
        format: "%H時%M分"


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

## パッケージを使う
Espanso では `espanso install html-utils-package` のように実行することでパッケージをインストールすることができます。パッケージはとてもシンプルで自作することも簡単です。ぜひ以下のサイトから自分に便利そうなパッケージを探してインストールしてみてください。

https://hub.espanso.org/html-utils-package


## 終わり
この記事では説明していない機能もまだまだあるので、ぜひ[ドキュメント](https://espanso.org/docs/matches/basics/)で調べてみてください。

