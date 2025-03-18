import {
  isEmpty,
} from 'ramda';
import uuid5 from "uuid/v5";

const getOption = data => {
  if (!data.option || isEmpty(data.option)) {
    data.option = {
      viewOption: {
        google: true,
        bing: true,
        duckDuckGo: true,
        yahoo: true
      },
      blockList: [],
      blockKeyword: '',
      query: '',
      searchResult: [],
      deleteUrlList: [],
      indexInfo: [],
      inputTag: '',
      indexTarget: {
        bookmark: true,
        history: true,
        pocket: false,
      },
      isIndexing: false,
      status: {
        indexedCount: 0,
        documentCount: 0
      },
      tags: [],
      blockDomains: []
    }
  } else {
    Object.assign(data.option, {
      blockKeyword: '',
      query: '',
      searchResult: [],
      deleteUrlList: [],
      isIndexing: localStorage.getItem('suspend_indexing') === 'true',
      indexInfo: [],
      inputTag: '',
    });

    if (!data.option.indexTarget.pocket) {
      data.option.indexTarget.pocket = false;
    }

    if (!data.option.tags) {
      data.option.tags = [];
    }

    if (!data.option.blockDomains) {
      data.option.blockDomains = [];
    }

    if (!data.option.status) {
      data.option.status = {
        indexedCount: 0,
        documentCount: 0
      }
    }
  }
  return data.option;
};

const documentCount = () => {
  return new Promise(resolve => {
    chrome.storage.local.get(null, (items) => {
      const count = Object.keys(items).filter(x => x.startsWith('indexed:')).length;
      resolve(count);
    });
  });
};

const totalDocumentCount = () => {
  return parseInt(localStorage.getItem('totalCount') ? localStorage.getItem('totalCount') : 0);
};

const setDocumentCount = (count) => {
  localStorage.setItem('totalCount', count);
};

const setIndexedUrl = (url, words) => {
  return new Promise(resolve => {
    if (localStorage.getItem(`indexed:${url}`) !== null && isEmpty(words)) {
      resolve();
      return;
    }
    chrome.storage.local.set({ [`indexed:${url}`]: { words } }, () => {
      resolve();
    });
  });
};

const getIndexedInfo = (url) => {
  return new Promise(resolve => {
    chrome.storage.local.get([`indexed:${url}`], (result) => {
      const data = result[`indexed:${url}`];
      if (data) {
        resolve(data);
      } else {
        resolve({
          words: []
        });
      }
    });
  });
};

const indexedList = () => {
  return new Promise(resolve => {
    chrome.storage.local.get(null, (items) => {
      const indexedItems = Object.keys(items).reduce((arr, key) => {
        if (key.startsWith('indexed:')) {
          const url = key.slice(8);
          const data = items[key];
          arr.push({
            label: uuid5(url, uuid5.URL),
            words: data.words
          });
        }
        return arr;
      }, []);
      resolve(indexedItems);
    });
  });
};

const hasIndex = async (url) => {
  const info = await getIndexedInfo(url);
  return !!info && !!info.words;
}

const deleteIndexedStatus = () => {
  chrome.storage.local.get(null, (items) => {
    const keysToRemove = Object.keys(items).filter(key => key.startsWith('indexed:'));
    chrome.storage.local.remove(keysToRemove);
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
  totalDocumentCount,
  setDocumentCount,
  getIndexedInfo,
  indexedList,
};