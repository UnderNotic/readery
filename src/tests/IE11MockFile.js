var blob = new Blob([""], { type: 'text/html' });
blob["lastModifiedDate"] = "";
blob["name"] = "filename";

export blob;