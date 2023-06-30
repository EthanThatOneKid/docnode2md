import { DocNode, JsDoc, JsDocTag, JsDocTagParam } from "./deps.ts";

/**
 * docnode2md converts a DocNode list to markdown.
 */
export function docnode2md(nodes: Array<DocNode>): string {
  let markdown = "";

  for (const node of nodes) {
    markdown += convertNodeToMarkdown(node);
    markdown += "\n\n";
  }

  return markdown;
}

function convertNodeToMarkdown(node: DocNode): string {
  switch (node.kind) {
    case "moduleDoc": {
      return convertModuleDocToMarkdown(node);
    }

    case "function": {
      return convertFunctionToMarkdown(node);
    }

    case "variable": {
      return convertVariableToMarkdown(node);
    }

    case "enum": {
      return convertEnumToMarkdown(node);
    }

    case "class": {
      return convertClassToMarkdown(node);
    }

    case "typeAlias": {
      return convertTypeAliasToMarkdown(node);
    }

    case "namespace": {
      return convertNamespaceToMarkdown(node);
    }

    case "interface": {
      return convertInterfaceToMarkdown(node);
    }

    case "import": {
      return convertImportToMarkdown(node);
    }

    default: {
      return "";
    }
  }
}

function convertModuleDocToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `# Module: ${node.name}\n\n${jsDoc}`;
}

function convertFunctionToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Function: ${node.name}\n\n${jsDoc}`;
}

function convertVariableToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Variable: ${node.name}\n\n${jsDoc}`;
}

function convertEnumToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Enum: ${node.name}\n\n${jsDoc}`;
}

function convertClassToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Class: ${node.name}\n\n${jsDoc}`;
}

function convertTypeAliasToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Type Alias: ${node.name}\n\n${jsDoc}`;
}

function convertNamespaceToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Namespace: ${node.name}\n\n${jsDoc}`;
}

function convertInterfaceToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Interface: ${node.name}\n\n${jsDoc}`;
}

function convertImportToMarkdown(node: DocNode): string {
  const jsDoc = formatJsDoc(node.jsDoc);
  return `## Import: ${node.name}\n\n${jsDoc}`;
}

function formatJsDoc(jsDoc?: JsDoc): string {
  if (!jsDoc) {
    return "";
  }

  let formattedJsDoc = "";

  if (jsDoc.doc) {
    formattedJsDoc += jsDoc.doc.trim();
    formattedJsDoc += "\n\n";
  }

  if (jsDoc.tags) {
    for (const tag of jsDoc.tags) {
      formattedJsDoc += formatJsDocTag(tag);
      formattedJsDoc += "\n";
    }
  }

  return formattedJsDoc.trim();
}

function formatJsDocTag(tag: JsDocTag): string {
  let formattedTag = `@${tag.kind}`;

  if ("name" in tag) {
    formattedTag += ` ${tag.name}`;
  }

  if ("value" in tag) {
    formattedTag += ` ${tag.value}`;
  }

  if ("type" in tag) {
    formattedTag += ` {${tag.type}}`;
  }

  if ("doc" in tag && tag.doc) {
    formattedTag += ` ${tag.doc.trim()}`;
  }

  if ("params" in tag) {
    const paramStrings = (tag.params as Array<JsDocTagParam>)
      .map((param) => formatParamDef(param));
    formattedTag += ` ${paramStrings.join(", ")}`;
  }

  if ("tags" in tag) {
    formattedTag += ` ${tag.tags.join(", ")}`;
  }

  return formattedTag;
}

function formatParamDef(param: JsDocTagParam): string {
  let paramString = "";

  if (param.optional) {
    paramString += "[";
  }

  paramString += param.name;

  if (param.type) {
    paramString += ` {${param.type}}`;
  }

  if (param.default) {
    paramString += ` = ${param.default}`;
  }

  if (param.optional) {
    paramString += "]";
  }

  return paramString;
}
