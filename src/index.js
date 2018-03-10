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
  const chunkReader = new OffsetChunkReaderHandler(
    fileSize,
    dataCb,
    loadingProgressCb,
    finishedCb,
    config
  );
  chunkReader.readToEnd(file, dataCb, loadingProgressCb, finishedCb, config);
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

  readToEnd(file, dataCb, loadingProgressCb, finishedCb, config) {
    const blob = file.slice(this.offset, chunkSize + this.offset);

    let i = 0;
    const load = () => {
      if (this.FILE_SIZE - i > chunkSize) {
        fileReader.onload = this.readNextChunk;
        fileReader.onloadend = load;
        i += chunkSize
      } else {
        fileReader.onload = this.readLastChunk;
        fileReader.onloadend = null;
      }
      fileReader.readAsText(blob);
    }
    load();
  }

  readNextChunk(evt) {
    if (evt.target.error !== null) {
      console.error(`Read error: ${evt.target.error}`);
      this.dataCb(null, new Error(`Read error: ${evt.target.error}`));
      return;
    }
    debugger;
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

    splitted.push(this.lastUnhandledChunkPart);
    splitted.forEach(d => this.dataCb(d));
    this.loadingProgressCb(100);
    this.finishedCb();
  }
}
