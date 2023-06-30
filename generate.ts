import type { DocNode } from "./deps.ts";
import { docnode2md } from "./mod.ts";

if (import.meta.main) {
  main();
}

async function main() {
  // Create a child process running `deno doc --json`.
  const child = new Deno.Command(Deno.execPath(), {
    args: ["doc", "docnode2md.ts", "--json"],
    stdin: "piped",
    stdout: "piped",
  }).spawn();
  const output = await child.output();
  if (!output.success) {
    throw new Error(new TextDecoder().decode(output.stderr));
  }

  const decoded = new TextDecoder().decode(output.stdout);
  const nodes = JSON.parse(decoded) as Array<
    DocNode
  >;

  // Generate markdown.
  const docs = docnode2md(nodes);

  // Generate README.md.
  const template = await Deno.readTextFile("./README.md.tpl");
  const readme = template.replace("<!-- generate:docs -->", docs);
  await Deno.writeTextFile("./README.md", readme);
}
