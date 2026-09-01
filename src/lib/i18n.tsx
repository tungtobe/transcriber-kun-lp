import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "vi" | "ja";

const STORAGE_KEY = "tk-lang";

const vi = {
  nav: {
    features: "Tính năng",
    how: "Cách hoạt động",
    demo: "Video",
    privacy: "Bảo mật",
    install: "Cài đặt",
    faq: "FAQ",
    download: "Tải về",
  },
  hero: {
    badge: "Whisper local・ 60+ ngôn ngữ",
    h1_p1: "Bắt từng ",
    h1_highlight: "keyword",
    h1_p2: ",",
    h1_p3: "tạo memo họp ",
    h1_em: "tức thì",
    h1_p4: ".",
    desc: "Transcriberくん ghi lại trực tiếp âm thanh máy tính khi bạn họp với khách — Meet, Teams, Zoom hay offline — rồi tạo 議事録 chỉ trong vài giây. Toàn bộ chạy bằng **Whisper local**, không upload dữ liệu.",
    downloadMac: "Tải cho macOS",
    downloadWin: "Tải cho Windows",
    downloadLinux: "Tải cho Ubuntu",
    stats: [
      { k: "100%", v: "Offline & riêng tư" },
      { k: "<2s", v: "Độ trễ live" },
      { k: "60+", v: "Ngôn ngữ" },
    ],
    demoAudioLabel: "âm thanh hệ thống + mic · 16kHz",
  },
  trust: {
    label: "Hoạt động với",
    items: [
      "Google Meet",
      "Microsoft Teams",
      "Zoom",
      "Discord",
      "Họp trực tiếp",
      "File video/audio",
    ],
  },
  video: {
    kicker: "Video giới thiệu",
    title: "Transcriber Kun",
    desc: "Hiểu mọi cuộc họp theo thời gian thực.",
    tabVi: "Tiếng Việt",
    tabJa: "日本語",
    fallback: "Trình duyệt của bạn không hỗ trợ phát video.",
  },
  story: {
    kicker: "Vì sao có app này",
    title: "Tôi mệt mỏi với việc mỗi khách họp một chỗ, transcript thì lúc được lúc không.",
    p1: "Sau mỗi buổi họp online với khách, mình đều phải ghi memo và 議事録. Nhưng khách hàng mỗi người dùng một nền tảng — Google Meet, Teams, Zoom, có khi gặp trực tiếp — nguồn video lung tung, công cụ transcript có sẵn lúc thì không tải được, lúc thì chất lượng kém.",
    p2: 'Tệ hơn, khi đang họp live, có những keyword nghiệp vụ mình không bắt kịp — chỉ cần "đá hình" một dòng transcript là sẽ theo nhịp được ngay. Vậy nên mình tự xây **transcriber-kun**: chạy offline bằng Whisper, transcript live ngay trên máy, và xuất memo gọn gàng — không phụ thuộc nền tảng nào cả.',
  },
  features: {
    kicker: "Tính năng",
    title: "Mọi thứ một consultant cần sau buổi họp.",
    items: [
      {
        title: "Transcript live ngay khi họp",
        desc: "Đá hình transcript trực tiếp từ âm thanh máy tính + mic, giúp bạn bắt keyword khó và theo nhịp khách hàng.",
        tag: "Live",
      },
      {
        title: "Tuỳ chọn chạy offline với Whisper local",
        desc: "Bật chế độ offline khi cần — mô hình Whisper chạy hoàn toàn trên máy bạn, không upload, không cloud. Phù hợp dữ liệu khách hàng nhạy cảm.",
        tag: "Optional offline",
      },
      {
        title: "Memo & 議事録 tự động",
        desc: "Tóm tắt buổi họp, action items, người phụ trách và deadline — xuất Markdown/Notion/Docs trong một cú click.",
        tag: "AI Summary",
      },
      {
        title: "Mọi nguồn video, một workflow",
        desc: "Meet, Teams, Zoom, file mp4/m4a, hay ghi âm phòng họp — kéo thả vào là xong, không lệ thuộc nền tảng.",
        tag: "Universal",
      },
      {
        title: "Đa ngôn ngữ, code-switching",
        desc: "Nhận diện tiếng Việt, English, 日本語 trong cùng câu. Tốt cho cuộc họp song ngữ với khách Nhật / global.",
        tag: "60+ langs",
      },
    ],
  },
  how: {
    kicker: "Workflow",
    title: "Ba bước, không thay đổi thói quen họp của bạn.",
    steps: [
      {
        n: "01",
        t: "Bật transcriber-kun trước cuộc họp",
        d: "App tự bắt audio loopback từ Meet / Teams / Zoom — không cần plugin, không cần bot vào phòng.",
      },
      {
        n: "02",
        t: "Đá hình transcript live khi cần",
        d: "Một phím tắt mở overlay nổi, theo nhịp khách hàng, highlight keyword & thuật ngữ nghiệp vụ.",
      },
      {
        n: "03",
        t: "Xuất memo & 議事録 sau cuộc họp",
        d: "Whisper local chạy lại full audio, AI tóm tắt action items rồi export sang Notion / Docs / Markdown.",
      },
    ],
  },
  privacy: {
    kicker: "Bảo mật là mặc định · Chế độ offline",
    title: "File ghi âm của khách hàng không bao giờ rời khỏi máy bạn.",
    p1: "Khi transcript **file offline** (video họp đã ghi, audio export từ Meet / Teams / Zoom), transcriber-kun chạy Whisper hoàn toàn local. Không server, không telemetry, không API key — rút mạng app vẫn hoạt động, kiểm chứng được bằng Little Snitch / Lulu.",
    note: "* Chế độ **live transcript** dùng engine streaming riêng để đảm bảo độ trễ thấp, không áp dụng các cam kết offline bên dưới. Bạn có thể chọn engine local hoặc cloud tuỳ buổi họp.",
    listLabel: "Áp dụng cho transcript file offline",
    points: [
      "Không gửi audio lên cloud",
      "Không lưu transcript trên server",
      "Mã hoá file local bằng macOS Keychain",
      "Mã nguồn engine: open & auditable",
    ],
  },
  install: {
    kicker: "Cài đặt",
    title: "Hướng dẫn cài đặt",
    desc: "Cài đặt transcriber-kun trên macOS, Windows và Ubuntu chỉ trong vài bước đơn giản.",
    noticeTitle: "Lưu ý quan trọng",
    noticeBody:
      "Ứng dụng **chưa được ký chứng chỉ bảo mật (code signing)**, vì vậy hệ điều hành có thể hiển thị cảnh báo an toàn. Đây là hành vi **bình thường** đối với các ứng dụng chưa phát hành chính thức.",
    macos: {
      step1Title: "Tải file cài đặt",
      step1Body: "Tải file: `Transcriber-kun.dmg`",
      step2Title: "Mở file DMG",
      step2Items: [
        "Double-click vào file `Transcriber-kun.dmg`",
        "Một cửa sổ cài đặt sẽ hiện ra",
        "Kéo biểu tượng **Transcriber-kun.app** vào thư mục **Applications**",
      ],
      step3Title: "Cảnh báo bảo mật có thể gặp",
      step3Quote:
        '"Transcriber-kun.app cannot be opened because it is from an unidentified developer"',
      step3Note: "Đây là cảnh báo mặc định do ứng dụng chưa được ký chứng chỉ bảo mật.",
      step4Title: "Cách cho phép mở ứng dụng",
      method1Title: "Mở bằng chuột phải (đơn giản & an toàn nhất)",
      method1Items: [
        "Mở **Applications**",
        "Chuột phải vào **Transcriber-kun.app**",
        "Chọn **Open**",
        "Khi hộp thoại cảnh báo hiện ra → chọn **Open**",
      ],
      method1Tip: "➡️ Sau thao tác này, ứng dụng sẽ mở bình thường ở các lần sau.",
      method2Title: "Cho phép trong System Settings",
      method2Items: [
        "Mở **System Settings**",
        "Vào **Privacy & Security**",
        "Kéo xuống phần **Security**",
        "Tại thông báo chặn ứng dụng → bấm **Allow Anyway**",
        "Mở lại ứng dụng từ **Applications**",
      ],
      advancedTitle: "Tuỳ chọn nâng cao (dành cho người dùng kỹ thuật)",
      advancedDesc: "Mở Terminal và chạy lệnh:",
    },
    windows: {
      step1Title: "Tải file cài đặt",
      step1Body: "Tải file: `Transcriber-kun_x64_en-US.msi.zip`",
      step1Note: "Giải nén file zip để lấy file `.msi` rồi chạy cài đặt.",
      step2Title: "Cảnh báo bảo mật có thể gặp",
      step2Quote: '"Windows protected your PC"',
      step3Title: "Cách cho phép cài đặt",
      step3Items: [
        "Click **More info**",
        "Click **Run anyway**",
        "Tiếp tục quá trình cài đặt như bình thường",
      ],
      step4Title: "Trường hợp bị chặn tải trên trình duyệt",
      step4Desc: "Chrome / Edge có thể hiển thị cảnh báo khi tải file.",
      step4Items: ["Chọn **Keep** hoặc **Keep anyway** để tiếp tục tải"],
    },
    linux: {
      step1Title: "Tải file cài đặt",
      step1Body: "Tải file: `Transcriber-kun_amd64.deb` (Ubuntu / Debian, 64-bit)",
      step1Note:
        "Bản Linux hiện chỉ hỗ trợ Ubuntu / Debian 64-bit. Các distro khác chưa có gói cài sẵn.",
      step2Title: "Cài gói .deb",
      step2Items: [
        "Double-click file `.deb` để mở bằng **App Center**, rồi bấm **Install**",
        "Hoặc chạy trong Terminal: `sudo apt install ./Transcriber-kun_amd64.deb`",
        "Mở **Transcriber-kun** từ menu ứng dụng như bình thường",
      ],
      step3Title: "Cài ffmpeg",
      step3Desc:
        "App cần ffmpeg để xử lý audio/video. Lần đầu mở, màn hình setup sẽ báo nếu máy chưa có.",
      step3Items: [
        "Bấm **Install ffmpeg** trong màn hình setup, rồi nhập mật khẩu khi hệ thống hỏi",
        "Hoặc cài tay: `sudo apt install ffmpeg`",
      ],
    },
  },
  faq: {
    kicker: "FAQ",
    title: "Câu hỏi thường gặp",
    qa: [
      {
        q: "App có thực sự chạy offline không?",
        a: "Có. Mô hình Whisper được đóng gói sẵn, sau lần tải đầu tiên bạn có thể rút mạng hoàn toàn. Không có endpoint nào được gọi trong runtime khi transcribe. Nhớ setting trong cài đặt là 'Local' để đảm bảo.",
      },
      {
        q: "Hỗ trợ Windows, Ubuntu không?",
        a: "Có cả hai, đầy đủ tính năng như bản mac. Nhưng ko chắc là chạy ổn được trên mọi cấu hình — mình test kỹ nhất trên mac.",
      },
      {
        q: "Có capture được audio của Google Meet / Teams không?",
        a: "Có, trên cả macOS, Windows và Ubuntu. App thu âm thanh ở mức hệ thống nên capture mọi nguồn — không cần cài plugin riêng cho từng nền tảng.",
      },
      {
        q: "Transcript tiếng Việt, Nhật có chính xác không?",
        a: "Nếu chạy local, chọn Whisper large thì chính xác hơn nhưng sẽ nặng và lâu hơn. Nếu chạy online với Gemini, accuracy sẽ cao hơn nhưng cần setup API key trước.",
      },
      {
        q: "Có miễn phí không?",
        a: "Free dùng vô thời hạn cho anh chị em thiện lành.",
      },
    ],
  },
  cta: {
    title: "Sẵn sàng không bỏ lỡ keyword nào nữa?",
    desc: "Tải transcriber-kun, dùng miễn phí cho buổi họp đầu tiên — không cần đăng ký.",
    sysreq: "macOS 12+ · Windows 10+ · Ubuntu 22.04+ · 480MB (kèm Whisper large)",
  },
  footer: {
    privacy: "Privacy",
    changelog: "Changelog",
    contact: "Contact",
  },
};

