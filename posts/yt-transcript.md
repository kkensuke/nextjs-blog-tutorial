---
title: "YouTube 動画の文字起こし＆要約ツール紹介"
date: "2025-10-17"
subtitle: "YouTube 字幕を Markdown / Text / JSON / SRT / VTT で保存し、Gemini で要約できる Python ツール（CLI & Web アプリ）"
previewImage: https://raw.githubusercontent.com/kkensuke/yt_transcript/main/docs/screenshot.png
tags: [Python, Productivity]
---

![screenshot](https://raw.githubusercontent.com/kkensuke/yt_transcript/main/docs/screenshot.png)

:::linkcard
https://github.com/kkensuke/yt_transcript
:::

## 1. はじめに

YouTube の解説動画や講義動画を見ていて、次のように思ったことはないでしょうか。

* 動画の内容を後からテキストで読み返したい
* 長い動画を見る前に、まず要点だけ把握したい
* 英語動画の字幕を取得して、日本語で要約したい
* 技術カンファレンスや講義の内容を Markdown として保存したい

`yt-transcript` は、YouTube の **元言語の字幕を取得**し、Markdown / Text / JSON / SRT / VTT として保存できるツールです。

さらに Gemini API キーを設定すると、取得した字幕から **Gemini による要約**も生成できます。

字幕取得そのものには Gemini API キーは必要ありません。

現在は次の 2 通りの使い方に対応しています。

* **CLI**: ターミナルから実行してファイルとして保存
* **Web アプリ**: ブラウザ上で字幕・要約をプレビュー、コピー、ダウンロード

## 2. このツールでできること

### 2.1. YouTube 字幕の取得

YouTube URL または 11 文字の Video ID を渡すと、動画の元言語の字幕を取得します。

対象になるのは、YouTube 側で利用できる次のような字幕です。

* 手動で追加された字幕
* 自動生成字幕

字幕が存在しない動画では取得できません。

### 2.2. 5 種類の出力形式

字幕は次の形式で保存できます。

* `md` — Markdown
* `txt` — プレーンテキスト
* `json` — 構造化データ
* `srt` — 字幕ファイル
* `vtt` — WebVTT

デフォルトは Markdown です。

Markdown / Text / JSON では、YouTube 側からチャプター情報を取得できた場合、その情報も出力に含まれます。

Markdown のタイムスタンプは、該当位置から YouTube を開けるリンクになっています。

### 2.3. Gemini による要約

`GEMINI_API_KEY` を設定すると、取得した字幕を Gemini に送って Markdown 形式の要約を作成できます。

要約では、単なる短縮だけではなく、重要な主張・根拠・結論を残しながら見出しや箇条書きを使った構造化 Markdown の生成を行います。

要約言語は、字幕と同じ言語に自動設定することも、日本語・英語など別言語に変えることもできます。

### 2.4. 50,000 文字を超える字幕への対応

長い動画では字幕が 50,000 文字を超える場合があります。

現在のバージョンでは、長文をどう扱うかを明示的に選択できます。

* `skip` — 要約をスキップ
* `truncate` — 先頭から 50,000 文字以内を要約
* `full` — 全文を Gemini に送信

CLI のデフォルトは `skip` です。

Web アプリでは 50,000 文字を超えた場合、全文を Gemini に送信する前にユーザーへ確認します。

### 2.5. ブラウザ Cookie の利用

ローカル環境では、必要に応じて Chrome、Firefox、Safari などのブラウザ Cookie を `yt-dlp` に渡せます。

これにより、通常の匿名アクセスでは取得できない限定公開・年齢制限などの動画で字幕を取得できる場合があります。

まずは Cookie なしで試し、必要な場合だけ使用するのがおすすめです。

## 3. 現在のコード構成

コードは Python パッケージとして整理されています。

```text
src/yt_transcript/
├── cli.py              # CLI
├── web.py              # FastAPI ベースの Web アプリ
├── web_state.py        # Web アプリの短期ジョブ管理
├── service.py          # 字幕取得・要約の共通処理
├── youtube.py          # YouTube メタデータ・字幕取得
├── gemini.py           # Gemini API クライアント
├── renderers.py        # md/txt/json/srt/vtt の出力処理
├── summary_languages.py# 要約言語の処理
├── models.py           # データモデル
├── errors.py           # エラー定義
├── utils.py            # 共通ユーティリティ
└── ui/                 # Web UI の HTML / CSS / JavaScript
```

CLI と Web アプリで別々の字幕取得ロジックを持つのではなく、`service.py` を中心に共通処理を利用する構成になっています。

## 4. インストール方法

### 4.1. Homebrew を使う方法

Homebrew が使える環境では、これが最も簡単です。

```bash
brew install kkensuke/tap/yt-transcript
```

インストールできたか確認します。

```bash
yt-transcript --version
```

Homebrew 版には CLI と Web アプリの両方が含まれます。

### 4.2. ソースコードから実行する方法

Windows など Homebrew を使わない環境では、Git と `uv` を用意してソースから実行できます。

```bash
git clone https://github.com/kkensuke/yt_transcript.git
cd yt_transcript
uv sync --locked --extra web
uv run yt-transcript --version
```

この方法では、依存パッケージはリポジトリ内の `.venv` に構築されます。

以降のコマンドには `uv run` を付けます。

```bash
uv run yt-transcript "YOUTUBE_URL" --no-summary
uv run yt-transcript web
```

プロジェクトが要求する Python バージョンは `3.11` 以上 `3.15` 未満です。

## 5. Gemini API キーの設定

字幕の取得だけなら API キーは不要です。

Gemini 要約を使う場合だけ、Google AI Studio で Gemini API キーを用意します。

:::linkcard
https://aistudio.google.com/api-keys
:::

### 5.1. macOS / Linux

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

モデルを固定したい場合は、任意で `GEMINI_MODEL` も設定できます。

```bash
export GEMINI_MODEL="gemini-flash-lite-latest"
```

### 5.2. Windows PowerShell

```powershell
$env:GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
$env:GEMINI_MODEL = "gemini-flash-lite-latest"
```

### 5.3. API キーをコードに直接書かない

API キーはソースコードへ直接書かず、CLI では `GEMINI_API_KEY` 環境変数を使用します。

また、API キーを CLI オプションとして渡す機能もありません。

## 6. Web アプリの使い方

Homebrew 版の場合は次のコマンドだけです。

```bash
yt-transcript web
```

ソース版では次のように実行します。

```bash
uv run yt-transcript web
```

デフォルトでは `127.0.0.1:8000` でサーバーが起動し、ブラウザが開きます。

![yt-transcript browser app](https://raw.githubusercontent.com/kkensuke/yt_transcript/main/docs/screenshot.png)

Web アプリでは、次の操作をブラウザから行えます。

* YouTube URL / Video ID の入力
* 出力形式の選択
* Gemini 要約の ON / OFF
* 要約言語の選択
* Gemini モデルの選択
* 利用可能な Gemini モデルの読み込み
* ローカル実行時のブラウザ Cookie 選択
* 字幕と要約のプレビュー
* クリップボードへのコピー
* ファイルのダウンロード

### 6.1. Web アプリでの Gemini API キー

ブラウザに入力した Gemini API キーは、Gemini を使う処理のためにサーバーへ送られ、Google の Gemini API に転送されます。

URL や短期ジョブデータには保存されません。

ブラウザ入力のキーは要約リクエスト送信後にクリアされます。

ローカルの `127.0.0.1` で実行している場合は、サーバープロセスに設定した `GEMINI_API_KEY` をフォールバックとして利用することもできます。

一方、ホストされた Web アプリではサーバー側の `GEMINI_API_KEY` は使用せず、各利用者が自分のキーを入力する方式です。

## 7. CLI の基本的な使い方

```bash
yt-transcript [OPTIONS] YOUTUBE_URL/VIDEO_ID
```

| オプション                                     | 説明                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| `-o, --output-dir DIR`                    | 文字起こしと要約ファイルの出力先ディレクトリ                                                   |
| `-f, --format {md,txt,json,srt,vtt}`      | 文字起こしの出力形式。デフォルトは `md`                                                   |
| `-n, --no-summary`                        | Gemini による要約をスキップ                                                        |
| `-l, --summary-lang LANGUAGE`             | `auto`、または `en`、`ja`、`zh-Hans`、`pt-BR`、`it` などの BCP 47 言語タグ              |
| `-L, --long-summary {skip,truncate,full}` | 50,000 文字を超える場合の処理を指定。要約をスキップ、先頭部分のみ要約、または全文を送信                          |
| `-c, --cookies-from-browser BROWSER`      | ローカルの `chrome`、`chromium`、`edge`、`firefox`、`safari`、`brave` の Cookie を使用 |
| `-m, --gemini-model MODEL_ID`             | 使用する Gemini モデルを指定                                                       |
| `-M, --list-gemini-models`                | `generateContent` をサポートする利用可能なモデルを一覧表示                                   |
| `-V, --version`                           | インストールされているアプリケーションのバージョンを表示                                             |
| `-h, --help`                              | CLI のヘルプを表示                                                              |


### 7.1. 字幕と要約を作成

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
yt-transcript "https://www.youtube.com/watch?v=VIDEO_ID"
```

Video ID だけでも実行できます。

```bash
yt-transcript "VIDEO_ID"
```

API キーが設定されていない場合でも字幕取得は成功し、要約だけがスキップされます。

### 7.2. 字幕だけ取得

```bash
yt-transcript "YOUTUBE_URL" --no-summary
```

短縮形も使えます。

```bash
yt-transcript "YOUTUBE_URL" -n
```

### 7.3. 出力ディレクトリを変更

```bash
yt-transcript "YOUTUBE_URL" --output-dir output/
```

短縮形：

```bash
yt-transcript "YOUTUBE_URL" -o output/
```

`-o` は **出力ディレクトリ**を指定するオプションです。

### 7.4. 出力形式を変更

JSON で保存する例です。

```bash
yt-transcript "YOUTUBE_URL" --format json --no-summary
```

短縮形：

```bash
yt-transcript "YOUTUBE_URL" -f json -n
```

指定できる形式は次の 5 種類です。

```text
md
txt
json
srt
vtt
```

### 7.5. 要約言語を指定

英語動画を日本語で要約する例です。

```bash
yt-transcript "YOUTUBE_URL" --summary-lang ja
```

日本語動画を英語で要約：

```bash
yt-transcript "YOUTUBE_URL" --summary-lang en
```

字幕と同じ主要言語で要約する場合は `auto` です。

```bash
yt-transcript "YOUTUBE_URL" --summary-lang auto
```

`ja` / `en` のほか、たとえば `zh-Hans`、`pt-BR`、`it` などの有効な BCP 47 言語タグも利用できます。

### 7.6. Gemini モデルを指定

```bash
yt-transcript "YOUTUBE_URL" \
  --gemini-model "gemini-flash-latest" \
  --summary-lang ja
```

短縮形：

```bash
yt-transcript "YOUTUBE_URL" -m "gemini-flash-latest" -l ja
```

モデル選択の優先順位は次の通りです。

1. `--gemini-model`
2. `GEMINI_MODEL`
3. 内蔵デフォルト `gemini-flash-lite-latest`

### 7.7. 利用できる Gemini モデルを確認

```bash
yt-transcript --list-gemini-models
```

短縮形：

```bash
yt-transcript -M
```

`generateContent` に対応したモデル ID が一覧表示されます。

このコマンドには `GEMINI_API_KEY` が必要です。

### 7.8. 50,000 文字を超える字幕を要約

全文を送る：

```bash
yt-transcript "YOUTUBE_URL" --long-summary full
```

50,000 文字以内の先頭部分だけ要約：

```bash
yt-transcript "YOUTUBE_URL" --long-summary truncate
```

長文の要約をスキップ：

```bash
yt-transcript "YOUTUBE_URL" --long-summary skip
```

CLI のデフォルトは `skip` です。

Gemini の利用量やモデルのコンテキスト上限も考慮して、必要な場合だけ `full` を使うのがよいでしょう。

### 7.9. ブラウザ Cookie を使う

Chrome の Cookie を使う例：

```bash
yt-transcript "YOUTUBE_URL" --cookies-from-browser chrome
```

短縮形：

```bash
yt-transcript "YOUTUBE_URL" -c chrome
```

対応ブラウザ：

```text
chrome
chromium
edge
firefox
safari
brave
```

### 7.10. ヘルプとバージョン確認

```bash
yt-transcript --help
yt-transcript --version
```

短縮形：

```bash
yt-transcript -h
yt-transcript -V
```

## 8. 生成されるファイル

デフォルトの Markdown 出力では、字幕は次の名前で保存されます。

```text
{video_id}_transcript.md
```

Gemini 要約が成功した場合は次のファイルも生成されます。

```text
{video_id}_summarized.md
```

字幕形式に応じて拡張子が変わります。

```text
{video_id}_transcript.txt
{video_id}_transcript.json
{video_id}_transcript.srt
{video_id}_transcript.vtt
```

要約は Markdown 形式です。

### 8.1. Markdown 字幕のイメージ

```markdown
# Python プログラミング入門

**Video ID:** a1b2C3d4E5F
**YouTube URL:** https://www.youtube.com/watch?v=a1b2C3d4E5F
**Duration:** 01:02:34
**Captions:** Auto-generated captions (ja)

## Chapters

- [00:00 — はじめに](https://www.youtube.com/watch?v=a1b2C3d4E5F&t=0s)
- [03:15 — 変数](https://www.youtube.com/watch?v=a1b2C3d4E5F&t=195s)

---

**[00:00](https://www.youtube.com/watch?v=a1b2C3d4E5F&t=0s)** こんにちは。今日は Python の基礎について解説します。
```

実際には動画の情報と取得できた字幕トラックに応じて内容が変わります。

### 8.2. JSON 出力

JSON では、メタデータ、字幕トラック、チャプター、字幕セグメントを構造化した形で保存できます。

後から Python や JavaScript で再利用したい場合に便利です。

### 8.3. 要約ファイル

要約ファイルには動画タイトル、Video ID、YouTube URL、動画時間と Gemini が生成した Markdown 要約が含まれます。

長文を `truncate` または `full` で処理した場合は、要約に使用した字幕文字数についての注記も追加されます。

## 9. 実践的な活用例

### 9.1. 講義動画から復習ノートを作る

```bash
yt-transcript "LECTURE_VIDEO_URL" --summary-lang ja
```

活用例：

* 講義内容の復習
* 試験前の要点整理
* Markdown ベースのノート作成

### 9.2. 英語動画を文字起こしして日本語で要約

```bash
yt-transcript "ENGLISH_VIDEO_URL" --summary-lang ja
```

活用例：

* 海外の技術動画を効率よく読む
* 英語リスニング後の内容確認
* 技術用語を原語と合わせて確認

### 9.3. 字幕を学習教材として保存

要約を作らず字幕だけ取得します。

```bash
yt-transcript "ENGLISH_VIDEO_URL" --no-summary
```

SRT にする場合：

```bash
yt-transcript "ENGLISH_VIDEO_URL" -f srt -n
```

活用例：

* リスニング練習の答え合わせ
* 字幕プレイヤーへの読み込み
* フレーズ・単語の検索

### 9.4. JSON にして後処理する

```bash
yt-transcript "YOUTUBE_URL" -f json -n -o output/
```

活用例：

* RAG 用データの前処理
* 自作スクリプトで字幕セグメントを解析
* チャプター単位の処理

### 9.5. 長時間カンファレンスを要約

```bash
yt-transcript "CONFERENCE_VIDEO_URL" \
  --summary-lang ja \
  --long-summary full
```

長文を全文 Gemini に送るため、API の利用量には注意してください。

## 10. トラブルシューティング

### 10.1. 字幕が見つからない

次を確認してください。

* 動画に手動字幕または自動生成字幕があるか
* YouTube が元言語の字幕トラックを公開しているか
* URL / Video ID が正しいか
* `yt-transcript` / `yt-dlp` が古くないか

Homebrew 版は次のコマンドで更新できます。

```bash
brew update
brew upgrade yt-transcript
```

ソース版で `yt-dlp` を更新したい場合：

```bash
uv lock --upgrade-package yt-dlp
uv sync
```

### 10.2. `HTTP 429` が出る

YouTube 側から一時的にレート制限されている可能性があります。

時間を置いて再実行してください。

ローカル環境では、必要に応じてログイン済みブラウザの Cookie を試す方法もあります。

```bash
yt-transcript "YOUTUBE_URL" -c chrome
```

### 10.3. Gemini 要約だけ失敗する

字幕取得と Gemini 要約は分離されているため、Gemini が失敗しても字幕ファイルは残ります。

次を確認します。

* `GEMINI_API_KEY` が設定されているか
* API キーが有効か
* Gemini API のクォータを超えていないか
* 選択した Gemini モデルが利用可能か

利用できるモデルは次のコマンドで確認できます。

```bash
yt-transcript --list-gemini-models
```

### 10.4. Web アプリで API キーが消えた

ブラウザに直接入力した Gemini API キーは、要約リクエストを送信した後にクリアされる仕様です。

再度要約する場合はキーを入力し直してください。

ローカル環境で毎回入力したくない場合は、サーバー起動前に `GEMINI_API_KEY` を環境変数として設定できます。

## 11. 開発者向けカスタマイズ

### 11.1. 要約プロンプトを変更する

要約プロンプトは `src/yt_transcript/gemini.py` にあります。

ソースから利用している場合は、`_build_prompt()` を変更することで要約方針をカスタマイズできます。

たとえば、技術動画向けに次のような要件を追加できます。

```text
- 実装に使える具体例を優先する
- ベストプラクティスを明示する
- 注意点やよくある失敗をまとめる
- コマンドやコード断片を可能な限り保持する
```

Homebrew でインストールしたパッケージを直接編集するより、開発用にリポジトリを clone して変更する方が管理しやすいです。

### 11.2. 50,000 文字の基準を変更する

長文判定の定数は `src/yt_transcript/service.py` の `MAX_SUMMARY_LENGTH` です。

```python
MAX_SUMMARY_LENGTH = 50_000
```

通常の利用ではソースを書き換える必要はなく、CLI の `--long-summary` で挙動を選択できます。

定数を変更する場合は、Gemini のモデル制限・料金・処理時間なども考慮してください。

### 11.3. 開発環境を用意する

Web と開発用依存関係を含めてインストールします。

```bash
uv sync --extra web --extra dev
```

テスト：

```bash
uv run --extra web --extra dev pytest
```

Ruff：

```bash
uv run --extra web --extra dev ruff check .
uv run --extra web --extra dev ruff format --check .
```


## 12. macOS の Quick Look で Markdown を見る

生成された Markdown を Finder の Quick Look で見たい場合は、`QLMarkdown` を使う方法があります。

```bash
brew install --cask qlmarkdown
```

字幕や Gemini 要約を Finder から素早く確認できるので、Markdown を大量に保存する運用と相性がよいです。

## 13. セキュリティ面でのポイント

Web アプリでは、字幕取得と Gemini の認証情報を扱う処理が分離されています。

* 字幕取得には Gemini API キーを送らない
* Gemini API キーを URL に入れない
* Web の短期ジョブに API キーを保存しない
* ローカル環境変数の Gemini API キーをブラウザへ返さない
* ホストされた Web アプリでは各ユーザーが自分の API キーを使用する

API キーをソースコードや Git リポジトリへ書き込まない運用が重要です。

## 14. まとめ

`yt-transcript` は、YouTube 字幕の取得・各種形式への書き出し・Gemini 要約を CLI と Web アプリの両方から利用できる Python パッケージです。

主なポイントをまとめると次の通りです。

* ✅ **字幕取得は API キー不要**
* ✅ **CLI と Web アプリの両方に対応**
* ✅ **Homebrew で簡単にインストール可能**
* ✅ **Markdown / Text / JSON / SRT / VTT に対応**
* ✅ **YouTube チャプター情報も利用**
* ✅ **Gemini で多言語要約**
* ✅ **50,000 文字を超える字幕の扱いを選択可能**
* ✅ **ブラウザ Cookie を利用可能**
* ✅ **Gemini モデルを CLI / Web から選択可能**
* ✅ **字幕取得に成功すれば、Gemini 要約が失敗しても字幕を保持**

長時間の動画を「まずテキスト化して、必要なら Gemini で要約する」という使い方を、CLI でもブラウザでも簡単に行えるようになっています。

---

**参考リンク**:

* [yt-transcript](https://github.com/kkensuke/yt_transcript)
* [yt-dlp](https://github.com/yt-dlp/yt-dlp)
* [Google AI Studio - API Keys](https://aistudio.google.com/api-keys)
* [uv](https://docs.astral.sh/uv/)
