import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import './NewsEditor.css';
export default function NewsEditor(props) {
    const [editorState, setEditorState] = useState('');
    // const onEditorStateChange = () => {
    //     console.log('111');
    // };
    return (
        <Editor
            style={{
                minHeight: '180px',
                minWith: '1000px',
                overflow: 'auto',
                background: '#FAFAFA',
                border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
            editorState={editorState}
            toolbarClassName='toolbarClassName' //定制样式
            wrapperClassName='wrapperClassName'
            editorClassName='border-editor'
            onEditorStateChange={(editorState) => {
                setEditorState(editorState);
            }}
            onBlur={() => {
                // console.log()

                props.getContent(
                    draftToHtml(convertToRaw(editorState.getCurrentContent()))
                );
            }}
        />
    );
}