export type Dict = typeof vi;

const ja: Dict = {
  nav: {
    features: "機能",
    how: "仕組み",
    demo: "デモ動画",
    privacy: "セキュリティ",
    install: "インストール",
    faq: "FAQ",
    download: "ダウンロード",
  },
  hero: {
    badge: "Whisperローカル・60+言語対応",
    h1_p1: "会議中の",
    h1_highlight: "キーワード",
    h1_p2: "を逃さず、",
    h1_p3: "議事録を",
    h1_em: "瞬時に",
    h1_p4: "。",
    desc: "Transcriberくんは、Meet・Teams・Zoom・対面を問わず、商談中のPC音声をそのまま文字起こしし、数秒で議事録を作成します。すべて**ローカルのWhisper**で動作し、データは一切アップロードされません。",
    downloadMac: "macOS版をダウンロード",
    downloadWin: "Windows版をダウンロード",
    downloadLinux: "Ubuntu版をダウンロード",
    stats: [
      { k: "100%", v: "オフライン&プライベート" },
      { k: "<2s", v: "ライブ遅延" },
      { k: "60+", v: "対応言語" },
    ],
    demoAudioLabel: "システム音声 + マイク · 16kHz",
  },
  trust: {
    label: "対応サービス",
    items: [
      "Google Meet",
      "Microsoft Teams",
      "Zoom",
      "Discord",
      "対面ミーティング",
      "動画・音声ファイル",
    ],
  },
  video: {
    kicker: "紹介動画",
    title: "Transcriberくん。",
    desc: "全ての会議をリアルタイムで理解。",
    tabVi: "Tiếng Việt",
    tabJa: "日本語",
    fallback: "お使いのブラウザは動画再生に対応していません。",
  },
  story: {
    kicker: "開発の背景",
    title: "客先ごとにツールがバラバラ、文字起こしも安定しない——そんな状況にうんざりしていました。",
    p1: "オンライン商談のあとには毎回メモと議事録を作っています。しかしお客様ごとに使うプラットフォームが違い——Google Meet、Teams、Zoom、ときには対面——動画ソースはバラバラで、既存の文字起こしツールはダウンロードできなかったり、品質が低かったりしました。",
    p2: "さらにライブの会議中は、聞き取れない専門用語のキーワードもあります。トランスクリプトを一行チラ見できれば、すぐに流れに追いつけるのに。そこで**transcriber-kun**を自作しました。Whisperでオフライン動作し、その場でライブ文字起こしを行い、きれいなメモを出力します——どのプラットフォームにも依存しません。",
  },
  features: {
    kicker: "機能",
    title: "会議後にコンサルタントが必要とするすべてを。",
    items: [
      {
        title: "会議中のライブ文字起こし",
        desc: "PC音声とマイクからリアルタイムに文字起こし。聞き取りにくいキーワードを拾い、お客様の話すテンポについていけます。",
        tag: "Live",
      },
      {
        title: "ローカルWhisperでオフライン実行",
        desc: "必要なときだけオフラインモードをON。Whisperモデルが完全にローカルで動作し、アップロードもクラウドもなし。機密性の高い顧客データに最適です。",
        tag: "Optional offline",
      },
      {
        title: "メモ&議事録を自動作成",
        desc: "会議の要約、アクションアイテム、担当者、期限を整理し、ワンクリックでMarkdown / Notion / Docsへ出力。",
        tag: "AI Summary",
      },
      {
        title: "あらゆる動画ソースを、ひとつのワークフローで",
        desc: "Meet、Teams、Zoom、mp4 / m4aファイル、会議室の録音まで——ドラッグ&ドロップするだけ。プラットフォームに縛られません。",
        tag: "Universal",
      },
      {
        title: "多言語&コードスイッチング対応",
        desc: "同じ文の中のベトナム語・英語・日本語を認識。日本やグローバルのお客様とのバイリンガル会議に最適です。",
        tag: "60+ langs",
      },
    ],
  },
  how: {
    kicker: "ワークフロー",
    title: "3ステップ。会議のスタイルを変える必要はありません。",
    steps: [
      {
        n: "01",
        t: "会議前にtranscriber-kunを起動",
        d: "Meet / Teams / Zoomの音声をループバックで自動キャプチャ。プラグインもボットの入室も不要です。",
      },
      {
        n: "02",
        t: "必要なときにライブ字幕をチラ見",
        d: "ショートカットひとつでフローティングオーバーレイを表示。キーワードや専門用語をハイライトし、会話に追いつけます。",
      },
      {
        n: "03",
        t: "会議後にメモ&議事録を出力",
        d: "ローカルWhisperが全音声を再処理し、AIがアクションアイテムを要約してNotion / Docs / Markdownへエクスポート。",
      },
    ],
  },
  privacy: {
    kicker: "デフォルトで安全 · オフラインモード",
    title: "お客様の録音ファイルが、あなたのPCの外に出ることはありません。",
    p1: "録画済みの会議動画やMeet / Teams / Zoomから書き出した音声など、**オフラインのファイル**を文字起こしする際、transcriber-kunはWhisperを完全ローカルで実行します。サーバーなし、テレメトリなし、APIキーなし——ネットを切っても動作し、Little Snitch / Luluで検証できます。",
    note: "* **ライブ文字起こし**モードは低遅延を実現するため専用のストリーミングエンジンを使用しており、下記のオフラインの保証は適用されません。会議ごとにローカル / クラウドエンジンを選択できます。",
    listLabel: "オフラインファイルの文字起こしに適用",
    points: [
      "音声をクラウドへ送信しない",
      "トランスクリプトをサーバーに保存しない",
      "macOS Keychainでローカルファイルを暗号化",
      "エンジンのソースコードはオープンで監査可能",
    ],
  },
  install: {
    kicker: "インストール",
    title: "インストールガイド",
    desc: "macOS・Windows・Ubuntuへのインストールは、数ステップで完了します。",
    noticeTitle: "重要なお知らせ",
    noticeBody:
      "本アプリは**コード署名(code signing)されていない**ため、OSがセキュリティ警告を表示することがあります。正式リリース前のアプリでは**通常**の動作です。",
    macos: {
      step1Title: "インストーラーをダウンロード",
      step1Body: "ファイルをダウンロード: `Transcriber-kun.dmg`",
      step2Title: "DMGファイルを開く",
      step2Items: [
        "`Transcriber-kun.dmg`をダブルクリック",
        "インストールウィンドウが表示されます",
        "**Transcriber-kun.app**のアイコンを**Applications**フォルダへドラッグ",
      ],
      step3Title: "表示される可能性のあるセキュリティ警告",
      step3Quote:
        '"Transcriber-kun.app cannot be opened because it is from an unidentified developer"',
      step3Note: "アプリがコード署名されていないために表示される、デフォルトの警告です。",
      step4Title: "アプリを開く許可の設定方法",
      method1Title: "右クリックで開く(いちばん簡単&安全)",
      method1Items: [
        "**Applications**を開く",
        "**Transcriber-kun.app**を右クリック",
        "**Open**を選択",
        "警告ダイアログが表示されたら**Open**をクリック",
      ],
      method1Tip: "➡️ 一度この操作をすれば、次回以降は普通に開けます。",
      method2Title: "System Settingsで許可",
      method2Items: [
        "**System Settings**を開く",
        "**Privacy & Security**へ移動",
        "**Security**セクションまでスクロール",
        "ブロック通知の横の**Allow Anyway**をクリック",
        "**Applications**からアプリを開き直す",
      ],
      advancedTitle: "上級者向けオプション",
      advancedDesc: "Terminalを開いて次のコマンドを実行:",
    },
    windows: {
      step1Title: "インストーラーをダウンロード",
      step1Body: "ファイルをダウンロード: `Transcriber-kun_x64_en-US.msi.zip`",
      step1Note: "zipを解凍して`.msi`ファイルを取り出し、実行してください。",
      step2Title: "表示される可能性のあるセキュリティ警告",
      step2Quote: '"Windows protected your PC"',
      step3Title: "インストールを許可する手順",
      step3Items: [
        "**More info**をクリック",
        "**Run anyway**をクリック",
        "そのまま通常どおりインストールを続行",
      ],
      step4Title: "ブラウザでダウンロードがブロックされた場合",
      step4Desc: "Chrome / Edgeがダウンロード時に警告を表示することがあります。",
      step4Items: ["**Keep**または**Keep anyway**を選択してダウンロードを続行"],
    },
    linux: {
      step1Title: "インストーラーをダウンロード",
      step1Body: "ファイルをダウンロード: `Transcriber-kun_amd64.deb`(Ubuntu / Debian、64-bit)",
      step1Note:
        "Linux版は現在 Ubuntu / Debian(64-bit)のみ対応しています。他のディストリビューション向けのパッケージはまだありません。",
      step2Title: ".deb パッケージをインストール",
      step2Items: [
        "`.deb`ファイルをダブルクリックして**App Center**で開き、**Install**をクリック",
        "またはターミナルで実行: `sudo apt install ./Transcriber-kun_amd64.deb`",
        "アプリメニューから**Transcriber-kun**を通常どおり起動",
      ],
      step3Title: "ffmpeg をインストール",
      step3Desc:
        "音声・動画の処理に ffmpeg が必要です。未インストールの場合は初回起動時のセットアップ画面でお知らせします。",
      step3Items: [
        "セットアップ画面の**Install ffmpeg**をクリックし、表示されたらパスワードを入力",
        "または手動でインストール: `sudo apt install ffmpeg`",
      ],
    },
  },
  faq: {
    kicker: "FAQ",
    title: "よくある質問",
    qa: [
      {
        q: "本当にオフラインで動作しますか?",
        a: "はい。Whisperモデルは同梱されており、初回ダウンロード後は完全にネットを切って使えます。文字起こし中に外部エンドポイントへの通信は一切ありません。設定が「Local」になっていることをご確認ください。",
      },
      {
        q: "WindowsやUbuntuに対応していますか?",
        a: "どちらもMac版と同等の機能で対応しています。ただし、すべての環境で安定動作する保証はありません。開発者はMacで最も入念にテストしています。",
      },
      {
        q: "Google Meet / Teamsの音声もキャプチャできますか?",
        a: "macOS・Windows・Ubuntu のいずれでも可能です。システムレベルで音声を取り込むため、あらゆる音源をキャプチャでき、プラットフォームごとのプラグインは不要です。",
      },
      {
        q: "ベトナム語や日本語の文字起こし精度は?",
        a: "ローカル実行の場合、Whisper largeを選ぶと精度が上がりますが、その分処理が重く時間がかかります。Geminiでのオンライン実行なら精度はさらに高くなりますが、事前にAPIキーの設定が必要です。",
      },
      {
        q: "無料ですか?",
        a: "はい、無期限で無料でお使いいただけます。",
      },
    ],
  },
  cta: {
    title: "もうキーワードを聞き逃さない準備はできましたか?",
    desc: "transcriber-kunをダウンロード。最初の会議から無料で使えます——登録不要。",
    sysreq: "macOS 12+ · Windows 10+ · Ubuntu 22.04+ · 480MB(Whisper large同梱)",
  },
  footer: {
    privacy: "プライバシー",
    changelog: "更新履歴",
    contact: "お問い合わせ",
  },
};

export const translations: Record<Lang, Dict> = { vi, ja };

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  // Read persisted language after mount (SSR-safe: server always renders "vi").
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "ja") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

/**
 * Renders a translation string with lightweight inline markup:
 * **bold** → <strong>, `code` → <code>.
 */
export function Rich({
  text,
  strongClass = "text-foreground",
  codeClass = "rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground",
}: {
  text: string;
  strongClass?: string;
  codeClass?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className={strongClass}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className={codeClass}>
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}
