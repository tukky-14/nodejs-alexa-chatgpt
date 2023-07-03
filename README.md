## ChatGPT を使用した Alexa Skill の開発

### 開発準備

-   [Amazon Developer](https://developer.amazon.com/dashboard)の登録
-   [AWS アカウント](https://aws.amazon.com/jp/console/)の作成
-   [OpenAI](https://openai.com/blog/openai-api) で API キーの発行

<br/>

### 構築手順

以下の記事に従う。  
チュートリアルの「AskWeatherIntent ハンドラー」の手順で Alexa に実行して欲しい内容を実装。　　
（今回であれば OpenAI の API を呼び出す処理）

-   [ASK SDK のセットアップ](https://developer.amazon.com/ja-JP/docs/alexa/alexa-skills-kit-sdk-for-nodejs/set-up-the-sdk.html)
-   [チュートリアル： ASK SDK for Node.js で Alexa スキル開発を始める](https://developer.amazon.com/ja-JP/docs/alexa/alexa-skills-kit-sdk-for-nodejs/develop-your-first-skill.html)

<br/>

### トラブルシューティング

-   作成したスキルが Echo で反応しない場合
    -   Alexa アプリでスキルが有効になっていることを確認  
        「その他」 > 「スキル・ゲーム」 > 「マイスキル」 > 「開発」 > 「[作成したスキル名]」
    -   呼び出し名を工夫する  
        他のアプリで使われていそうなもの、言い間違いが起こりにくそうなものは避ける。今回は「なんでもアシスタント」とした

<br/>

### 参考資料

-   [Alexa Skills Kit とは？](https://developer.amazon.com/ja-JP/docs/alexa/ask-overviews/what-is-the-alexa-skills-kit.html)
-   [カスタムスキルの呼び出し名を決定する](https://developer.amazon.com/ja-JP/docs/alexa/custom-skills/choose-the-invocation-name-for-a-custom-skill.html)
-   [【もはや人間！？】アレクサと ChatGPT を連携できるようにカスタマイズしてみた。](https://www.kuretom.com/alexa-chatgpt/)
