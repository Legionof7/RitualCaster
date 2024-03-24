import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { GenerateFrameHTML } from "./utils/types";

export const generateFrameHTML = (data: GenerateFrameHTML) => {
  const payload: any = {};
  if (data.imageSrc) {
    payload.image = {
      src: data.imageSrc,
    };
  }
  if (data.inputText) {
    payload.input = {
      text: data.inputText,
    };
  }
  if (data.postUrl) {
    payload.postUrl = data.postUrl;
  }
  if (data.buttons) {
    payload.buttons = data.buttons;
  }
  return getFrameHtmlResponse({...payload});
};
