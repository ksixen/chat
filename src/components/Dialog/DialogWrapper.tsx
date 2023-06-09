import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Portal from "@/utils/Portal";

import type { ColorsListType } from "../Typography/Typography";
import type { CSSObject } from "styled-components";

export const DialogInner = styled("div")`
      padding-bottom: 0;
      max-width: 480px;
      width: 100%;
`;
export const DialogContainer = styled("div").withConfig({
      shouldForwardProp(propName) {
            return !["bgColor"].includes(propName);
      },
})<{
      bgColor?: ColorsListType;
}>(({ bgColor }) => ({
      // height: "100%",
      flexDirection: "column",
      display: "inline-flex",
      alignItems: "center",
      // backgroundColor: bgColor ? bgColor : "var(--brand-560)",
      justifyContent: "center",
      borderRadius: "4px",
      zIndex: 1001,
}));
export const Dialog = styled("div").withConfig({
      shouldForwardProp(prop, defaultValidatorFn) {
            return !["sx"].includes(prop);
      },
})<{ sx?: CSSObject }>`
      border-radius: 5px;
      overflow: hidden;
      ${(props) => props.sx ?? {}}
`;

export const DialogButtonsWrapper = styled("div").withConfig({
      shouldForwardProp(prop, defaultValidatorFn) {
            return !["sx"].includes(prop);
      },
})<{ sx?: CSSObject }>`
      background-color: var(--modal-footer-background);
      padding: 16px;
      max-width: 480px;
      width: 100%;
      ${(props) => props.sx ?? {}}
`;
export default function DialogWrapper(props: {
      children: React.ReactNode;
      active: boolean;
      bgColor?: ColorsListType;
      containerBgColor?: ColorsListType;
      onClose: () => void;
}) {
      const { children, bgColor, containerBgColor, active, onClose } = props;
      const rootItem = useRef(
            document.getElementById("dialog-root") as HTMLElement
      );

      useEffect(() => {
            const listener = (ev: MouseEvent) => {
                  const target = ev.target as HTMLDivElement;

                  if (target.id === "dialog-root") {
                        onClose();
                  }
            };
            document.addEventListener("click", listener);
            return () => {
                  document.removeEventListener("click", listener);
            };
      }, [onClose]);
      useEffect(() => {
            if (bgColor && rootItem.current) {
                  rootItem.current.style.backgroundColor = `var(${bgColor})`;
            }
      }, [bgColor]);
      return (
            <>
                  <Portal active={active} root={rootItem.current}>
                        {active ? children : <></>}
                  </Portal>
            </>
      );
}
