# EEEEMO AI School 運用チェックリスト

## 0. 事前準備
- ロゴ: `assets/logo-main.svg` / `assets/logo-icon.svg` が配置済みか確認
- 動画: `videos/` にMP4を配置
- コース設定: `courses.json` を最新化

## 1. 本番データ投入（最初の1回）
1. `courses.template.json` を開く
2. タイトル/説明/動画ファイル名を実データに変更
3. 完成したら `courses.json` に上書き
4. `python3 tools/validate_school_data.py` を実行して整合性チェック

## 2. ローカル起動（毎回）
1. ターミナルで以下を実行
   - `cd "/Users/yukihikomizutani/Documents/New project/ai-school"`
   - `python3 -m http.server 8080`
2. ブラウザで開く
   - `http://127.0.0.1:8080/index.html`

## 3. 管理者確認
- ログイン: `admin@eeeemo.co.jp / admin123`
- 1コース再生 -> テスト実行 -> 合格
- 管理画面で以下を確認
  - カテゴリ別合格率
  - 未受講ユーザー一覧
  - テスト履歴（回数含む）
  - JSON/CSV/週次エクスポート

## 4. 通知連携（Chatwork）
- 管理画面で以下を入力
  - Webhook Relay URL
  - Chatwork Room ID
- `連携設定を保存` -> `テスト通知送信`

## 5. 運用ルール
- 週1回: 週次エクスポートを保存
- 月1回: テスト問題JSONを見直し
- 組織変更時: 部署割り当てを更新
