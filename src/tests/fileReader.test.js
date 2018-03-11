import { Selector } from 'testcafe';

fixture`Readery sane test`.page`http://localhost:8080`;

test("Uploading", async t => {
  await t
    .setFilesToUpload("#file-input", "./test_file.txt");
    var children = await Selector("#file_output").child();
    var count = await Selector("#file_output").childElementCount;

    await t.expect("1").eql(await children.nth(0).innerText);
    await t.expect("2").eql(await children.nth(1).innerText);
    await t.expect("3").eql(await children.nth(2).innerText);
    await t.expect("4").eql(await children.nth(3).innerText);
    await t.expect("5").eql(await children.nth(4).innerText);
    await t.expect("6").eql(await children.nth(5).innerText);
    await t.expect("7").eql(await children.nth(6).innerText);
    await t.expect("8").eql(await children.nth(0).innerText);
    await t.expect("a").eql(await children.nth(8).innerText);
    await t.expect("!").eql(await children.nth(9).innerText);
    await t.expect("9").eql(await children.nth(10).innerText);
    await t.expect("@").eql(await children.nth(11).innerText);
    await t.expect("123").eql(await children.nth(12).innerText);
    await t.expect("abc123zxy").eql(await children.nth(13).innerText);
    await t.expect("wwwwwwaaaaaaaazxczxcasddfgrtyyuiopoiklj[]kjhnbv!").eql(await children.nth(14).innerText);
    await t.expect(count).eql(15);
});

test("Should have correct item count", async t => {
    
});

test("Should be fast", async t => {

});
