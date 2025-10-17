---
title: "スニペットアプリ Espanso を使おう！"
date: "2024-10-31"
subtitle: "無料でオープンソースのスニペットアプリ"
previewImage: https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png
tags: [Snippets]
---


## [Espanso](https://espanso.org/)
- Espanso とは、オープンソースかつ無料で使用できる、クロスプラットフォーム（Windows、macOS、Linux）のスニペットアプリ。
- 短いキーワードを入力するだけで、長いテキストを瞬時に入力できる。これにより、繰り返し入力する必要のあるテキストを簡単に入力できるようになる。
- Mac 標準のテキスト辞書よりも高速で、多機能。
- さらに、Shell script を呼び出すことができるので、ただのスニペットアプリとしてだけでなく、アプリやファイルを開いたり、APIを呼び出すことができるなど、非常に拡張性が高い。
    - 例えば、クリップボードにコピーしたテキストを LLM の API で即時翻訳させることができ、作業中のアプリから離れる必要もなくなる。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/1beaf074-0f49-9d46-a9c1-df9602a1d95a.png)

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
espanso/
├── config/
│   └── default.yml
└── match/
    └── base.yml
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
  - trigger: ";hello"
    replace: "world"

# 複数行
  - trigger: ";hello"
    replace: "line1\nline2"

# 複数行
  - trigger: ";include newlines"
    replace: |
              exactly as you see
              will appear these three
              lines of poetry

# 改行なし
  - trigger: ";fold newlines"
    replace: >
              this is really a
              single line of text
              despite appearances
```

`match/base.yml` を変更したら、それを反映させるためにメニューバーで `Reload` をするか、コマンドで `espanso restart` を実行しましょう。

:::warning
望まないスニペットの作動を防ぐために、`:` や `;` などの普段は使わない記号を接頭辞に用いると良いです。この記事では `;` を使っています。
:::

:::warning
`;a` を登録すると `;as` や `;ad` といったトリガーは使えなくなります。なぜなら、`;a` を入力した段階で別のテキストに置換されるからです。このようなことを防ぐために、短すぎるトリガーの設定は避けた方が良いです。
:::

:::tip
`match` ディレクトリにある全ての `.yml` ファイルは読み込まれるので、用途に応じてファイルを細かく分割することもできます。
:::


## 動的マッチ
次の設定では、`;now` と入力すると `It's 11:29` のように現在時刻に変換します。

```yml
  - trigger: ";now"
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
  - trigger: ";div"
    replace: <div>$|$</div>
```


## 一つのトリガーに複数の変換

```yml
  - trigger: ";quote"
    replace: "Every moment is a fresh beginning."
  - trigger: ";quote"
    replace: "Everything you can imagine is real."
  - trigger: ";quote"
    replace: "Whatever you do, do it well."
```

## 複数のトリガーに一つの変換
```yml
  - triggers: [";hello", ";hi"]
    replace: "world"
```

## 複数のトリガーに複数の変換
```yml
  - triggers: [";ok",";emoji"]
    replace: "👍"
  - triggers: [";ok",";emoji"]
    replace: "✅"
  - triggers: [";up",";emoji"]
    replace: "⬆️"
  - triggers: [";down",";emoji"]
    replace: "⬇️"
```

## 画像のマッチ

```yml
  - trigger: ";cat"
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
# It can also be defined as follows:
#  - name: myname
#    type: shell
#    params:
#      cmd: "echo John"

matches:
  - trigger: ";greet"
    replace: "Hello {{myname}}"

  - trigger: ";sig"
    replace: "Best regards, {{myname}}"
```


espanso のディレクトリを GitHub などで管理したいが、一部プライベートな情報を含むような場合は、それを`params.yml` にグローバル変数として入れておき、`params.yml` を `.gitignore` に追加する方法があります。`match` ディレクトリにある `*.yml` ファイルは全て読み込まれます。それ以外の場合は、直接パスを指定して import することもできます。


```sh
espanso/
├── config/
│   └── default.yml
└── match/
    ├── base.yml
    ├── params.yml
    ...
```


```yml[title=params.yml]
# このファイルを .gitignore に追加しておくと安全です
global_vars:
  - name: MY_API
    type: echo
    params:
      echo: "EmitDqIhb7Rzu5GheVtiwL452..."
```

```yml[title=base.yml]
# YML file outside of espanso/match/
imports:
  - "paths/to/your.yml"

matches:
  - trigger: ";myapi"
    replace: "{{MY_API}}"
```


## Clipboard Extension
変換後の中身にクリップボードの内容を含めて出力することができます。これで、貼り付け作業が必要なくなります。

例えば、直前にコピーしたリンクを用いて、HTML の `<a>` タグを作成したい時、以下のようにトリガーを定義します。
```yml
  - trigger: ";aref"
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
各トリガーにクリップボード変数を定義するのが面倒な方は、以下のように `global_vars` に定義しておくと良いです。
```yml
global_vars:
  - name: "clip"
    type: "clipboard"

