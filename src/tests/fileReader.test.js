import { Selector } from 'testcafe';

fixture`Readery tests`.page`http://localhost:8080`;

test("Should split correctly short file", async t => {
  await t
  .setFilesToUpload("#file-input", "./small_file.txt");
  var children = await Selector("#file_output").child();
  var count = await Selector("#file_output").childElementCount;

  await t.expect(count).eql(1);
  await t.expect("t").eql(await children.nth(0).innerText);
});

test("Should split correctly with default new line split", async t => {
  await t
    .setFilesToUpload("#file-input", "./test_file.txt");
    var children = await Selector("#file_output").child();
    var count = await Selector("#file_output").childElementCount;

    await t.expect("1").eql(await children.nth(0).innerText);
    await t.expect("2").eql(await children.nth(1).innerText);
    await t.expect("3").eql(await children.nth(2).innerText);
    await t.expect("").eql(await children.nth(3).innerText);
    await t.expect("8").eql(await children.nth(4).innerText);
    await t.expect("a").eql(await children.nth(5).innerText);
    await t.expect("").eql(await children.nth(6).innerText);
    await t.expect("").eql(await children.nth(7).innerText);
    await t.expect("").eql(await children.nth(8).innerText);
    await t.expect("").eql(await children.nth(9).innerText);
    await t.expect("!").eql(await children.nth(10).innerText);
    await t.expect("9").eql(await children.nth(11).innerText);
    await t.expect("@").eql(await children.nth(12).innerText);
    await t.expect("123").eql(await children.nth(13).innerText);
    await t.expect("abc123zxy").eql(await children.nth(14).innerText);
    await t.expect("wwwwwwaaaaaaaazxczxcasddfgrtyyuiopoiklj[]kjhnbv!iklj[]kjhnbv!iklj[]kjhnbv!sdsdsd").eql(await children.nth(15).innerText);
    await t.expect(count).eql(16);
});

test("Should split fast large files", async t => {
  await t
  .setFilesToUpload("#file-input", "./large_file.txt");
  await t.wait(10000);
  var children = await Selector("#file_output").child();
  var count = await Selector("#file_output").childElementCount;
  await t.expect(count).eql(4923);  
});

test("Should split correctly with custom split string", async t => {
  await t
  .setFilesToUpload("#file-input", "./comma_test_file.txt");
  var children = await Selector("#file_output").child();
  var count = await Selector("#file_output").childElementCount;
});
