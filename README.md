# 味噌汁 Bot

Discord Bot for Glitch
https://discord-zoo-bot.glitch.me

## About

- テキストチャットのメッセージを監視し、NG ワードを発言した場合に味噌汁がこぼれます
- 味噌汁がこぼれた直後の 3 分間 は味噌汁がこぼれない

### NG ワードの選定

1. 直近 500 個 のテキストチャットを形態素解析し、"名詞のみ" かつ "2 文字以上の単語" を取り出す
2. 出現回数上位 30 を算出し、その中からランダムに選択

選択した単語を発言した場合は味噌汁がこぼれる
味噌汁がこぼれた場合は再度単語の抽選が行われる

## Discord Bot

### Command

| command          | description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `.ms create-ng`  | NG ワードの再登録を行います                                     |
| `.ms tell-ng`    | 現在の NG ワードを教えてもらいます                              |
| `.ms import-log` | 投稿されたチャンネルの直近 100 件分のメッセージをインポートする |

## ENV

| name                | value                    |
| ------------------- | ------------------------ |
| NODE_ENV            | production / development |
| DISCORD_BOT_TOKEN   | Discord bot token        |
| PORT                | express listen port[^1]  |
| TYPEORM_CONNECTION  | typeorm option[^2]       |
| TYPEORM_DATABASE    | typeorm option[^2]       |
| TYPEORM_SYNCHRONIZE | typeorm option[^2]       |
| TYPEORM_LOGGING     | typeorm option[^2]       |
| TYPEORM_ENTITIES    | typeorm option[^2]       |
| TYPEORM_MIGRATIONS  | typeorm option[^2]       |
| TYPEORM_SUBSCRIBERS | typeorm option[^2]       |

[^1]: Glitch で使う場合は設定不要。設定した場合 3000 以外はエラーになる。
[^2]: Glitch 本番環境では ormconfig.json が読み込めないので環境変数で設定する