matches:
  - trigger: ";mdlink"
    replace: "[$|$]({{clip}})"
```
:::


## Shell Exntension
シェルコマンドを実行して、その結果を出力することもできます。

```yml
  - trigger: ";shell"
    replace: "{{output}}"
    vars:
      - name: output
        type: shell
        params:
          cmd: "echo 'Hello from your shell'"
```

以下の例は、ipify からパブリック IP を取得するトリガーです。
```yml
  - trigger: ";ip"
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

ターミナルを経由し、VScode で `espanso` ディレクトリを開くトリガー。ターミナルが開き、`code ~/github/dotfiles/espanso/` が実行されます。`\n` がエンターの役割を果たします。
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


新しいファイルを作成し、開くトリガー。
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


クリップボードにコピーした内容を Google で検索するトリガー。
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


VScode の `settings.json` の設定を切り替えるトリガー。以下の場合は、`latex-workshop` という拡張機能の PDF Viewer の色の反転に関する設定を、`"latex-workshop.view.pdf.invert": 0` と `"latex-workshop.view.pdf.invert": 1` の間で切り替わる様にしています。
```yml
  - trigger: ";invert"
    replace: "{{output}}"
    vars:
      - name: path
        type: echo
        params:
          echo: "~/Library/Application\\ Support/Code/User/settings.json"
      - name: output
        type: shell
        params:
          cmd: |
            if grep -q "\"latex-workshop.view.pdf.invert\": 1" {{path}};
            then sed -i '' 's/\"latex-workshop.view.pdf.invert\": 1/\"latex-workshop.view.pdf.invert\": 0/' {{path}};
            elif grep -q "\"latex-workshop.view.pdf.invert\": 0" {{path}};
            then sed -i '' 's/\"latex-workshop.view.pdf.invert\": 0/\"latex-workshop.view.pdf.invert\": 1/' {{path}};
            else echo "No matching pattern found.";
            fi
```


クリップボードにコピーしたリンクのサイトを API によってマークダウンに変換するトリガー。（全てのサイトに対応しているわけではありません）
```yml
  - trigger: ";tomd"
    replace: |
            - Webpage to Markdown Conversion by https://urltomarkdown.herokuapp.com/
            - Source URL: {{clipboard}}
            - Conversion Timestamp: {{now}}
            
            ===================================================
            
            {{output}}
    vars:
      - name: output
        type: shell
        params:
          cmd: |
            curl "https://urltomarkdown.herokuapp.com/?url={{clipboard}}"
```


