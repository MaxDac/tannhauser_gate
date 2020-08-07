/// <reference types="react" />
import "./file-drop.css";
export interface FileDropProps {
    title: string;
    showPreview: boolean;
    onLoad: (base64image: string) => void;
    onError?: (error: string) => void;
}
export default function FileDrop(props: FileDropProps): JSX.Element;
