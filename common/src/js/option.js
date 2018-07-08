import {
  isEmpty
} from 'ramda';

const getOption = data => {
  if (!data.option || isEmpty(data.option)) {
    data.option = {
      position: {
        top: 130,
        right: 10
      },
      viewOption: {
        google: true,
        bing: true,
        duckDuckGo: true,
        yahoo: true
      },
      blockList: [],
      blockKeyword: "",
      indexTarget: {
        bookmark: true,
        history: false
      },
      changed: false,
      isIndexing: false,
      advancedOption: {
        scrapingApi: {
          url: '',
          verify: false
        },
        queryParseApi: {
          url: '',
          verify: false
        },
        scoringApi: {
          url: '',
          verify: false
        }
      }
    }
  } else {
    data.option.changed = false;
    data.option.blockKeyword = '';
    data.option.isIndexing = localStorage.getItem('suspend_indexing') === 'true';
  }
  return data.option;
};

const documentCount = () => {
  return localStorage.length - 2;
};

const setIndexedUrl = (url) => {
  localStorage.setItem(`indexed:${url}`, '1');
};

const hasIndex = (url) => {
  return !!localStorage.getItem(`indexed:${url}`);
}

const deleteIndexedStatus = () => {
  localStorage.key.forEach(v => {
    if (v.startsWith('indexed:')) {
      localStorage.removeItem(v);
    }
  });
};

const indexingStatus = () => {
  const status = localStorage.getItem('suspend_indexing');
  return status === 'true';
}

const setIndexingStatus = (status) => {
  localStorage.setItem('suspend_indexing', status);
}

const suspendIndexing = () => {
  localStorage.setItem('suspend_indexing', true);
}

const resumeIndexing = () => {
  localStorage.setItem('suspend_indexing', false);
}

export {
  getOption,
  hasIndex,
  documentCount,
  setIndexedUrl,
  deleteIndexedStatus,
  indexingStatus,
  setIndexingStatus,
  suspendIndexing,
  resumeIndexing,
};