const chunkSize = 256 * 1024;
const fileReader = new FileReader();

export function readFromFileAsText(
  file,
  {
    splitBy = /[\r?\n]+/,
    encoding = "UTF-8"
  },
  dataCb,
  loadingProgressCb,
  finishedCb
) {
  const fileSize = file.size;
  let offset = 0;
  let chunkReaderBlock = null;

  let lastUnhandledChunkPart = "";

  const readEventHandler = evt => {
    if (evt.target.error == null) {
      offset += evt.target.result.length;
      const splitted = evt.target.result.split(splitBy);

      splitted[0] = lastUnhandledChunkPart.concat(splitted[0]);
      lastUnhandledChunkPart = splitted[splitted.length - 1];

      for (let i = 0; i < splitted.length - 1; i++) {
        const item = splitted[i].split(",");
      }
      loadingProgressCb(offset / fileSize * 100);
    } else {
      console.error(`Read error: ${evt.target.error}`);
      dataCb(null, new Error(`Read error: ${evt.target.error}`));
      return;
    }
    if (offset >= fileSize) {
      loadingProgressCb(100);
      finishedCb();
      return;
    }

    chunkReaderBlock(offset, file);
  };

  chunkReaderBlock = (_offset, _file) => {
    const blob = _file.slice(_offset, this.chunkSize + _offset);
    this.fileReader.onload = readEventHandler;
    this.fileReader.readAsText(blob);
  };

  chunkReaderBlock(offset, file);
}
