const chunkSize = 10;
const fileReader = new FileReader();

export function readFromFile(
  file,
  dataCb,
  loadingProgressCb = () => {},
  finishedCb = () => {},
  config = { splitBy: /[\r?\n]+/, encoding: "UTF-8" }
) {
  const fileSize = file.size;
  let offset = 0;
  let chunkReaderBlock = null;

  let lastUnhandledChunkPart = "";

  const readEventHandler = evt => {
    let splitted = [];
    if (evt.target.error == null) {
      offset += evt.target.result.length;
      splitted = lastUnhandledChunkPart
        .concat(evt.target.result)
        .split(config.splitBy);

      lastUnhandledChunkPart = splitted.pop();
    } else {
      console.error(`Read error: ${evt.target.error}`);
      dataCb(null, new Error(`Read error: ${evt.target.error}`));
      return;
    }
    if (offset >= fileSize) {
      splitted.push(lastUnhandledChunkPart);
      splitted.forEach(d => dataCb(d));
      loadingProgressCb(100);
      finishedCb();
      return;
    }

    splitted.forEach(d => dataCb(d));
    loadingProgressCb(offset / fileSize * 100);

    chunkReaderBlock(offset, file);
  };

  chunkReaderBlock = (_offset, _file) => {
    const blob = _file.slice(_offset, chunkSize + _offset);
    fileReader.onload = readEventHandler;
    fileReader.readAsText(blob);
  };

  chunkReaderBlock(offset, file);
}
