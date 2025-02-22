import React, { useMemo } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import config from "../../config/config";
import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";

function RTE({ name, label, control, defaultValue = "" }) {
  // const editor = useRef(null);
  // const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      // placeholder: "Start typings...",
      height: 500,
    }),
    [defaultValue]
  );

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          // <Editor
          //   apiKey={config.tinyMCEAPIKey}
          //   initialValue={defaultValue}
          //   init={{
          //     initialValue: defaultValue,
          //     height: 500,
          //     menubar: true,
          //     plugins: [
          //       "image",
          //       "advlist",
          //       "autolink",
          //       "lists",
          //       "link",
          //       "image",
          //       "charmap",
          //       "preview",
          //       "anchor",
          //       "searchreplace",
          //       "visualblocks",
          //       "code",
          //       "fullscreen",
          //       "insertdatetime",
          //       "media",
          //       "table",
          //       "code",
          //       "help",
          //       "wordcount",
          //       "anchor",
          //     ],
          //     toolbar:
          //       "undo redo | blocks | bold italic underline forecolor| fontsize  fontfamily  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | image  | help",
          //     content_style:
          //       "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          //   }}
          //   onEditorChange={onChange}
          // />
          <JoditEditor
            // ref={ref}
            value={defaultValue}
            config={config}
            tabIndex={1} // tabIndex of textarea
            // onBlur={(newContent) => {
            //   setContent(newContent);
            //   console.log(newContent);
            // }} // preferred to use only this option to update the content for performance reasons
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
