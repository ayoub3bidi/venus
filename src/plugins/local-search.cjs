module.exports = [
  '@easyops-cn/docusaurus-search-local',
  {
    hashed: true,
    language: ['en', 'fr'],
    docsRouteBasePath: '/docs',
    indexDocs: true,
    indexPages: false,
    highlightSearchTermsOnTargetPage: true,
    removeDefaultStopWordFilter: true,
    removeDefaultStemmer: true,
  },
];
