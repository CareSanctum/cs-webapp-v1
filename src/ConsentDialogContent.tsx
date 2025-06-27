import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// If using Vite, you can import as text:
import consentText from "../src/assets/consent.md?raw";
import popupText from "../src/assets/popup.md?raw";

export function ConsentDialogContent() {
  return <ReactMarkdown>{consentText}</ReactMarkdown>;
}

export function PopupDialogContent() {
  return <ReactMarkdown>{popupText}</ReactMarkdown>;
}