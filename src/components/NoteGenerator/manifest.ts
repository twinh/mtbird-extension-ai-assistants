import {SchemaGenerator, COMPONENT} from "@mtbird/core";
import {IComponentManifest, IComponentInstanceForm} from "@mtbird/shared";

const manifest: IComponentManifest<IComponentInstanceForm> = {
    type: "component",
    componentName: "NoteGenerator",
    title: "笔记生成器",
    icon: "mtbird-form",
    desc: "",
    category: "basic",
    schema: [
        ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
        SchemaGenerator.collapsePanel(
            "笔记生成器",
            [
                SchemaGenerator.input("默认 prompt", "props.prompt"),
            ],
            true
        ),
    ],
    instance: {
        type: "component",
        componentName: "NoteGenerator",
        props: {
            prompt: '北京最好吃的三家火锅店评测',
            style: {
                ...COMPONENT.COMPONENT_DEFAULT_STYLE,
                width: 375,
                height: 450
            },
        },
        data: {

        },
    },
};

export default manifest;