次のトリガーはEspansoの真骨頂です。 クリップボードにテキストをコピーし、`;jet` と入力するだけで、カーソル位置に Google Gemini による英語訳が挿入されます。`global_vars` に `GEMINI_API_KEY` を定義した上で使用してください。同じファイルに定義することもできますが、GitHub などで管理する場合は公開しないように注意してください。`GEMINI_API_KEY` の取得は[こちらから](https://aistudio.google.com/api-keys)
```yml
global_vars:
  - name: GEMINI_API_KEY
    type: echo
    params:
      echo: "EmitDqIhb7Rzu5GheVtiwL452...."

matches:
  - trigger: ";jet"
    replace: "{{translation}}"
    vars:
      - name: "clip"
        type: "clipboard"
      - name: gemini_model
        type: echo
        params:
          echo: "gemini-2.5-flash"
      - name: translation
        type: shell
        params:
          cmd: >
            curl -s \
              "https://generativelanguage.googleapis.com/v1beta/models/{{gemini_model}}:generateContent" \
              -H "x-goog-api-key: {{GEMINI_API_KEY}}" \
              -H 'Content-Type: application/json' \
              -X POST \
              -d '{
                    "contents": [{
                      "parts": [{"text": "Translate the following to English. Provide ONLY the translated text, no explanations or markdown: {{clip}}"}]
                    }]
                  }' \
            | jq -r '.candidates[0].content.parts[0].text | split("\n")[0]'
```

:::note
jq コマンドが必要です: `brew install jq`。APIからのJSONレスポンスを解析するために使用します。
:::

:::warning
上のトリガーでエラーを返す場合は、上記のモデル `gemini-2.5-flash` が現在も使用可能か [Google のドキュメント](https://ai.google.dev/gemini-api/docs/models)で確認してください。モデル名に問題のない場合は、API の呼び出し方が更新されていないか[このページの REST と書かれた部分](https://ai.google.dev/gemini-api/docs/quickstart#rest)をチェックしてください。
:::

:::tip
編集時点ではより応答の早いモデル `gemini-2.5-flash-lite` も使用可能です。
:::

:::tip
指示（プロンプト）を変更すれば、翻訳だけでなく、文章の校正、要約、リファクタリングなど、あらゆる種類のトリガーを自作できます。
:::


## Script Exntension
外部ファイルを実行してその結果を受け取ることもできます。

```py[title=/path/to/your/script.py]
print("Hello from python")
```

```yml[title=base.yml]
  - trigger: ";pyscript"
    replace: "{{output}}"
    vars:
      - name: output
        type: script
        params:
          args:
            - python
            - /path/to/your/script.py
```


## Form Extension （対話的なスニペット）
トリガーからフォームを生成し、定型文にそって文章を作成することもできます。

```yml
  - trigger: ";greet"
    form: |
      Hey [[name]],
      Happy Birthday!
```

![screenshot.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/0d085e75-b23a-70af-604d-834d64d961d5.png)

上のフォームは以下のように表現することもできます。
```yml
# The above is equivalent to the following
  - trigger: ";_greet"
    replace: |
        Hey {{form.name}},
        Happy Birthday!
    vars:
      - name: "form"
        type: form
        params:
          layout: |
            Hey [[name]],
            Happy Birthday!
```

:::warning
`variable` と `form` を同じトリガー内で使用するような複雑な場合には、こちらの記法出ないと作動しないようです。
:::


### メールの定型文フォームから文章を作成
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



### Todo アイテムを作成
```yml
  - trigger: ";todo"
    replace: "- Task: {{form1.task}}, Due Date: {{form1.day}} {{form1.time}}"
    vars:
      - name: "days"
        type: shell
        params:
          cmd: "for i in {0..6}; do date -v+${i}d '+%Y/%m/%d'; done"
      - name: "hours"
        type: shell
        params:
          cmd: "for i in {8..20}; do echo \"$i:00\"; done"
      - name: "form1"
        type: form
        params:
          layout: "Task: [[task]], Due Date: [[day]] [[time]]"
          fields:
            day:
              type: choice
              values: "{{days}}"
            time:
              type: choice
              values: "{{hours}}"
```

![SCR-20240618-qyki.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/414636/932694e0-8a4f-5c6d-8f57-d7bb38eca3de.png)


### テキストのケーススタイル変換
フォームとシェルスクリプトを組み合わせた強力な例です。クリップボードのテキストを、フォームで選択した形式（キャメルケース、スネークケースなど）に変換します。
```yml
  - trigger: ";case"
    replace: "{{output}}"
    vars:
      - name: form
        type: form
        params:
          layout: "Convert clipboard to: [[style]]"
          fields:
            style:
              type: choice
              values: ["UPPERCASE", "lowercase", "PascalCase", "camelCase", "Title Case", "kebab-case", "snake_case"]
      - name: output
        type: shell
        params:
          cmd: |
            text="{{clipboard}}"
            case "{{form.style}}" in
              "UPPERCASE")  echo "$text" | tr '[:lower:]' '[:upper:]';;
              "lowercase")  echo "$text" | tr '[:upper:]' '[:lower:]';;
              "PascalCase") echo "$text" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1' | tr -d ' ';;
              "camelCase")  echo "$text" | awk '{out=tolower($1); for(i=2;i<=NF;i++){out=out toupper(substr($i,1,1)) tolower(substr($i,2))}; print out}';;
              "Title Case") echo "$text" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1';;
              "kebab-case") echo "$text" | sed -E 's/[^a-zA-Z0-9 ]+//g' | tr '[:upper:]' '[:lower:]' | tr -s ' ' '-';;
              "snake_case") echo "$text" | sed -E 's/[^a-zA-Z0-9 ]+//g' | tr '[:upper:]' '[:lower:]' | tr -s ' ' '_';;
            esac
```


### 通貨変換
```yml
  - trigger: ";currency"
    replace: "{{conversion}}"
    vars:
      - name: form
        type: form
        params:
          layout: |
                  Amount: [[amount]]
                  From: [[from]]
                  To: [[to]]
          fields:
            from:
              type: choice
              values: ["USD", "JPY", "CHF", "EUR", "GBP", "CNY", "KRW", "CAD", "AUD"]
            to:
              type: choice
              values: ["JPY", "USD", "EUR", "CHF", "GBP", "CNY", "KRW", "CAD", "AUD"]
      - name: conversion
        type: shell
        params:
          cmd: "curl -s 'https://api.exchangerate-api.com/v4/latest/{{form.from}}' | jq -r '.rates.{{form.to}} * {{form.amount}} | round * 100 / 100' | xargs printf '{{form.amount}} {{form.from}} = %.2f {{form.to}}\\n'"
```



## まとめ
Espansoは、単純なテキスト置換ツールに留まらず、シェルスクリプト、外部API、対話フォームを駆使することで、日々のPC作業を劇的に効率化する強力なパーソナル自動化ツールです。

この記事で紹介した例はほんの一部です。ぜひあなた自身の定型業務や面倒な作業を見つけ出し、Espansoで自動化してみてください。


## 参考リンク
ここでは書ききれなかったトリガーの例は以下のリポジトリにあります。
:::linkcard
https://github.com/kkensuke/espanso/tree/main/match
:::

あるいは、次のサイトも参考になります。
:::linkcard
https://ee.qqv.com.au/usage/cookbook/
:::

また、Espanso Hubでは他のユーザーが作成したパッケージを簡単に追加できます。

