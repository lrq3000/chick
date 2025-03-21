{
  manifest_version: 3,
  name: 'Chick',
  description: 'Full text bookmarks and browsing history search.',
  version: '0.0.35',
  omnibox: {
    keyword: 'e',
  },
  permissions: [
    'tabs',
    'contextMenus',
    'storage',
    'unlimitedStorage',
    'bookmarks',
    'history',
    'notifications',
    '<all_urls>',
  ],
  web_accessible_resources: ['img/logo.png'],
  icons: {
    '14': 'img/icon_14.png',
    '16': 'img/icon_16.png',
    '24': 'img/icon_24.png',
    '32': 'img/icon_32.png',
    '48': 'img/icon_48.png',
    '64': 'img/icon_64.png',
    '128': 'img/icon_128.png',
    '256': 'img/icon_256.png',
    '512': 'img/icon_512.png',
    '1024': 'img/icon_1024.png',
  },
  browser_action: {
    default_title: 'Chick',
    default_popup: 'popup/index.html',
  },
  background: {
    service_worker: 'dist/background.js',
    type: 'module'
  },
  content_scripts: [{
    matches: [
      'https://www.google.com/*',
      'https://www.google.co.jp/*',
      'https://www.bing.com/*',
      'https://duckduckgo.com/*',
      'https://search.yahoo.co.jp/*',
    ],
    js: ['dist/content.js'],
  }],
  options_page: 'option/index.html',
  web_accessible_resources: [{
    resources: ['img/logo.png'],
    matches: ['<all_urls>'],
  }],
}
