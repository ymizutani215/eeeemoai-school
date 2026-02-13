# EEEEMO AI School

社内向けAIスクールアプリ（静的フロントエンド）です。

## 実装済み機能
- ログイン機能
- 管理者向け受講履歴管理（ユーザー別表示・JSON出力・履歴初期化）
- 部署別カリキュラム表示
- 管理者向け部署割り当て変更
- コースごとの理解度テスト（カテゴリ別問題）
- 80点以上で修了証発行（A4 PDF保存向け）・上長通知・次コース自動表示
- 管理者向けテスト履歴／通知管理
- Chatwork Relay連携による上長通知送信（任意設定）
- 管理者向けKPI表示（部署別受講率・テスト合格率・未完了ユーザー）
- Chatwork連携テスト通知送信（設定画面から実行）
- カテゴリ別合格率・未受講ユーザー詳細表示
- テスト運用設定（合格ライン・再受験上限・カテゴリ別問題編集）
- バックアップ/復元（JSON）、CSVエクスポート、週次エクスポート
- 蓄積型AIチャット（コース/テスト/過去Q&A参照、管理者ナレッジ登録）
- Gemini連携モード（Relay URL経由で外部LLM回答に切替可能）
- Gemini日次上限（ユーザーごと）と上限到達時の自動ローカル切替
- 管理画面でのユーザーID/パスワード個別発行・CSV一括発行
- 管理画面でのパスワード再発行・ユーザー有効/無効切替（ログイン停止）
- 管理画面でのユーザー削除（履歴も同時削除するか選択可）
- ユーザー削除時に対象ユーザーのCSVバックアップを自動ダウンロード

## ログインアカウント
- 管理者: `admin@eeeemo.co.jp / admin123`
- 一般: `sales@eeeemo.co.jp / user123`
- 一般: `marketing@eeeemo.co.jp / user123`
- 一般: `dev@eeeemo.co.jp / user123`

## 構成
- `index.html`: UI本体
- `styles.css`: ロゴに合わせた丸みのあるデザイン
- `app.js`: 認証・学習・履歴管理・部署割り当てロジック
- `courses.json`: コース設定
- `courses.template.json`: 本番投入用ひな形（編集して `courses.json` に反映）
- `OPS_CHECKLIST.md`: 非エンジニア向けの運用手順チェックリスト
- `assets/logo-main.svg`: 納品版メインロゴ
- `assets/logo-icon.svg`: 納品版アイコンロゴ（favicon使用）
- `assets/logo-original.png`: 元のEmoロゴ素材（参照用）
- `relay/chatwork-relay-example.js`: Chatwork Relay最小サンプル
- `relay/chatwork-relay-worker.js`: Cloudflare Workers 本番用Relay
- `relay/wrangler.toml`: Workers設定
- `relay/DEPLOY.md`: デプロイ手順
- `videos/`: 動画ファイル配置フォルダ
- `tools/validate_school_data.py`: `courses.json` の整合性チェックツール
- `templates/users-import-template.csv`: ユーザー一括発行用テンプレート
- `USER_ISSUE_CHECKLIST.md`: ユーザー発行/再発行/無効化の確認手順

## 動画追加手順
1. `videos/` に `.mp4` を配置
2. `courses.json` にコースを追加（`departments` を設定）

## 事前チェック（動画なしでも可）
1. `cd "/Users/yukihikomizutani/Documents/New project/ai-school"`
2. `python3 tools/validate_school_data.py`
3. 動画の存在まで確認する場合: `python3 tools/validate_school_data.py --check-videos`

## 注意
- 受講履歴と部署割り当ては `localStorage` に保存されます（ブラウザ単位）。
- 動画再生にはローカルサーバー経由での閲覧を推奨します。
- Chatwork連携はセキュリティ上、ブラウザにAPIトークンを持たせず `Webhook Relay URL` 側でトークン管理してください。

## Firebase Hosting デプロイ（project: `eeeemo-aischool`）
1. Firebaseログイン（初回のみ）
   - `firebase login`
2. データ整合性チェック
   - `python3 tools/validate_school_data.py`
3. デプロイ実行
   - `bash tools/firebase_deploy.sh`

補足:
- `firebase login` はブラウザ認証が必要です。
- 事前に `Node.js` と `firebase-tools` の導入が必要です。

## Gemini連携（任意）
1. 管理者でログイン -> `AIチャット` タブ
2. `AI連携設定（管理者）` で以下を設定
   - 回答モード: `ハイブリッド（推奨）` または `Gemini優先`
   - Gemini Relay URL: あなたのサーバー側APIエンドポイント
   - Gemini Model: 例 `gemini-1.5-flash`
3. 保存してチャット送信

補足:
- サンプルRelay実装: `relay/firebase-gemini-relay-template.js`
- APIキーはブラウザに置かず、Relay/Functions側の環境変数で管理してください。

### 最短セットアップ（このリポジトリで実行）
1. 依存導入
   - `bash tools/setup_gemini_relay.sh`
2. APIキー登録
   - `firebase functions:secrets:set GEMINI_API_KEY --project eeeemo-aischool`
3. Relayデプロイ
   - `bash tools/deploy_gemini_relay.sh`
4. Firebase Console の Functions `chat` から URL を取得
5. アプリ管理画面 `AIチャット > AI連携設定` に URL を貼って保存

## Chatwork連携テスト（ローカル）
1. Mock Relay起動
   - `python3 /Users/yukihikomizutani/Documents/New project/ai-school/relay/mock-relay.py`
2. 疎通テスト実行（別ターミナル）
   - `bash /Users/yukihikomizutani/Documents/New project/ai-school/relay/test-relay.sh`
3. アプリ管理画面で設定
   - Relay URL: `http://127.0.0.1:8788/chatwork`
   - Room ID: 任意（例: `123456789`）
   - `連携設定を保存` → `テスト通知送信`
