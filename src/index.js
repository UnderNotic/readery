const defaultChunkSize = process.env.CHUNK_SIZE || 32 * 1024;
const fileReader = new FileReader();

function readFromFile(
  file,
  dataCb,
  loadingProgressCb = () => {},
  finishedCb = () => {},
  config = { splitBy: /\r?\n/, encoding: "UTF-8" },
  chunkSize = defaultChunkSize
) {
  loadingProgressCb = loadingProgressCb || (() => {});
  finishedCb = finishedCb || (() => {});
  config = config || ({ splitBy: /\r?\n/, encoding: "UTF-8" });
  chunkSize = chunkSize || defaultChunkSize;

  const fileSize = file.size;
  const chunkReader = new OffsetChunkReaderHandler(
    fileSize,
    dataCb,
    loadingProgressCb,
    finishedCb,
    config
  );
  chunkReader.readToEnd(file, dataCb, loadingProgressCb, finishedCb, config, chunkSize);
}

export default {
  readFromFile
}

class OffsetChunkReaderHandler {
  constructor(fileSize, dataCb, loadingProgressCb, finishedCb, config) {
    this.FILE_SIZE = fileSize;
    this.offset = 0;
    this.lastUnhandledChunkPart = "";

    this.dataCb = dataCb;
    this.loadingProgressCb = loadingProgressCb;
    this.finishedCb = finishedCb;
    this.config = config;

    this.readNextChunk = this.readNextChunk.bind(this);
    this.readLastChunk = this.readLastChunk.bind(this);
  }

  readToEnd(file, dataCb, loadingProgressCb, finishedCb, config, chunkSize) {
    let i = 0;
    const load = () => {
      if (this.FILE_SIZE - i > chunkSize) {
        fileReader.onload = this.readNextChunk;
        fileReader.onloadend = load;
        i += chunkSize;
      } else {
        fileReader.onload = this.readLastChunk;
        fileReader.onloadend = null;
      }
      const blob = file.slice(this.offset, chunkSize + this.offset);
      fileReader.readAsText(blob);
    };
    load();
  }

  readNextChunk(evt) {
    if (evt.target.error !== null) {
      console.error(`Read error: ${evt.target.error}`);
      this.dataCb(null, new Error(`Read error: ${evt.target.error}`));
      return;
    }
    this.offset += evt.target.result.length;

    const splitted = this.lastUnhandledChunkPart
      .concat(evt.target.result)
      .split(this.config.splitBy);

    this.lastUnhandledChunkPart = splitted.pop();

    splitted.forEach(d => {
      this.dataCb(d);
    });
    this.loadingProgressCb(this.offset / this.FILE_SIZE * 100);
  }

  readLastChunk(evt) {
    const splitted = this.lastUnhandledChunkPart
      .concat(evt.target.result)
      .split(this.config.splitBy);

    splitted.forEach(d => this.dataCb(d));
    this.loadingProgressCb(100);
    this.finishedCb();
  }
}
