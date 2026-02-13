Commit new file
# Eeeemo AI School

社内向けAI育成プラットフォーム（学習・テスト・履歴管理・AIチャット）です。

## URL
- 本番: https://eeeemo-aischool.web.app

## 主な機能
- ログイン / ユーザー管理
- 部署別カリキュラム表示
- 動画学習・テスト・合格判定
- 受講履歴管理（管理者）
- 蓄積型AIチャット（ローカル / Gemini連携）

## ローカルで開く
```bash
cd "/Users/yukihikomizutani/Documents/New project/ai-school"
open index.html

cd "/Users/yukihikomizutani/Documents/New project/ai-school"
bash tools/firebase_deploy.sh

主要ファイル
index.html : 画面本体
styles.css : デザイン
courses.json : コース定義
firebase_deploy.sh : Hostingデプロイスクリプト
index.js : Gemini連携用Function

comit new file
