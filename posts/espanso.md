---
title: "スニペットアプリ Espanso を使おう！"
date: "2024-10-31"
subtitle: "無料でオープンソースのスニペットアプリ"
previewImage: https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png
tags: [Snippets]
---


## [Espanso](https://espanso.org/)
Espanso とは、オープンソースかつ無料で使用できる、クロスプラットフォームのスニペットアプリです。Espanso を使用すると、短いキーワードを入力するだけで、長いテキストを瞬時に入力できます。これにより、繰り返し入力する必要のあるテキストを簡単に入力できるようになります。Mac 標準のテキスト辞書よりも高速で、多機能です。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png)

Espanso は、Windows、macOS、Linux で動作し、正規表現、シェルスクリプトなどの高度な機能をサポートしています。

![ezgif-1-5219cff875.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/c93e4c1d-18ef-9f17-0db9-9f4e5eff6e08.gif)


![ezgif-1-6d58091dfc.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/833f40ee-47d5-74e9-5bfd-df46d212664e.gif)




## インストール
:::linkcard
https://espanso.org/docs/install/mac/
:::

インストールしたら、アプリを開きます。そして、ターミナルを開き、コマンドで `espanso status` を実行して動いているか確認しましょう。

## 設定
:::linkcard
https://espanso.org/docs/get-started/
:::

Espanso の設定は主に2つのファイルで行います。

```sh
esnpanso/
  config/
    default.yml
  match/
    base.yml
```

`espanso` のディレクトリの場所は OS によって異なり、コマンド `espanso path` によって確かめることができます。

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
望まないスニペットの作動を防ぐために、`:` や `;` などの普段は使わない記号を接頭辞に用いると良いです。
:::

:::warning
`:a` を登録すると `:as` や `:ad` といったトリガーは使えなくなります。なぜなら、`:a` を入力した段階で別のテキストに置換されるからです。このようなことを防ぐために、短すぎるトリガーの設定は避けた方が良いです。
:::

:::tip
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


espanso のディレクトリを GitHub などで管理したいが、一部プライベートなパラメーターを含むような場合は、`params.yml` に入れておき、`params.yml` を `.gitignore` に追加する方法があります。`match` ディレクトリにある `*.yml` ファイルは全て読み込まれます。それ以外の場合は、直接パスを指定して import することもできます。


```sh
esnpanso/
  config/
    default.yml
  match/
    base.yml
    params.yml
```

```yml
# base.yml
imports:
  - "paths/to/your.yml"

matches:
  - trigger: ":hello"
    replace: "{{greet}} Jon"
```


## Clipboard Extension
変換後の中身にクリップボードの内容を含めて出力することができます。これで、貼り付け作業が必要なくなります。

例えば、直前にコピーしたリンクを用いて、HTML の `<a>` タグを作成したい時、以下のようにトリガーを定義します。
```yml
  - trigger: ":aref"
    replace: "<a href='{{clip}}' />$|$</a>"
    vars:
      - name: "clip"
        type: "clipboard"
```

マークダウンのトリガー例：
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
各トリガーにクリップボード変数を定義するのが面倒な方は、`global_vars` に定義しておくと良いです。
:::


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

以下の例は、ipify からパブリック IP を取得するトリガーです。
```yml
  - trigger: ":ip"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "curl 'https://api.ipify.org'"
```

以下の例は、UUID（Universally Unique Identifier）を生成するトリガーです。
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

以下の複数の例は、本来のアプリの趣旨とは異なりますが、アプリやWebサイト、ファイルを開くためのトリガーです。

まずは、ターミナルや特定のフォルダを開くトリガー。
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

ターミナルを経由し、VScode で `espanso` ディレクトリを開くトリガー。ターミナルが開き、`code ~/github/dotfiles/espanso/` が実行されます。
```yml
  - trigger: ";espanso"
    replace: "{{output}}\n"
    vars:
      - name: output
        type: shell
        params:
          cmd: "open -a Terminal.app; echo 'code ~/github/dotfiles/espanso/'"
```

:::warning
以下のように、直接呼び出す書き方もできますが、最初に開かれているファイルの一部が消される可能性があります。
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


`CotEditor.app` で新しいファイルを作成し、それを開くトリガー。
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


Youtube を開くトリガー。デフォルトのブラウザで開きます。
```yml
  - trigger: ";you"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "open 'https://www.youtube.com/'"
```

クリップボードにコピーした内容を検索するトリガー。
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


クリップボードにコピーした内容を Google Gemini で翻訳するトリガー。`global_vars` に`GEMINI_API_KEY` を定義した上で使用してください。
```yml
  - trigger: ";transen"
    replace: "{{translation}}"
    vars:
      - name: translation
        type: shell
        params:
          cmd: >
            curl -s \
              "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={{GEMINI_API_KEY}}" \
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
指示を変更すれば、いろいろな種類のトリガーを作成できます！
:::


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

ここでは書ききれなかったトリガーの例は以下のレポジトリにあります。
:::linkcard
https://github.com/kkensuke/dotfiles/tree/main/espanso/match
:::

あるいは、次のサイトも参考になります。
:::linkcard
https://ee.qqv.com.au/usage/cookbook/
:::