/// <reference types="react" />
export interface OkModalParams {
    text: string;
    show: boolean;
    buttonText: string;
    onOk: () => void;
}
export default function OkModal(params: OkModalParams): JSX.Element;
