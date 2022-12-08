(async () => {
  const variableMap = {};
  for await (const entry of Deno.readDir("./src/scss/")) {
    if (entry.isFile) {
      variableMap[entry.name] = [];
      const scssSrc = await Deno.readTextFile(`./src/scss/${entry.name}`);
      const lines = scssSrc.split("\n");
      const filtered = lines.filter((line: string) => line.includes(" --"));
      variableMap[entry.name] = filtered;
    }
  }
  console.log(variableMap);
  const scssSource = `.potzblitz {
${Object.keys(variableMap)
  .map((key) => {
    const varList = variableMap[key];
    return varList.join(`\n`) + `\n`;
  })
  .join(`\n`)}
}`;
  console.log(scssSource);
})();
