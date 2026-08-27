---
title: "YouTube Transcription & Summarization Tool"
date: "2025-10-17"
subtitle: "A Python tool for saving YouTube captions as Markdown / Text / JSON / SRT / VTT and summarizing them with Gemini (CLI & Web app)"
previewImage: https://raw.githubusercontent.com/kkensuke/yt_transcript/main/docs/screenshot.png
tags: [Python, Productivity]
---

![screenshot](https://raw.githubusercontent.com/kkensuke/yt_transcript/main/docs/screenshot.png)

:::linkcard
https://github.com/kkensuke/yt_transcript
:::

## 1. Introduction

Have you ever watched a YouTube tutorial or lecture and thought something like this?

* I want to read the content again later as text.
* I want to understand the key points before watching a long video.
* I want to extract captions from an English video and summarize them in Japanese.
* I want to save the content of technical conference talks or lectures as Markdown.

`yt-transcript` is a tool that retrieves YouTube captions in the **video's original language** and saves them as Markdown / Text / JSON / SRT / VTT.

If you configure a Gemini API key, it can also generate a **Gemini-powered summary** from the retrieved captions.

A Gemini API key is not required to retrieve captions themselves.

The tool currently supports two ways of using it:

* **CLI**: Run it from the terminal and save the results as files.
* **Web app**: Preview, copy, and download captions and summaries in the browser.

## 2. What This Tool Can Do

### 2.1. Retrieve YouTube Captions

Provide a YouTube URL or an 11-character Video ID, and the tool retrieves the captions in the video's original language.

It can use captions available from YouTube, including:

* Manually added captions
* Automatically generated captions

Captions cannot be retrieved if the video does not have any available caption track.

### 2.2. Five Output Formats

Captions can be saved in the following formats:

* `md` — Markdown
* `txt` — Plain text
* `json` — Structured data
* `srt` — Subtitle file
* `vtt` — WebVTT

Markdown is the default format.

For Markdown / Text / JSON output, chapter information is also included when it can be retrieved from YouTube.

Timestamps in Markdown are links that open the corresponding position in the YouTube video.

### 2.3. Summarization with Gemini

When `GEMINI_API_KEY` is configured, the retrieved captions can be sent to Gemini to generate a Markdown summary.

Rather than simply shortening the transcript, the summarizer produces structured Markdown with headings and bullet points while preserving important claims, supporting details, and conclusions.

The summary language can be selected automatically to match the main caption language, or explicitly changed to another language such as Japanese or English.

### 2.4. Handling Captions Longer Than 50,000 Characters

Long videos can produce transcripts exceeding 50,000 characters.

The current version lets you explicitly choose how such long transcripts should be handled:

* `skip` — Skip summarization.
* `truncate` — Summarize only the first 50,000 characters.
* `full` — Send the full transcript to Gemini.

The CLI default is `skip`.

In the Web app, when a transcript exceeds 50,000 characters, the user is asked for confirmation before the full transcript is sent to Gemini.

### 2.5. Using Browser Cookies

When running locally, you can optionally pass browser cookies from Chrome, Firefox, Safari, and other supported browsers to `yt-dlp`.

This can make it possible to retrieve captions from videos that cannot be accessed anonymously, such as some unlisted or age-restricted videos.

It is best to try without cookies first and use them only when necessary.

## 3. Current Code Structure

The code is organized as a Python package.

```text
src/yt_transcript/
├── cli.py              # CLI
├── web.py              # FastAPI-based Web app
├── web_state.py        # Short-lived job state for the Web app
├── service.py          # Shared caption retrieval and summarization logic
├── youtube.py          # YouTube metadata and caption retrieval
├── gemini.py           # Gemini API client
├── renderers.py        # md/txt/json/srt/vtt output renderers
├── summary_languages.py# Summary language handling
├── models.py           # Data models
├── errors.py           # Error definitions
├── utils.py            # Shared utilities
└── ui/                 # Web UI HTML / CSS / JavaScript
```

Instead of maintaining separate caption retrieval logic for the CLI and Web app, both use shared processing centered around `service.py`.

## 4. Installation

### 4.1. Install with Homebrew

If Homebrew is available, this is the easiest installation method.

```bash
brew install kkensuke/tap/yt-transcript
```

Verify the installation:

```bash
yt-transcript --version
```

The Homebrew package includes both the CLI and the Web app.

### 4.2. Run from Source

On Windows or other environments where Homebrew is not available, install Git and `uv`, then run the project from source.

```bash
git clone https://github.com/kkensuke/yt_transcript.git
cd yt_transcript
uv sync --locked --extra web
uv run yt-transcript --version
```

With this method, dependencies are installed into the repository's `.venv` directory.

Add `uv run` to subsequent commands.

```bash
uv run yt-transcript "YOUTUBE_URL" --no-summary
uv run yt-transcript web
```

The project requires Python `3.11` or later and earlier than `3.15`.

## 5. Configuring the Gemini API Key

No API key is required if you only want to retrieve captions.

A Gemini API key from Google AI Studio is required only when you want to use Gemini summarization.

:::linkcard
https://aistudio.google.com/api-keys
:::

### 5.1. macOS / Linux

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

If you want to pin a specific model, you can optionally configure `GEMINI_MODEL` as well.

```bash
export GEMINI_MODEL="gemini-flash-lite-latest"
```

### 5.2. Windows PowerShell

```powershell
$env:GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
$env:GEMINI_MODEL = "gemini-flash-lite-latest"
```

### 5.3. Do Not Hard-Code the API Key

Do not write the API key directly into the source code. The CLI uses the `GEMINI_API_KEY` environment variable.

There is also no CLI option for passing the API key directly as a command-line argument.

## 6. Using the Web App

With the Homebrew version, start the Web app with a single command:

```bash
yt-transcript web
```

When running from source:

```bash
uv run yt-transcript web
```

By default, the server starts on `127.0.0.1:8000` and opens the browser.

![yt-transcript browser app](https://raw.githubusercontent.com/kkensuke/yt_transcript/main/docs/screenshot.png)

The Web app provides the following operations in the browser:

* Enter a YouTube URL / Video ID.
* Select an output format.
* Turn Gemini summarization ON / OFF.
* Select the summary language.
* Select a Gemini model.
* Load available Gemini models.
* Select browser cookies when running locally.
* Preview captions and summaries.
* Copy content to the clipboard.
* Download files.

### 6.1. Gemini API Keys in the Web App

A Gemini API key entered in the browser is sent to the server for Gemini-related processing and then forwarded to Google's Gemini API.

It is not stored in the URL or in short-lived Web job data.

The key entered in the browser is cleared after the summarization request is sent.

When the Web app is running locally on `127.0.0.1`, it can also fall back to the `GEMINI_API_KEY` configured in the server process.

In contrast, a hosted Web app does not use a server-side `GEMINI_API_KEY`; each user provides their own key.

## 7. Basic CLI Usage

```bash
yt-transcript [OPTIONS] YOUTUBE_URL/VIDEO_ID
```

| Option                                    | Description                                                                      |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `-o, --output-dir DIR`                    | Directory for transcript and summary files                                       |
| `-f, --format {md,txt,json,srt,vtt}`      | Transcript format; defaults to `md`                                              |
| `-n, --no-summary`                        | Skip Gemini summarization                                                        |
| `-l, --summary-lang LANGUAGE`             | `auto` or a BCP 47 tag such as `en`, `ja`, `zh-Hans`, `pt-BR`, or `it`           |
| `-L, --long-summary {skip,truncate,full}` | Above 50,000 characters, skip, summarize a prefix, or send the full transcript   |
| `-c, --cookies-from-browser BROWSER`      | Use local `chrome`, `chromium`, `edge`, `firefox`, `safari`, or `brave` cookies  |
| `-m, --gemini-model MODEL_ID`             | Select the Gemini model                                                          |
| `-M, --list-gemini-models`                | List models supporting `generateContent`                                         |
| `-V, --version`                           | Print the installed application version                                          |
| `-h, --help`                              | Show CLI help                                                                    |

### 7.1. Create Captions and a Summary

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
yt-transcript "https://www.youtube.com/watch?v=VIDEO_ID"
```

You can also pass only the Video ID.

```bash
yt-transcript "VIDEO_ID"
```

Even when no API key is configured, caption retrieval succeeds and only the summary is skipped.

### 7.2. Retrieve Captions Only

```bash
yt-transcript "YOUTUBE_URL" --no-summary
```

The short option is also available:

```bash
yt-transcript "YOUTUBE_URL" -n
```

### 7.3. Change the Output Directory

```bash
yt-transcript "YOUTUBE_URL" --output-dir output/
```

Short form:

```bash
yt-transcript "YOUTUBE_URL" -o output/
```

`-o` specifies the **output directory**.

### 7.4. Change the Output Format

For example, to save captions as JSON:

```bash
yt-transcript "YOUTUBE_URL" --format json --no-summary
```

Short form:

```bash
yt-transcript "YOUTUBE_URL" -f json -n
```

The following five formats are supported:

```text
md
txt
json
srt
vtt
```

### 7.5. Specify the Summary Language

For example, summarize an English video in Japanese:

```bash
yt-transcript "YOUTUBE_URL" --summary-lang ja
```

Summarize a Japanese video in English:

```bash
yt-transcript "YOUTUBE_URL" --summary-lang en
```

Use `auto` to summarize in the same main language as the captions.

```bash
yt-transcript "YOUTUBE_URL" --summary-lang auto
```

In addition to `ja` / `en`, valid BCP 47 language tags such as `zh-Hans`, `pt-BR`, and `it` can also be used.

### 7.6. Specify a Gemini Model

```bash
yt-transcript "YOUTUBE_URL" \
  --gemini-model "gemini-flash-latest" \
  --summary-lang ja
```

Short form:

```bash
yt-transcript "YOUTUBE_URL" -m "gemini-flash-latest" -l ja
```

The model selection priority is:

1. `--gemini-model`
2. `GEMINI_MODEL`
3. Built-in default: `gemini-flash-lite-latest`

### 7.7. List Available Gemini Models

```bash
yt-transcript --list-gemini-models
```

Short form:

```bash
yt-transcript -M
```

This lists model IDs that support `generateContent`.

This command requires `GEMINI_API_KEY`.

### 7.8. Summarize Captions Longer Than 50,000 Characters

Send the full transcript:

```bash
yt-transcript "YOUTUBE_URL" --long-summary full
```

Summarize only the first 50,000 characters:

```bash
yt-transcript "YOUTUBE_URL" --long-summary truncate
```

Skip summarization for long transcripts:

```bash
yt-transcript "YOUTUBE_URL" --long-summary skip
```

The CLI default is `skip`.

Because `full` can increase Gemini usage and is also subject to the selected model's context limit, it is best used only when necessary.

### 7.9. Use Browser Cookies

Example using Chrome cookies:

```bash
yt-transcript "YOUTUBE_URL" --cookies-from-browser chrome
```

Short form:

```bash
yt-transcript "YOUTUBE_URL" -c chrome
```

Supported browsers:

```text
chrome
chromium
edge
firefox
safari
brave
```

### 7.10. Help and Version Information

```bash
yt-transcript --help
yt-transcript --version
```

Short forms:

```bash
yt-transcript -h
yt-transcript -V
```

## 8. Generated Files

With the default Markdown output, captions are saved with the following filename:

```text
{video_id}_transcript.md
```

If Gemini summarization succeeds, the following file is also generated:

```text
{video_id}_summarized.md
```

The transcript file extension changes according to the selected output format.

```text
{video_id}_transcript.txt
{video_id}_transcript.json
{video_id}_transcript.srt
{video_id}_transcript.vtt
```

Summaries are always written as Markdown.

### 8.1. Example Markdown Transcript

```markdown
# Introduction to Python Programming

**Video ID:** a1b2C3d4E5F
**YouTube URL:** https://www.youtube.com/watch?v=a1b2C3d4E5F
**Duration:** 01:02:34
**Captions:** Auto-generated captions (ja)

## Chapters

- [00:00 — Introduction](https://www.youtube.com/watch?v=a1b2C3d4E5F&t=0s)
- [03:15 — Variables](https://www.youtube.com/watch?v=a1b2C3d4E5F&t=195s)

---

**[00:00](https://www.youtube.com/watch?v=a1b2C3d4E5F&t=0s)** Hello. Today, I will explain the basics of Python.
```

The actual output varies depending on the video metadata and the caption track that can be retrieved.

### 8.2. JSON Output

JSON output stores metadata, the caption track, chapters, and caption segments in a structured form.

This is useful when you want to reuse the data later in Python or JavaScript.

### 8.3. Summary File

The summary file contains the video title, Video ID, YouTube URL, duration, and the Markdown summary generated by Gemini.

When a long transcript is processed with `truncate` or `full`, a note is also added indicating how many transcript characters were used for the summary.

## 9. Practical Use Cases

### 9.1. Create Review Notes from a Lecture Video

```bash
yt-transcript "LECTURE_VIDEO_URL" --summary-lang ja
```

Example uses:

* Review lecture content.
* Organize key points before an exam.
* Create Markdown-based study notes.

### 9.2. Transcribe an English Video and Summarize It in Japanese

```bash
yt-transcript "ENGLISH_VIDEO_URL" --summary-lang ja
```

Example uses:

* Read overseas technical videos more efficiently.
* Check your understanding after English listening practice.
* Review technical terminology together with the original wording.

### 9.3. Save Captions as Learning Material

Retrieve only the captions without generating a summary.

```bash
yt-transcript "ENGLISH_VIDEO_URL" --no-summary
```

To save them as SRT:

```bash
yt-transcript "ENGLISH_VIDEO_URL" -f srt -n
```

Example uses:

* Check answers after listening practice.
* Load captions into a subtitle player.
* Search for phrases and vocabulary.

### 9.4. Export JSON for Post-Processing

```bash
yt-transcript "YOUTUBE_URL" -f json -n -o output/
```

Example uses:

* Preprocess data for RAG.
* Analyze caption segments with your own scripts.
* Process data chapter by chapter.

### 9.5. Summarize a Long Conference Video

```bash
yt-transcript "CONFERENCE_VIDEO_URL" \
  --summary-lang ja \
  --long-summary full
```

Because the entire long transcript is sent to Gemini, keep API usage in mind.

## 10. Troubleshooting

### 10.1. Captions Cannot Be Found

Check the following:

* Whether the video has manually added or automatically generated captions.
* Whether YouTube exposes the original-language caption track.
* Whether the URL / Video ID is correct.
* Whether `yt-transcript` / `yt-dlp` is up to date.

Update the Homebrew version with:

```bash
brew update
brew upgrade yt-transcript
```

To update `yt-dlp` when running from source:

```bash
uv lock --upgrade-package yt-dlp
uv sync
```

### 10.2. `HTTP 429` Errors

YouTube may be temporarily rate-limiting requests.

Wait for a while and try again.

When running locally, you can also try using cookies from a browser in which you are already signed in.

```bash
yt-transcript "YOUTUBE_URL" -c chrome
```

### 10.3. Only Gemini Summarization Fails

Caption retrieval and Gemini summarization are separate processes, so the transcript file remains available even if Gemini summarization fails.

Check the following:

* Whether `GEMINI_API_KEY` is configured.
* Whether the API key is valid.
* Whether the Gemini API quota has been exceeded.
* Whether the selected Gemini model is available.

Available models can be checked with:

```bash
yt-transcript --list-gemini-models
```

### 10.4. The API Key Disappears in the Web App

A Gemini API key entered directly in the browser is intentionally cleared after the summarization request is sent.

Enter the key again if you want to run another summary.

If you are running locally and do not want to enter the key every time, configure `GEMINI_API_KEY` in the environment before starting the server.

## 11. Customization for Developers

### 11.1. Change the Summarization Prompt

The summarization prompt is defined in `src/yt_transcript/gemini.py`.

When running from source, you can customize the summarization policy by modifying `_build_prompt()`.

For example, for technical videos you could add requirements such as:

```text
- Prioritize concrete examples that can be used in implementations.
- Clearly identify best practices.
- Summarize cautions and common mistakes.
- Preserve commands and code snippets whenever possible.
```

Rather than editing a package installed through Homebrew directly, it is easier to clone the repository for development and make changes there.

### 11.2. Change the 50,000-Character Threshold

The constant used to detect long transcripts is `MAX_SUMMARY_LENGTH` in `src/yt_transcript/service.py`.

```python
MAX_SUMMARY_LENGTH = 50_000
```

For normal use, there is no need to modify the source code because the CLI lets you choose the behavior with `--long-summary`.

If you change the constant, also consider Gemini model limits, cost, and processing time.

### 11.3. Set Up a Development Environment

Install the Web and development dependencies:

```bash
uv sync --extra web --extra dev
```

Run tests:

```bash
uv run --extra web --extra dev pytest
```

Run Ruff checks:

```bash
uv run --extra web --extra dev ruff check .
uv run --extra web --extra dev ruff format --check .
```

## 12. View Markdown with Quick Look on macOS

If you want to preview generated Markdown files from Finder using Quick Look, you can install `QLMarkdown`.

```bash
brew install --cask qlmarkdown
```

This works well when you save many transcripts and Gemini summaries as Markdown and want to inspect them quickly from Finder.

## 13. Security Considerations

In the Web app, caption retrieval is separated from the processing that handles Gemini credentials.

* Do not send a Gemini API key when retrieving captions.
* Do not put a Gemini API key in the URL.
* Do not store a Gemini API key in short-lived Web job data.
* Do not return a Gemini API key from local environment variables to the browser.
* In a hosted Web app, each user provides their own Gemini API key.

It is important not to commit API keys to source code or Git repositories.

## 14. Summary

`yt-transcript` is a Python package that provides YouTube caption retrieval, multiple output formats, and Gemini summarization through both a CLI and a Web app.

The main features are:

* ✅ **No API key required for caption retrieval**
* ✅ **Both CLI and Web app interfaces**
* ✅ **Easy installation with Homebrew**
* ✅ **Markdown / Text / JSON / SRT / VTT output**
* ✅ **YouTube chapter information**
* ✅ **Multilingual summaries with Gemini**
* ✅ **Selectable handling for transcripts longer than 50,000 characters**
* ✅ **Browser cookie support**
* ✅ **Gemini model selection from both CLI and Web app**
* ✅ **Transcript files are preserved even if Gemini summarization fails**

The tool makes it easy to turn a long YouTube video into text first and then summarize it with Gemini only when needed, either from the CLI or directly in the browser.

---

**References**:

* [yt-transcript](https://github.com/kkensuke/yt_transcript)
* [yt-dlp](https://github.com/yt-dlp/yt-dlp)
* [Google AI Studio - API Keys](https://aistudio.google.com/api-keys)
* [uv](https://docs.astral.sh/uv/)
