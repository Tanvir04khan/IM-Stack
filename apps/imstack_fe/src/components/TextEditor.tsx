import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

type TextEditorPropsType = {
  placeholder: string;
  value: string;
  className?: string;
  handleContent: (content: string) => void;
};

const TextEditor = ({
  placeholder,
  handleContent,
  className,
  value,
}: TextEditorPropsType) => {
  const editor = useRef(null);
  const options = [
    "bold",
    "italic",
    "underline",
    "|",
    "ul",
    "ol",
    "|",
    "table",
    "link",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "image",
    "file",
    "|",
    "undo",
    "redo",
  ];
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      buttons: options,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      uploader: {
        insertImageAsBase64URI: true, // Upload image as Base64 data URL
      },
    }),
    [placeholder]
  );

  return (
    <>
      <JoditEditor
        className={"w-auto " + className}
        ref={editor}
        value={value}
        config={config}
        onBlur={handleContent}
      />
    </>
  );
};

export default TextEditor;
