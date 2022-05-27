import React, { useState, useEffect } from 'react';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './NewsEditor.css';
export default function NewsEditor(props) {
    const [editorState, setEditorState] = useState('');
    useEffect(() => {
        //console.log(props.content);
        //把 html转换成draftjs对象
        const html = props.content;
        if (html === undefined) return;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [props.content]);
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
