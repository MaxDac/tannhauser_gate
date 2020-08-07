/// <reference types="react" />
import "./chat.css";
export interface ChatInputProps {
    onSubmit: (text: string) => void;
    className?: string;
}
export default function ChatInput(props: ChatInputProps): JSX.Element;
