# AI School 実装メモ（次回再開用）

## 今日までの実装
- ログイン機能（管理者/一般）
- 学習タブ（動画再生・完了管理・検索/カテゴリ/部署フィルタ）
- 受講履歴管理（管理者）
- 部署別カリキュラム
- 新ロゴ（logo-main.svg / logo-icon.svg）反映
- 理解度テスト実装（カテゴリ別5問）
- 80点以上で:
  - 修了証発行（A4 PDF保存向け）
  - 上長通知記録
  - 次コース自動表示
- 管理者画面にテスト履歴・通知一覧を追加
- Chatwork連携設定UI（Relay URL / Room ID）追加

## 重要な注意点
- file:// 直開きだと courses.json fetch が失敗しやすい
- 失敗時はキャッシュ or 内蔵サンプルで起動するフォールバックを実装済み
- 推奨起動:
  - python3 -m http.server 8000
  - http://localhost:8000/ai-school/index.html

## ログイン情報
- admin@eeeemo.co.jp / admin123
- sales@eeeemo.co.jp / user123
- marketing@eeeemo.co.jp / user123
- dev@eeeemo.co.jp / user123

## 次回の検証候補
1. テスト問題文の業務運用チューニング
2. 修了証デザイン最終化（社名・署名・発行番号）
3. Chatwork Relay 実送信テスト
4. 管理画面KPI（部署別受講率、カテゴリ別合格率）
5. localStorage から API/DB 保存へ移行設計
