# 導入手順

この版はGoogleフォームへ直接送信します。Apps Scriptは不要です。

## GitHubへアップロード

1. ZIPを展開します。
2. GitHubの対象リポジトリを開きます。
3. Add file → Upload files。
4. 次の4ファイルをアップロードまたは上書きします。
   - index.html
   - style.css
   - config.js
   - script.js
5. Commit changesを押します。

以前のresults.htmlやresults.jsが残っている場合は削除してください。

## GitHub Pages

Settings → Pages で、

- Source: Deploy from a branch
- Branch: main
- Folder: /(root)

にします。

## テスト

1. 公開サイトをCtrl+F5で更新。
2. テスト回答を1件送信。
3. Googleフォームの「回答」タブ、または回答先スプレッドシートを確認。
4. 1行追加されていれば成功。
5. テスト回答を削除。

## 注意

- Googleフォームの質問を削除して作り直すとentry IDが変わる場合があります。
- メールアドレス収集はOFF。
- 回答を1回に制限もOFF。
- Reddit公開前に必ず自分で1件テストしてください。
