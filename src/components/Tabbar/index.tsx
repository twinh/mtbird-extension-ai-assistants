import React from "react";
import { IComponentProps } from "@mtbird/shared";
import styles from "./style.module.less";
import manifest from "./manifest";
import get from "lodash/get";

const Tabbar = ({ node, style }: IComponentProps) => {
    if (!node.data) return <div />;
    const { options, showIcon } = node.data;

    if (!options) return <div className={styles.tabbarWrapper} />;

    // 允许自定义上边颜色
    const borderTop = style.borderColor ? ('1px solid ' + style.borderColor) : get(node, "props.style.border");

    // 允许自定义图标和文字样式
    const textStyle = { color: style.color, fontSize: style.fontSize };

    return (
        <div
            className={styles.tabbarWrapper}
            style={{
                ...style,
                borderTop,
                border: "unset",
            }}
        >
            {options.map((cur: Record<string, any>) => {
                return (
                    <div
                        className={
                            styles.tabbarItem +
                            " " +
                            (cur.isActive ? styles.tabbarItemActive : "")
                        }
                        onClick={() => cur.href && (location.href = cur.href)}
                    >
                        {showIcon && (!cur.iconType || cur.iconType === "icon") && (
                            <i className={styles.tabbarIcon + ` mtbird-icon ${cur.icon}`} style={textStyle} />
                        )}
                        {showIcon && cur.iconType === "image" && (
                            <img className={styles.tabbarIconImage} src={cur.icon} />
                        )}
                        <span className={styles.tabbarTitle} style={textStyle}>{cur.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

Tabbar.manifest = manifest;

export default Tabbar;